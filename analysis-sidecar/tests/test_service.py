from __future__ import annotations

import asyncio
import os
import tempfile
import time
import unittest
from pathlib import Path
from unittest import mock

from app.cache import CacheStore
from app.models import (
    ExtractionRequest,
    FrameExtractionTask,
    FrameSampleResult,
    FrameSamplePlan,
)
from app.security import PathAccessError, ensure_within_roots
from app.service import ExtractionService


def build_request(frame_tasks=None, audio_tasks=None, retry_limit=1, concurrency=2):
    return ExtractionRequest(
        schemaVersion=1,
        jobId="job-1",
        requestId="request-1",
        requestedAt="2026-08-04T00:00:00.000Z",
        approvedRoots=["/approved"],
        frameTasks=frame_tasks or [],
        audioTasks=audio_tasks or [],
        cache={
            "rootName": "rkflow-cache",
            "extractorVersion": "phase-4-extraction-v1",
            "ttlSeconds": 60,
            "maxBytes": 1024 * 1024,
        },
        limits={
            "concurrency": concurrency,
            "retryLimit": retry_limit,
        },
    )


class CacheStoreTests(unittest.TestCase):
    def test_cache_cleanup_respects_ttl_and_containment(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            store = CacheStore(Path(temp_dir), ttl_seconds=1, max_bytes=1024 * 1024)
            old_file = store.frame_output_path("cache-a", "sample-a")
            old_file.write_text("stale")
            os_time = time.time() - 5
            os.utime(old_file, (os_time, os_time))
            deleted = store.cleanup_expired()
            self.assertEqual(deleted, 1)
            self.assertFalse(old_file.exists())

    def test_safe_delete_rejects_escape_path(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            store = CacheStore(Path(temp_dir), ttl_seconds=1, max_bytes=1024 * 1024)
            escaped = Path(tempfile.gettempdir()) / "outside-rkflow-cache.txt"
            escaped.write_text("nope")
            try:
                self.assertFalse(store.safe_delete(escaped))
            finally:
                escaped.unlink(missing_ok=True)


class SecurityTests(unittest.TestCase):
    def test_rejects_path_outside_approved_roots(self):
        with self.assertRaises(PathAccessError):
            ensure_within_roots("/tmp/escape.mov", ["/approved"])


class ExtractionServiceTests(unittest.IsolatedAsyncioTestCase):
    async def test_handles_more_than_fifteen_clips(self):
        service = ExtractionService(bind="127.0.0.1", base_url="http://127.0.0.1:43191", version="test")
        request = build_request(
            frame_tasks=[
                FrameExtractionTask(
                    clipId=f"clip-{index}",
                    clipName=f"Clip {index}",
                    mediaPath=f"/approved/clip-{index}.mp4",
                    mediaFingerprint=f"fp-{index}",
                    cacheKey=f"cache-{index}",
                    sourceInSeconds=0,
                    sourceOutSeconds=4,
                    samplePlan=[FrameSamplePlan(id=f"sample-{index}", sourceTimeSeconds=1, sampleKind="middle")],
                )
                for index in range(16)
            ]
        )
        with mock.patch("app.service.ensure_within_roots", side_effect=lambda path, roots: Path(path)), mock.patch(
            "app.service.extract_frame_sample",
            side_effect=lambda cache_store, task, sample: (
                FrameSampleResult(
                    id=sample.id,
                    clipId=task.clipId,
                    sourceTimeSeconds=sample.sourceTimeSeconds,
                    sampleKind=sample.sampleKind,
                    cacheKey=task.cacheKey,
                    cacheStatus="miss",
                    extractionStatus="available",
                    capturedAt="2026-08-04T00:00:00.000Z",
                ),
                False,
            ),
        ):
            job_id = await service.submit(request)
            await service.jobs[job_id].task
            result = await service.get(job_id)
        self.assertEqual(result.status, "completed")
        self.assertEqual(result.progress.completedClips, 16)
        self.assertEqual(len(result.clipResults), 16)

    async def test_cancellation_sets_cancelled_status(self):
        service = ExtractionService(bind="127.0.0.1", base_url="http://127.0.0.1:43191", version="test")
        request = build_request(
            frame_tasks=[
                FrameExtractionTask(
                    clipId="clip-1",
                    clipName="Clip 1",
                    mediaPath="/approved/clip-1.mp4",
                    mediaFingerprint="fp-1",
                    cacheKey="cache-1",
                    sourceInSeconds=0,
                    sourceOutSeconds=4,
                    samplePlan=[FrameSamplePlan(id="sample-1", sourceTimeSeconds=1, sampleKind="middle")],
                )
            ]
        )

        with mock.patch("app.service.ensure_within_roots", side_effect=lambda path, roots: Path(path)), mock.patch(
            "app.service.extract_frame_sample",
            side_effect=lambda *_args, **_kwargs: (
                time.sleep(0.5),
                FrameSampleResult(
                    id="sample-1",
                    clipId="clip-1",
                    sourceTimeSeconds=1,
                    sampleKind="middle",
                    cacheKey="cache-1",
                    cacheStatus="miss",
                    extractionStatus="available",
                    capturedAt="2026-08-04T00:00:00.000Z",
                ),
                False,
            )[1:],
        ):
            job_id = await service.submit(request)
            await service.cancel(job_id)
            await asyncio.sleep(0)
            result = await service.get(job_id)
        self.assertEqual(result.status, "cancelled")

    async def test_retry_limit_caps_attempts(self):
        service = ExtractionService(bind="127.0.0.1", base_url="http://127.0.0.1:43191", version="test")
        request = build_request(
            retry_limit=2,
            frame_tasks=[
                FrameExtractionTask(
                    clipId="clip-1",
                    clipName="Clip 1",
                    mediaPath="/approved/clip-1.mp4",
                    mediaFingerprint="fp-1",
                    cacheKey="cache-1",
                    sourceInSeconds=0,
                    sourceOutSeconds=4,
                    samplePlan=[FrameSamplePlan(id="sample-1", sourceTimeSeconds=1, sampleKind="middle")],
                )
            ],
        )
        with mock.patch("app.service.ensure_within_roots", side_effect=lambda path, roots: Path(path)), mock.patch(
            "app.service.extract_frame_sample",
            side_effect=RuntimeError("boom"),
        ):
            job_id = await service.submit(request)
            await service.jobs[job_id].task
            result = await service.get(job_id)
        self.assertEqual(result.status, "completed")
        self.assertEqual(result.clipResults[0].attempts, 3)

    async def test_progress_is_monotonic(self):
        service = ExtractionService(bind="127.0.0.1", base_url="http://127.0.0.1:43191", version="test")
        request = build_request(
            frame_tasks=[
                FrameExtractionTask(
                    clipId=f"clip-{index}",
                    clipName=f"Clip {index}",
                    mediaPath=f"/approved/clip-{index}.mp4",
                    mediaFingerprint=f"fp-{index}",
                    cacheKey=f"cache-{index}",
                    sourceInSeconds=0,
                    sourceOutSeconds=4,
                    samplePlan=[FrameSamplePlan(id=f"sample-{index}", sourceTimeSeconds=1, sampleKind="middle")],
                )
                for index in range(4)
            ]
        )
        completed_values = []

        def fake_extract(cache_store, task, sample):
            completed_values.append(len(completed_values))
            return (
                FrameSampleResult(
                    id=sample.id,
                    clipId=task.clipId,
                    sourceTimeSeconds=sample.sourceTimeSeconds,
                    sampleKind=sample.sampleKind,
                    cacheKey=task.cacheKey,
                    cacheStatus="hit",
                    extractionStatus="available",
                    capturedAt="2026-08-04T00:00:00.000Z",
                ),
                True,
            )

        with mock.patch("app.service.ensure_within_roots", side_effect=lambda path, roots: Path(path)), mock.patch(
            "app.service.extract_frame_sample",
            side_effect=fake_extract,
        ):
            job_id = await service.submit(request)
            await service.jobs[job_id].task
            result = await service.get(job_id)
        self.assertEqual(result.progress.completedClips, 4)
        self.assertEqual(sorted(completed_values), completed_values)
