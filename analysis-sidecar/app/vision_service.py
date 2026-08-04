from __future__ import annotations

import asyncio
import hashlib
import json
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Optional, Tuple

from .cache import CacheStore
from .security import ensure_within_roots
from .vision import (
    ImagePreprocessor,
    InvalidImageError,
    UnsupportedImageError,
    VisionAnalyzer,
    VisionDependencyError,
    VisionRuntime,
)
from .vision_models import (
    SidecarStatus,
    VisionBatchAnalysis,
    VisionCapabilities,
    VisionClipAnalysis,
    VisionFailure,
    VisionFrameAnalysisResult,
    VisionFrameTask,
    VisionRequest,
    VisionReport,
    VisionWarning,
)

VISION_VERSION = "phase-5-vision-v1"


class VisionCache:
    """Persistent Vision report cache layered on the existing RK Flow CacheStore."""

    def __init__(self, store: CacheStore) -> None:
        self.store = store

    def get(self, cache_key: str) -> Optional[VisionFrameAnalysisResult]:
        path = self.store.vision_output_path(cache_key)
        if not path.exists():
            return None
        try:
            return VisionFrameAnalysisResult.model_validate_json(path.read_text(encoding="utf-8"))
        except Exception:
            return None

    def put(self, cache_key: str, analysis: VisionFrameAnalysisResult) -> None:
        path = self.store.vision_output_path(cache_key)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(analysis.model_dump_json(), encoding="utf-8")


@dataclass
class VisionJobRecord:
    request: VisionRequest
    result: VisionBatchAnalysis
    cancel_event: asyncio.Event
    task: Optional[asyncio.Task]


def build_vision_capabilities(runtime: VisionRuntime) -> VisionCapabilities:
    onnx_runtime_version: Optional[str] = None
    onnx_runtime_providers: List[str] = []
    openvino_available = False
    if runtime.onnxruntime is not None:
        try:
            onnx_runtime_version = getattr(runtime.onnxruntime, "__version__", None) or "unknown"
            onnx_runtime_providers = list(getattr(runtime.onnxruntime, "get_available_providers", lambda: [])())
        except Exception:
            onnx_runtime_version = "unknown"
    if runtime.openvinoAvailable:
        openvino_available = True

    features = [
        "vision-frame-analysis",
        "image-preprocess",
        "vision-cache",
        "job-cancellation",
        "cpu-fallback",
    ]

    modules = ["numpy"]
    if runtime.cv2 is not None:
        modules.append("opencv")
        features.extend(
            [
                "sharpness",
                "blur",
                "noise",
                "exposure",
                "white-balance",
                "motion",
                "camera-shake",
                "composition",
                "rule-of-thirds",
                "horizon",
                "foreground-background",
                "scene-estimate",
            ]
        )
    if runtime.pillow:
        modules.append("pillow")
    if runtime.onnxruntime is not None:
        modules.append("onnxruntime")
    if runtime.openvinoAvailable:
        modules.append("openvino")

    available = runtime.cv2 is not None
    reason = None
    if runtime.cv2 is None:
        reason = (
            "OpenCV is unavailable. Vision frame analysis requires opencv-python-headless. "
            "CPU fallback remains configured for NumPy-only metrics, but full frame analysis is disabled."
        )

    return VisionCapabilities(
        available=available,
        version=VISION_VERSION,
        # Phase 5 does not load an ONNX model. Merely detecting a provider must
        # not be reported as GPU-accelerated analysis.
        gpuAccelerated=False,
        cpuFallback=True,
        opencvVersion=_module_version(runtime.cv2, "__version__"),
        numpyVersion=_module_version(runtime.numpy, "__version__"),
        pillowVersion="available" if runtime.pillow else "",
        onnxRuntimeVersion=onnx_runtime_version,
        onnxRuntimeProviders=onnx_runtime_providers,
        openVinoAvailable=openvino_available,
        modules=modules,
        features=features,
        reason=reason,
    )


class VisionService:
    def __init__(self, bind: str, base_url: str, version: str) -> None:
        self.bind = bind
        self.base_url = base_url
        self.version = version
        self.runtime = VisionRuntime()
        self.preprocessor: Optional[ImagePreprocessor] = None
        self.analyzer: Optional[VisionAnalyzer] = None
        self.jobs: Dict[str, VisionJobRecord] = {}
        self._lock = asyncio.Lock()

    async def submit(self, request: VisionRequest) -> str:
        cache_store = CacheStore.from_runtime(
            ttl_seconds=request.cache.ttlSeconds,
            max_bytes=request.cache.maxBytes,
        )
        cache_store.cleanup()
        result = VisionReport(
            schemaVersion=1,
            jobId=request.jobId,
            requestId=request.requestId,
            status="running",
            sidecar=SidecarStatus(status="available", baseUrl=self.base_url, version=self.version),
            visionVersion=request.visionVersion,
            gpuAccelerated=False,
            progress={
                "completedFrames": 0,
                "totalFrames": len(request.frames),
                "completedClips": 0,
                "totalClips": _clip_count(request.frames),
                "cacheHits": 0,
                "cacheMisses": 0,
            },
            clips=[],
            failures=[],
            warnings=[],
            startedAt=_now_iso(),
        )
        record = VisionJobRecord(request=request, result=result, cancel_event=asyncio.Event(), task=None)
        async with self._lock:
            self.jobs[request.jobId] = record
        record.task = asyncio.create_task(self._run_job(record, cache_store))
        return request.jobId

    async def get(self, job_id: str) -> VisionBatchAnalysis:
        if job_id not in self.jobs:
            raise KeyError(job_id)
        return self.jobs[job_id].result

    async def cancel(self, job_id: str) -> None:
        if job_id not in self.jobs:
            raise KeyError(job_id)
        record = self.jobs[job_id]
        record.cancel_event.set()
        if record.task is not None:
            record.task.cancel()
            try:
                await record.task
            except asyncio.CancelledError:
                pass
        record.result.status = "cancelled"
        record.result.completedAt = _now_iso()

    async def shutdown(self) -> None:
        for record in list(self.jobs.values()):
            record.cancel_event.set()
            if record.task is not None:
                record.task.cancel()

    async def _run_job(self, record: VisionJobRecord, cache_store: CacheStore) -> None:
        semaphore = asyncio.Semaphore(record.request.limits.concurrency)
        try:
            workers = [
                asyncio.create_task(self._process_frame(record, cache_store, semaphore, frame))
                for frame in record.request.frames
            ]
            await asyncio.gather(*workers)
            if record.cancel_event.is_set():
                record.result.status = "cancelled"
            else:
                self._build_clip_analyses(record)
                record.result.status = "completed"
        except asyncio.CancelledError:
            record.result.status = "cancelled"
            self._append_failure(
                record,
                VisionFailure(
                    taskId=record.request.jobId,
                    status="cancelled",
                    message="Vision analysis job cancelled.",
                    attempts=0,
                    recordedAt=_now_iso(),
                ),
            )
        except (VisionDependencyError, InvalidImageError, UnsupportedImageError, RuntimeError) as exc:
            record.result.status = "failed"
            record.result.sidecar.reason = str(exc)
            record.result.warnings.append(str(exc))
        finally:
            record.result.completedAt = _now_iso()

    async def _process_frame(
        self,
        record: VisionJobRecord,
        cache_store: CacheStore,
        semaphore: asyncio.Semaphore,
        frame: VisionFrameTask,
    ) -> None:
        async with semaphore:
            self._check_cancelled(record)
            ensure_within_roots(frame.imagePath, record.request.approvedRoots)
            record.result.progress.currentFrameSampleId = frame.frameSampleId
            record.result.progress.currentClipId = frame.clipId
            record.result.progress.currentClipName = frame.clipName

            attempts = 0
            while attempts <= record.request.limits.retryLimit:
                attempts += 1
                try:
                    analysis, cache_hit = await asyncio.to_thread(
                        self._analyze_single_frame,
                        cache_store,
                        record.request,
                        frame,
                    )
                    self._store_analysis(record, analysis, cache_hit)
                    return
                except asyncio.CancelledError:
                    raise
                except Exception as exc:
                    if attempts > record.request.limits.retryLimit:
                        self._append_failure(
                            record,
                            VisionFailure(
                                taskId=f"vision:{frame.frameSampleId}",
                                frameSampleId=frame.frameSampleId,
                                clipId=frame.clipId,
                                status="failed",
                                message=str(exc),
                                attempts=attempts,
                                recordedAt=_now_iso(),
                            ),
                        )
                        record.result.progress.cacheMisses += 1
                        self._increment_frame_if_missing(record, frame)
                        return

    def _analyze_single_frame(
        self,
        cache_store: CacheStore,
        request: VisionRequest,
        frame: VisionFrameTask,
    ) -> Tuple[VisionFrameAnalysisResult, bool]:
        if self.runtime.cv2 is None:
            raise VisionDependencyError(
                "OpenCV is unavailable. Install opencv-python-headless to enable local frame analysis."
            )

        cache_key = build_vision_cache_key(request, frame)
        cached = VisionCache(cache_store).get(cache_key)
        if cached is not None:
            return cached, True

        if self.preprocessor is None:
            self.preprocessor = ImagePreprocessor(self.runtime)
        if self.analyzer is None:
            self.analyzer = VisionAnalyzer(self.runtime)
        preprocess = self.preprocessor.preprocess(frame.imagePath, request.parameters)
        processed_at = _now_iso()
        analysis = self.analyzer.analyze(
            preprocess=preprocess,
            task=frame,
            vision_version=request.visionVersion,
            cache_key=cache_key,
            cache_status="miss",
            processed_at=processed_at,
        )
        VisionCache(cache_store).put(cache_key, analysis)
        return analysis, False

    def _read_cached(self, cache_store: CacheStore, cache_key: str) -> Optional[VisionFrameAnalysisResult]:
        path = cache_store.vision_output_path(cache_key)
        if not path.exists():
            return None
        try:
            payload = json.loads(path.read_text(encoding="utf-8"))
            return VisionFrameAnalysisResult.model_validate(payload)
        except Exception:
            return None

    def _write_cached(
        self,
        cache_store: CacheStore,
        cache_key: str,
        analysis: VisionFrameAnalysisResult,
    ) -> None:
        path = cache_store.vision_output_path(cache_key)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(analysis.model_dump_json(), encoding="utf-8")

    def _store_analysis(
        self,
        record: VisionJobRecord,
        analysis: VisionFrameAnalysisResult,
        cache_hit: bool,
    ) -> None:
        result = record.result
        result.progress.completedFrames += 1
        if cache_hit:
            result.progress.cacheHits += 1
        else:
            result.progress.cacheMisses += 1

        clip_entry = next((entry for entry in result.clips if entry.clipId == analysis.clipId), None)
        if clip_entry is None:
            result.clips.append(
                VisionClipAnalysis(
                    clipId=analysis.clipId,
                    clipName=analysis.clipName,
                    frameCount=1,
                    frames=[analysis],
                )
            )
        else:
            clip_entry.frames.append(analysis)
            clip_entry.frameCount += 1

    def _increment_frame_if_missing(self, record: VisionJobRecord, frame: VisionFrameTask) -> None:
        if not any(entry.frameSampleId == frame.frameSampleId for entry in _all_frame_analyses(record.result)):
            record.result.progress.completedFrames += 1

    def _build_clip_analyses(self, record: VisionJobRecord) -> None:
        for clip in record.result.clips:
            if not clip.frames:
                clip.source = "unavailable"
                clip.fallbackReason = "No extracted frame was available for this clip."
                continue
            available_frames = [entry for entry in clip.frames if entry.error is None]
            if not available_frames:
                clip.source = "unavailable"
                clip.fallbackReason = "Every extracted frame failed analysis for this clip."
                continue
            clip.source = "measured" if len(available_frames) == len(clip.frames) else "partial"
            if clip.source == "partial":
                clip.fallbackReason = (
                    f"{len(clip.frames) - len(available_frames)} frame(s) failed analysis; "
                    "the clip summary uses only measured frames."
                )
            clip.qualityScore = round(
                sum(entry.qualityScore for entry in available_frames) / len(available_frames), 2
            )
            clip.rejectScore = round(
                sum(entry.rejectScore for entry in available_frames) / len(available_frames), 2
            )
            clip.bestFrameSampleId = max(available_frames, key=lambda entry: entry.qualityScore).frameSampleId
            clip.worstFrameSampleId = min(available_frames, key=lambda entry: entry.qualityScore).frameSampleId
            clip.confidence = round(
                sum(entry.confidence.scene for entry in available_frames) / len(available_frames), 3
            )
            clip.warnings = _aggregate_warnings(available_frames)

    def _append_failure(self, record: VisionJobRecord, failure: VisionFailure) -> None:
        record.result.failures.append(failure)

    def _check_cancelled(self, record: VisionJobRecord) -> None:
        if record.cancel_event.is_set():
            raise asyncio.CancelledError()

    def _gpu_accelerated(self) -> bool:
        if self.runtime.onnxruntime is None:
            return False
        try:
            providers = list(self.runtime.onnxruntime.get_available_providers())
        except Exception:
            return False
        return _is_gpu_provider(providers)


def build_vision_cache_key(request: VisionRequest, frame: VisionFrameTask) -> str:
    payload = json.dumps(
        {
            "frameSampleId": frame.frameSampleId,
            "contentHash": frame.contentHash,
            "extractorVersion": frame.extractorVersion,
            "visionVersion": request.visionVersion,
            "parameters": request.parameters.model_dump(),
        },
        sort_keys=True,
        separators=(",", ":"),
    )
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()[:40]


def _aggregate_warnings(frames: List[VisionFrameAnalysisResult]) -> List[VisionWarning]:
    counts: Dict[str, int] = {}
    by_code: Dict[str, VisionWarning] = {}
    for entry in frames:
        for warning in entry.warnings:
            by_code[warning.code] = warning
            counts[warning.code] = counts.get(warning.code, 0) + 1
    result: List[VisionWarning] = []
    for code, warning in by_code.items():
        result.append(
            VisionWarning(
                code=warning.code,
                label=warning.label,
                severity=warning.severity,
                reason=f"{warning.reason} Appeared in {counts[code]}/{len(frames)} analyzed frames.",
            )
        )
    return result


def _all_frame_analyses(result: VisionBatchAnalysis) -> List[VisionFrameAnalysisResult]:
    return [entry for clip in result.clips for entry in clip.frames]


def _clip_count(frames: List[VisionFrameTask]) -> int:
    return len({frame.clipId for frame in frames})


def _is_gpu_provider(providers: List[str]) -> bool:
    return any(provider.endswith("ExecutionProvider") and "CPU" not in provider for provider in providers)


def _module_version(module: object, attribute: str) -> str:
    if module is None:
        return ""
    try:
        return str(getattr(module, attribute))
    except Exception:
        return "available"


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()
