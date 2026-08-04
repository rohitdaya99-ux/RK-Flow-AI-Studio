from __future__ import annotations

import asyncio
import json
import os
import tempfile
import time
import unittest
from pathlib import Path
from unittest import mock

import numpy as np

from app.cache import CacheStore
from app.vision import (
    ImagePreprocessor,
    InvalidImageError,
    UnsupportedImageError,
    VisionAnalyzer,
    VisionDependencyError,
    VisionRuntime,
    build_clip_analysis,
)
from app.vision_models import (
    VisionFrameTask,
    VisionParameters,
    VisionRequest,
)
from app.vision_service import (
    VISION_VERSION,
    VisionService,
    build_vision_cache_key,
    build_vision_capabilities,
)


def make_rgb_image(width: int, height: int, brightness: float = 128.0) -> "np.ndarray":
    image = np.full((height, width, 3), brightness, dtype=np.uint8)
    return image


def write_frame(path: Path, image: "np.ndarray") -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    byte_payload = image.astype(np.uint8).tobytes()
    # Write a minimal BMP-style payload OpenCV can decode via imwrite-free path.
    # Use cv2 when available; otherwise fall back to a raw expected-token file.
    try:
        import cv2

        cv2.imwrite(str(path), image)
    except Exception:
        path.write_bytes(byte_payload)
    return path


def build_vision_request(
    frames,
    approved_root: str,
    retry_limit: int = 1,
    concurrency: int = 2,
):
    return VisionRequest(
        schemaVersion=1,
        jobId="vision-job-1",
        requestId="vision-request-1",
        requestedAt="2026-08-04T00:00:00.000Z",
        approvedRoots=[approved_root],
        visionVersion=VISION_VERSION,
        frames=frames,
        parameters=VisionParameters(),
        cache={
            "rootName": "rkflow-cache",
            "extractorVersion": "phase-4-extraction-v1",
            "ttlSeconds": 60,
            "maxBytes": 16 * 1024 * 1024,
        },
        limits={
            "concurrency": concurrency,
            "retryLimit": retry_limit,
        },
    )


def image_frame(image_path: Path, clip_id: str = "clip-1", sample_id: str = "sample-1", content_hash: str = "hash-1"):
    return VisionFrameTask(
        frameSampleId=sample_id,
        clipId=clip_id,
        clipName="Clip 1",
        imagePath=str(image_path),
        contentHash=content_hash,
        extractorVersion="phase-4-extraction-v1",
        sampleKind="middle",
        sourceTimeSeconds=1.5,
        width=None,
        height=None,
    )


def _import_guard(module_name: str):
    try:
        return __import__(module_name)
    except ImportError:
        return None


class VisionRuntimeProbeTests(unittest.TestCase):
    def test_cpu_fallback_configured_when_opencv_missing(self):
        runtime = VisionRuntime()
        capabilities = build_vision_capabilities(runtime)
        self.assertEqual(capabilities.cpuFallback, True)
        if runtime.cv2 is None:
            self.assertEqual(capabilities.available, False)
            self.assertIsNotNone(capabilities.reason)
            self.assertRegex(capabilities.reason, "OpenCV")
        else:
            self.assertEqual(capabilities.available, True)
            self.assertIn("opencv", capabilities.modules)
            self.assertIn("sharpness", capabilities.features)


class ImagePreprocessorTests(unittest.TestCase):
    def setUp(self) -> None:
        cv2 = _import_guard("cv2")
        if cv2 is None:
            self.skipTest("OpenCV is not installed")
        self.runtime = VisionRuntime()
        self.preprocessor = ImagePreprocessor(self.runtime)

    def test_preprocess_rejects_invalid_image(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            missing = Path(temp_dir) / "missing.jpg"
            with self.assertRaises(InvalidImageError):
                self.preprocessor.preprocess(str(missing), VisionParameters())

    def test_preprocess_rejects_non_bgr_shape(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            bad_path = Path(temp_dir) / "bad.png"
            bad_path.write_bytes(b"not-an-image")
            with self.assertRaises(InvalidImageError):
                self.preprocessor.preprocess(str(bad_path), VisionParameters())

    def test_preprocess_letterboxes_large_images(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            frame_path = write_frame(Path(temp_dir) / "large.jpg", make_rgb_image(1600, 900, 120))
            result = self.preprocessor.preprocess(str(frame_path), VisionParameters(maxDimension=512, letterboxSize=512))
            self.assertLessEqual(result.processedSize[0], 512)
            self.assertLessEqual(result.processedSize[1], 512)
            self.assertTrue(result.letterboxed)


class VisionAnalyzerTests(unittest.TestCase):
    def setUp(self) -> None:
        cv2 = _import_guard("cv2")
        if cv2 is None:
            self.skipTest("OpenCV is not installed")
        self.runtime = VisionRuntime()
        self.preprocessor = ImagePreprocessor(self.runtime)
        self.analyzer = VisionAnalyzer(self.runtime)
        self.task = image_frame(Path("/tmp/frame.jpg"))

    def analyze_frame(self, frame_path: Path, hash_value: str):
        preprocess = self.preprocessor.preprocess(str(frame_path), VisionParameters())
        return self.analyzer.analyze(
            preprocess=preprocess,
            task=image_frame(frame_path, content_hash=hash_value),
            vision_version=VISION_VERSION,
            cache_key="cache-key-1",
            cache_status="miss",
            processed_at="2026-08-04T00:00:00.000Z",
        )

    def test_sharp_frame_scores_higher_than_blurred(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            sharp_path = write_frame(Path(temp_dir) / "sharp.jpg", add_edges(make_rgb_image(256, 256, 128)))
            dark_blur = np.full((256, 256, 3), 128, dtype=np.uint8)
            dark_blur = cv2_blur(dark_blur, 41)
            blurred_path = write_frame(Path(temp_dir) / "blurred.jpg", dark_blur)
            sharp_analysis = self.analyze_frame(sharp_path, "sharp-hash")
            blur_analysis = self.analyze_frame(blurred_path, "blur-hash")
            self.assertGreaterEqual(sharp_analysis.sharpness, blur_analysis.sharpness)
            self.assertGreaterEqual(sharp_analysis.qualityScore, blur_analysis.qualityScore)

    def test_blur_warning_emitted(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            dark_blur = np.full((256, 256, 3), 128, dtype=np.uint8)
            dark_blur = cv2_blur(dark_blur, 61)
            blurred_path = write_frame(Path(temp_dir) / "very-blurred.jpg", dark_blur)
            analysis = self.analyze_frame(blurred_path, "blur-hash")
            self.assertTrue(any(warning.code == "too-blurry" for warning in analysis.warnings))

    def test_dark_frame_emits_too_dark_warning(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            dark_path = write_frame(Path(temp_dir) / "dark.jpg", make_rgb_image(256, 256, 8))
            analysis = self.analyze_frame(dark_path, "dark-hash")
            self.assertLess(analysis.brightness, 50)
            self.assertTrue(
                any(warning.code in ("under-exposed", "too-dark") for warning in analysis.warnings)
            )

    def test_bright_frame_emits_over_exposed_warning(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            bright_path = write_frame(Path(temp_dir) / "bright.jpg", make_rgb_image(256, 256, 250))
            analysis = self.analyze_frame(bright_path, "bright-hash")
            self.assertGreater(analysis.brightness, 235)
            self.assertTrue(any(warning.code == "over-exposed" for warning in analysis.warnings))

    def test_deterministic_serialization_roundtrip(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            frame_path = write_frame(Path(temp_dir) / "frame.jpg", add_edges(make_rgb_image(192, 192, 140)))
            analysis = self.analyze_frame(frame_path, "serial-hash")
            payload = analysis.model_dump_json()
            restored = type(analysis).model_validate_json(payload)
            self.assertEqual(restored.qualityScore, analysis.qualityScore)
            self.assertEqual(restored.frameSampleId, analysis.frameSampleId)
            self.assertEqual(len(restored.warnings), len(analysis.warnings))


class VisionServiceTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self) -> None:
        cv2 = _import_guard("cv2")
        if cv2 is None:
            self.skipTest("OpenCV is not installed")
        self.temp_dir = tempfile.TemporaryDirectory()
        self.previous_cache_root = os.environ.get("RKFLOW_CACHE_ROOT")
        os.environ["RKFLOW_CACHE_ROOT"] = str(Path(self.temp_dir.name) / "cache")
        self.service = VisionService(bind="127.0.0.1", base_url="http://127.0.0.1:43191", version="test")
        self.root = Path(self.temp_dir.name)
        self.frame_path = write_frame(self.root / "frames" / "frame.jpg", add_edges(make_rgb_image(320, 240, 140)))

    async def asyncTearDown(self) -> None:
        if self.previous_cache_root is None:
            os.environ.pop("RKFLOW_CACHE_ROOT", None)
        else:
            os.environ["RKFLOW_CACHE_ROOT"] = self.previous_cache_root
        self.temp_dir.cleanup()

    async def test_analyses_frames_and_returns_measured_clip_summary(self):
        request = build_vision_request(
            [
                image_frame(self.frame_path, clip_id="clip-1", sample_id="sample-1", content_hash="hash-a"),
            ],
            approved_root=str(self.root),
        )
        job_id = await self.service.submit(request)
        await self.service.jobs[job_id].task
        result = await self.service.get(job_id)
        self.assertEqual(result.status, "completed")
        self.assertEqual(result.progress.completedFrames, 1)
        self.assertEqual(result.progress.cacheHits, 0)
        self.assertEqual(result.progress.cacheMisses, 1)
        self.assertEqual(len(result.clips), 1)
        clip = result.clips[0]
        self.assertEqual(clip.clipId, "clip-1")
        self.assertEqual(clip.source, "measured")
        self.assertGreaterEqual(clip.qualityScore, 0)
        self.assertLessEqual(clip.qualityScore, 100)
        self.assertEqual(clip.bestFrameSampleId, "sample-1")

    async def test_cache_hit_on_second_run(self):
        frames = [image_frame(self.frame_path, content_hash="hash-cache")]
        request = build_vision_request(frames, approved_root=str(self.root))
        first_id = await self.service.submit(request)
        await self.service.jobs[first_id].task
        first = await self.service.get(first_id)
        self.assertEqual(first.progress.cacheMisses, 1)

        second_request = build_vision_request(
            [image_frame(self.frame_path, content_hash="hash-cache")],
            approved_root=str(self.root),
        )
        second_id = await self.service.submit(second_request)
        await self.service.jobs[second_id].task
        second = await self.service.get(second_id)
        self.assertEqual(second.progress.cacheHits, 1)
        self.assertEqual(second.progress.cacheMisses, 0)

    async def test_cancellation_sets_cancelled_status(self):
        request = build_vision_request(
            [image_frame(self.frame_path, content_hash="hash-cancel")],
            approved_root=str(self.root),
        )
        job_id = await self.service.submit(request)
        await self.service.cancel(job_id)
        await asyncio.sleep(0)
        result = await self.service.get(job_id)
        self.assertEqual(result.status, "cancelled")

    async def test_unsupported_image_reports_failure(self):
        bad_frame = self.root / "frames" / "bad.jpg"
        bad_frame.parent.mkdir(parents=True, exist_ok=True)
        bad_frame.write_bytes(b"this is not a jpeg")
        request = build_vision_request(
            [image_frame(bad_frame, content_hash="hash-bad")],
            approved_root=str(self.root),
        )
        job_id = await self.service.submit(request)
        await self.service.jobs[job_id].task
        result = await self.service.get(job_id)
        self.assertEqual(result.status, "completed")
        self.assertGreaterEqual(len(result.failures), 1)
        self.assertEqual(result.failures[0].status, "failed")

    async def test_cpu_fallback_reports_unavailable_when_opencv_missing(self):
        runtime = VisionRuntime()
        runtime.cv2 = None
        capabilities = build_vision_capabilities(runtime)
        self.assertFalse(capabilities.available)
        self.assertTrue(capabilities.cpuFallback)
        self.assertIsNotNone(capabilities.reason)


class VisionCacheKeyTests(unittest.TestCase):
    def test_cache_key_includes_fingerprint_versions_and_parameters(self):
        request_a = build_vision_request(
            [image_frame(Path("/tmp/a.jpg"), content_hash="fingerprint-a")],
            approved_root="/tmp",
        )
        request_b = build_vision_request(
            [image_frame(Path("/tmp/a.jpg"), content_hash="fingerprint-a")],
            approved_root="/tmp",
        )
        request_c = build_vision_request(
            [image_frame(Path("/tmp/a.jpg"), content_hash="fingerprint-b")],
            approved_root="/tmp",
        )
        request_d = build_vision_request(
            [image_frame(Path("/tmp/a.jpg"), content_hash="fingerprint-a")],
            approved_root="/tmp",
        )
        request_d.visionVersion = "phase-5-vision-v2"
        key_a = build_vision_cache_key(request_a, request_a.frames[0])
        key_b = build_vision_cache_key(request_b, request_b.frames[0])
        key_c = build_vision_cache_key(request_c, request_c.frames[0])
        key_d = build_vision_cache_key(request_d, request_d.frames[0])
        self.assertEqual(key_a, key_b)
        self.assertNotEqual(key_a, key_c)
        self.assertNotEqual(key_a, key_d)

    def test_cache_key_changes_with_parameters(self):
        request_a = build_vision_request(
            [image_frame(Path("/tmp/a.jpg"), content_hash="fp")],
            approved_root="/tmp",
        )
        request_b = build_vision_request(
            [image_frame(Path("/tmp/a.jpg"), content_hash="fp")],
            approved_root="/tmp",
        )
        request_b.parameters.maxDimension = 640
        self.assertNotEqual(
            build_vision_cache_key(request_a, request_a.frames[0]),
            build_vision_cache_key(request_b, request_b.frames[0]),
        )


def add_edges(image: "np.ndarray") -> "np.ndarray":
    height, width = image.shape[:2]
    output = image.copy()
    cv2 = _import_guard("cv2")
    if cv2 is not None:
        cv2.rectangle(output, (int(width * 0.25), int(height * 0.25)), (int(width * 0.75), int(height * 0.75)), (200, 90, 40), thickness=4)
        cv2.line(output, (int(width * 0.1), int(height * 0.1)), (int(width * 0.9), int(height * 0.9)), (40, 200, 90), thickness=3)
    else:
        output[height // 4 : height // 2, width // 4 : width // 2] = 200
    return output


def cv2_blur(image: "np.ndarray", kernel_size: int) -> "np.ndarray":
    cv2 = _import_guard("cv2")
    if cv2 is None:
        return image
    return cv2.GaussianBlur(image, (kernel_size, kernel_size), 0)


if __name__ == "__main__":
    unittest.main()
