from __future__ import annotations

from typing import List, Literal, Optional

from pydantic import BaseModel, Field

from .models import CacheConfig, LimitsConfig, SidecarStatus


class VisionParameters(BaseModel):
    maxDimension: int = Field(default=512, ge=128, le=1024)
    normalizeHistogram: bool = True
    brightnessNormalize: bool = True
    letterboxSize: int = Field(default=512, ge=128, le=1024)


class VisionFrameTask(BaseModel):
    frameSampleId: str
    clipId: str
    clipName: str
    imagePath: str
    contentHash: str
    extractorVersion: str
    sampleKind: Literal["start", "middle", "end", "beat", "custom"]
    sourceTimeSeconds: float
    width: Optional[int] = None
    height: Optional[int] = None
    extractorCacheKey: str = ""


class VisionRequest(BaseModel):
    schemaVersion: Literal[1] = 1
    jobId: str
    requestId: str
    requestedAt: str
    approvedRoots: List[str]
    visionVersion: str
    frames: List[VisionFrameTask]
    parameters: VisionParameters = Field(default_factory=VisionParameters)
    cache: CacheConfig
    limits: LimitsConfig


class VisionWarning(BaseModel):
    code: str
    label: str
    severity: Literal["info", "warning", "reject"]
    reason: str


class VisionWhiteBalanceEstimate(BaseModel):
    temperatureK: Optional[int] = None
    tint: float = 0.0
    neutral: bool = False
    confidence: float = 0.0


class VisionHorizonEstimate(BaseModel):
    angleDegrees: Optional[float] = None
    present: bool = False
    confidence: float = 0.0
    note: str = ""


class VisionSceneEstimate(BaseModel):
    indoorOutdoor: Literal["indoor", "outdoor", "unknown"]
    dayNight: Literal["day", "night", "unknown"]
    shotType: Literal["wide", "medium", "close", "detail", "unknown"]
    droneLikelihood: float = Field(default=0.0, ge=0.0, le=1.0)
    confidence: float = 0.0
    notes: List[str] = []


class VisionConfidence(BaseModel):
    sharpness: float = 0.0
    blur: float = 0.0
    noise: float = 0.0
    exposure: float = 0.0
    brightness: float = 0.0
    contrast: float = 0.0
    saturation: float = 0.0
    whiteBalance: float = 0.0
    motion: float = 0.0
    cameraShake: float = 0.0
    edgeDensity: float = 0.0
    composition: float = 0.0
    ruleOfThirds: float = 0.0
    horizon: float = 0.0
    foregroundBackground: float = 0.0
    scene: float = 0.0


class VisionFrameAnalysisResult(BaseModel):
    frameSampleId: str
    clipId: str
    clipName: str
    sampleKind: str
    sourceTimeSeconds: float
    contentHash: str
    visionVersion: str
    processedAt: str
    cacheKey: str
    cacheStatus: Literal["hit", "miss", "unavailable"] = "miss"
    sharpness: float = 0.0
    blurScore: float = 0.0
    noiseScore: float = 0.0
    exposure: float = 0.0
    brightness: float = 0.0
    contrast: float = 0.0
    saturation: float = 0.0
    whiteBalanceEstimate: VisionWhiteBalanceEstimate = Field(default_factory=VisionWhiteBalanceEstimate)
    motionEstimate: float = 0.0
    cameraShake: float = 0.0
    edgeDensity: float = 0.0
    compositionEstimate: float = 0.0
    ruleOfThirdsEstimate: float = 0.0
    horizonEstimate: VisionHorizonEstimate = Field(default_factory=VisionHorizonEstimate)
    foregroundRatio: float = 0.0
    backgroundRatio: float = 0.0
    sceneEstimate: VisionSceneEstimate = Field(default_factory=lambda: VisionSceneEstimate(indoorOutdoor="unknown", dayNight="unknown", shotType="unknown"))
    qualityScore: float = 0.0
    rejectScore: float = 0.0
    warnings: List[VisionWarning] = []
    confidence: VisionConfidence = Field(default_factory=VisionConfidence)
    capabilities: List[str] = []
    fallbackReason: Optional[str] = None
    error: Optional[str] = None


class VisionClipAnalysis(BaseModel):
    clipId: str
    clipName: str
    frameCount: int = 0
    qualityScore: float = 0.0
    rejectScore: float = 0.0
    bestFrameSampleId: Optional[str] = None
    worstFrameSampleId: Optional[str] = None
    warnings: List[VisionWarning] = []
    frames: List[VisionFrameAnalysisResult] = []
    confidence: float = 0.0
    source: Literal["measured", "partial", "unavailable"] = "unavailable"
    fallbackReason: Optional[str] = None


class VisionProgressSnapshot(BaseModel):
    currentFrameSampleId: Optional[str] = None
    currentClipId: Optional[str] = None
    currentClipName: Optional[str] = None
    completedFrames: int = 0
    totalFrames: int = 0
    completedClips: int = 0
    totalClips: int = 0
    cacheHits: int = 0
    cacheMisses: int = 0


class VisionFailure(BaseModel):
    taskId: str
    frameSampleId: Optional[str] = None
    clipId: Optional[str] = None
    status: Literal["unavailable", "failed", "cancelled"]
    message: str
    attempts: int = 1
    recordedAt: str


class VisionBatchAnalysis(BaseModel):
    schemaVersion: Literal[1] = 1
    jobId: str
    requestId: str
    status: Literal["running", "completed", "cancelled", "failed", "sidecar-unavailable"]
    sidecar: SidecarStatus
    visionVersion: str
    gpuAccelerated: bool = False
    progress: VisionProgressSnapshot = Field(default_factory=VisionProgressSnapshot)
    clips: List[VisionClipAnalysis] = []
    failures: List[VisionFailure] = []
    warnings: List[str] = []
    startedAt: str
    completedAt: Optional[str] = None


class VisionReport(VisionBatchAnalysis):
    """Named report contract returned to the UI after a Vision batch completes."""


class VisionCapabilities(BaseModel):
    available: bool = False
    version: str = ""
    gpuAccelerated: bool = False
    cpuFallback: bool = True
    opencvVersion: str = ""
    numpyVersion: str = ""
    pillowVersion: str = ""
    onnxRuntimeVersion: Optional[str] = None
    onnxRuntimeProviders: List[str] = []
    openVinoAvailable: bool = False
    modules: List[str] = []
    features: List[str] = []
    reason: Optional[str] = None
