from __future__ import annotations

import asyncio
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Optional

from .cache import CacheStore
from .extractor import ExtractionDependencyError, extract_audio_proxy, extract_frame_sample
from .models import (
    AudioExtractionTask,
    ClipExtractionResult,
    ExtractionFailure,
    ExtractionRequest,
    ExtractionResult,
    FrameExtractionTask,
    SidecarStatus,
)
from .security import PathAccessError, ensure_within_roots


@dataclass
class JobRecord:
    request: ExtractionRequest
    result: ExtractionResult
    cancel_event: asyncio.Event
    task: Optional[asyncio.Task]


class ExtractionService:
    def __init__(self, bind: str, base_url: str, version: str) -> None:
        self.bind = bind
        self.base_url = base_url
        self.version = version
        self.jobs: Dict[str, JobRecord] = {}
        self._lock = asyncio.Lock()

    async def submit(self, request: ExtractionRequest) -> str:
        cache_store = CacheStore.from_runtime(
            ttl_seconds=request.cache.ttlSeconds,
            max_bytes=request.cache.maxBytes,
        )
        cache_store.cleanup()
        result = ExtractionResult(
            jobId=request.jobId,
            requestId=request.requestId,
            status="running",
            sidecar=SidecarStatus(status="available", baseUrl=self.base_url, version=self.version),
            progress={
                "completedClips": 0,
                "remainingClips": len(request.frameTasks),
                "totalClips": len(request.frameTasks),
                "completedAudioTasks": 0,
                "totalAudioTasks": len(request.audioTasks),
                "cacheHits": 0,
                "cacheMisses": 0,
            },
            clipResults=[],
            frameSamples=[],
            audioExtractions=[],
            failures=[],
            warnings=[],
            startedAt=_now_iso(),
        )
        record = JobRecord(request=request, result=result, cancel_event=asyncio.Event(), task=None)
        async with self._lock:
            self.jobs[request.jobId] = record
        record.task = asyncio.create_task(self._run_job(record, cache_store))
        return request.jobId

    async def get(self, job_id: str) -> ExtractionResult:
        async with self._lock:
            record = self.jobs[job_id]
        return record.result

    async def cancel(self, job_id: str) -> None:
        async with self._lock:
            record = self.jobs[job_id]
        record.cancel_event.set()
        if record.task:
            record.task.cancel()
            try:
                await record.task
            except asyncio.CancelledError:
                pass
        record.result.status = "cancelled"
        record.result.completedAt = _now_iso()

    async def shutdown(self) -> None:
        async with self._lock:
            jobs = list(self.jobs.values())
        for record in jobs:
            record.cancel_event.set()
            if record.task:
                record.task.cancel()

    async def _run_job(self, record: JobRecord, cache_store: CacheStore) -> None:
        semaphore = asyncio.Semaphore(record.request.limits.concurrency)
        try:
            frame_workers = [
                asyncio.create_task(self._process_frame_task(record, cache_store, semaphore, task))
                for task in record.request.frameTasks
            ]
            audio_workers = [
                asyncio.create_task(self._process_audio_task(record, cache_store, semaphore, task))
                for task in record.request.audioTasks
            ]
            await asyncio.gather(*frame_workers, *audio_workers)
            if record.cancel_event.is_set():
                record.result.status = "cancelled"
            else:
                record.result.status = "completed"
        except asyncio.CancelledError:
            record.result.status = "cancelled"
            self._append_failure(
                record,
                ExtractionFailure(
                    taskId=record.request.jobId,
                    targetKind="frames",
                    status="cancelled",
                    message="Extraction job cancelled.",
                    attempts=0,
                    recordedAt=_now_iso(),
                ),
            )
        except (ExtractionDependencyError, PathAccessError, RuntimeError) as exc:
            record.result.status = "failed"
            record.result.sidecar.reason = str(exc)
            record.result.warnings.append(str(exc))
        finally:
            record.result.completedAt = _now_iso()

    async def _process_frame_task(
        self,
        record: JobRecord,
        cache_store: CacheStore,
        semaphore: asyncio.Semaphore,
        task: FrameExtractionTask,
    ) -> None:
        async with semaphore:
            self._check_cancelled(record)
            ensure_within_roots(task.mediaPath, record.request.approvedRoots)
            record.result.progress.currentClipId = task.clipId
            record.result.progress.currentClipName = task.clipName
            attempts = 0
            while attempts <= record.request.limits.retryLimit:
                attempts += 1
                try:
                    frame_samples = []
                    cache_hits = 0
                    for sample in task.samplePlan:
                        self._check_cancelled(record)
                        frame_result, cache_hit = await asyncio.to_thread(
                            extract_frame_sample,
                            cache_store,
                            task,
                            sample,
                        )
                        frame_samples.append(frame_result)
                        if cache_hit:
                            cache_hits += 1
                    record.result.frameSamples.extend(frame_samples)
                    record.result.clipResults.append(
                        ClipExtractionResult(
                            clipId=task.clipId,
                            clipName=task.clipName,
                            frameSampleIds=[sample.id for sample in frame_samples],
                            status="available",
                            cacheHits=cache_hits,
                            cacheMisses=len(frame_samples) - cache_hits,
                            attempts=attempts,
                        )
                    )
                    record.result.progress.completedClips += 1
                    record.result.progress.remainingClips = max(
                        0, record.result.progress.totalClips - record.result.progress.completedClips
                    )
                    record.result.progress.cacheHits += cache_hits
                    record.result.progress.cacheMisses += len(frame_samples) - cache_hits
                    return
                except Exception as exc:  # pragma: no cover - retry path covered in tests via stub
                    if attempts > record.request.limits.retryLimit:
                        self._append_failure(
                            record,
                            ExtractionFailure(
                                taskId=f"frames:{task.clipId}",
                                clipId=task.clipId,
                                targetKind="frames",
                                status="failed",
                                message=str(exc),
                                attempts=attempts,
                                recordedAt=_now_iso(),
                            ),
                        )
                        record.result.clipResults.append(
                            ClipExtractionResult(
                                clipId=task.clipId,
                                clipName=task.clipName,
                                frameSampleIds=[sample.id for sample in task.samplePlan],
                                status="failed",
                                cacheHits=0,
                                cacheMisses=len(task.samplePlan),
                                attempts=attempts,
                                error=str(exc),
                            )
                        )
                        record.result.progress.completedClips += 1
                        record.result.progress.remainingClips = max(
                            0, record.result.progress.totalClips - record.result.progress.completedClips
                        )
                        record.result.progress.cacheMisses += len(task.samplePlan)
                        return

    async def _process_audio_task(
        self,
        record: JobRecord,
        cache_store: CacheStore,
        semaphore: asyncio.Semaphore,
        task: AudioExtractionTask,
    ) -> None:
        async with semaphore:
            self._check_cancelled(record)
            ensure_within_roots(task.mediaPath, record.request.approvedRoots)
            attempts = 0
            while attempts <= record.request.limits.retryLimit:
                attempts += 1
                try:
                    audio_result, cache_hit = await asyncio.to_thread(
                        extract_audio_proxy,
                        cache_store,
                        task,
                    )
                    record.result.audioExtractions.append(audio_result)
                    record.result.progress.completedAudioTasks += 1
                    if cache_hit:
                        record.result.progress.cacheHits += 1
                    else:
                        record.result.progress.cacheMisses += 1
                    return
                except Exception as exc:  # pragma: no cover
                    if attempts > record.request.limits.retryLimit:
                        self._append_failure(
                            record,
                            ExtractionFailure(
                                taskId=task.id,
                                clipId=task.clipId,
                                audioTaskId=task.id,
                                targetKind="audio",
                                status="failed",
                                message=str(exc),
                                attempts=attempts,
                                recordedAt=_now_iso(),
                            ),
                        )
                        record.result.progress.completedAudioTasks += 1
                        record.result.progress.cacheMisses += 1
                        return

    def _append_failure(self, record: JobRecord, failure: ExtractionFailure) -> None:
        record.result.failures.append(failure)

    def _check_cancelled(self, record: JobRecord) -> None:
        if record.cancel_event.is_set():
            raise asyncio.CancelledError()


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()
