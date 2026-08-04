from __future__ import annotations

from typing import List, Literal, Optional

from pydantic import BaseModel, Field


class FrameSamplePlan(BaseModel):
    id: str
    sourceTimeSeconds: float
    sampleKind: Literal["start", "middle", "end", "beat", "custom"]


class FrameExtractionTask(BaseModel):
    clipId: str
    clipName: str
    mediaPath: str
    mediaFingerprint: str
    cacheKey: str
    sourceInSeconds: float
    sourceOutSeconds: float
    samplePlan: List[FrameSamplePlan]


class AudioExtractionTask(BaseModel):
    id: str
    sourceKind: Literal["selected-song", "clip-audio"]
    clipId: Optional[str] = None
    label: str
    mediaPath: str
    mediaFingerprint: str
    cacheKey: str


class CacheConfig(BaseModel):
    rootName: Literal["rkflow-cache"]
    extractorVersion: str
    ttlSeconds: int = Field(ge=1)
    maxBytes: int = Field(ge=1)


class LimitsConfig(BaseModel):
    concurrency: int = Field(ge=1, le=8)
    retryLimit: int = Field(ge=0, le=5)


class ExtractionRequest(BaseModel):
    schemaVersion: Literal[1]
    jobId: str
    requestId: str
    requestedAt: str
    approvedRoots: List[str]
    frameTasks: List[FrameExtractionTask]
    audioTasks: List[AudioExtractionTask]
    cache: CacheConfig
    limits: LimitsConfig


class SidecarStatus(BaseModel):
    status: Literal["available", "unavailable"]
    baseUrl: Optional[str] = None
    version: Optional[str] = None
    reason: Optional[str] = None


class ProgressSnapshot(BaseModel):
    currentClipId: Optional[str] = None
    currentClipName: Optional[str] = None
    completedClips: int = 0
    remainingClips: int = 0
    totalClips: int = 0
    completedAudioTasks: int = 0
    totalAudioTasks: int = 0
    cacheHits: int = 0
    cacheMisses: int = 0


class ClipExtractionResult(BaseModel):
    clipId: str
    clipName: str
    frameSampleIds: List[str]
    status: Literal["available", "partial", "unavailable", "failed"]
    cacheHits: int
    cacheMisses: int
    attempts: int
    error: Optional[str] = None


class FrameSampleResult(BaseModel):
    id: str
    clipId: str
    sourceTimeSeconds: float
    sampleKind: Literal["start", "middle", "end", "beat", "custom"]
    imagePath: Optional[str] = None
    contentHash: Optional[str] = None
    width: Optional[int] = None
    height: Optional[int] = None
    cacheKey: Optional[str] = None
    cacheStatus: Literal["hit", "miss", "unavailable"] = "miss"
    error: Optional[str] = None
    capabilityReason: Optional[str] = None
    extractionStatus: Literal["pending", "available", "unavailable", "failed"] = "pending"
    capturedAt: str


class AudioWaveformPoint(BaseModel):
    timeSeconds: float
    amplitude: float


class AudioExtractionResult(BaseModel):
    id: str
    taskId: str
    sourceKind: Literal["selected-song", "clip-audio"]
    clipId: Optional[str] = None
    sourcePath: Optional[str] = None
    outputPath: Optional[str] = None
    cacheKey: str
    cacheStatus: Literal["hit", "miss", "unavailable"] = "miss"
    extractionStatus: Literal["available", "unavailable", "failed"]
    durationSeconds: Optional[float] = None
    sampleRate: Optional[int] = None
    channels: Optional[int] = None
    codec: Optional[str] = None
    waveform: List[AudioWaveformPoint] = []
    extractedAt: str
    error: Optional[str] = None
    capabilityReason: Optional[str] = None


class ExtractionFailure(BaseModel):
    taskId: str
    clipId: Optional[str] = None
    audioTaskId: Optional[str] = None
    targetKind: Literal["frames", "audio"]
    status: Literal["unavailable", "failed", "cancelled"]
    message: str
    attempts: int
    recordedAt: str


class ExtractionResult(BaseModel):
    schemaVersion: Literal[1] = 1
    jobId: str
    requestId: str
    status: Literal["running", "completed", "cancelled", "failed", "sidecar-unavailable"]
    sidecar: SidecarStatus
    progress: ProgressSnapshot
    clipResults: List[ClipExtractionResult]
    frameSamples: List[FrameSampleResult]
    audioExtractions: List[AudioExtractionResult]
    failures: List[ExtractionFailure]
    warnings: List[str]
    startedAt: str
    completedAt: Optional[str] = None
