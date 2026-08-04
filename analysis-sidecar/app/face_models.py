from __future__ import annotations
from typing import List, Literal, Optional
from pydantic import BaseModel, Field
from .models import CacheConfig, LimitsConfig, SidecarStatus
from .vision_models import VisionFrameTask

FACE_MODEL_VERSION = "phase-6-anonymous-opencv-haar-v1"

class FaceParameters(BaseModel):
    minFacePixels: int = Field(default=24, ge=10, le=256)
    detector: Literal["yunet", "opencv-haar"] = "yunet"

class FaceRequest(BaseModel):
    schemaVersion: Literal[1] = 1
    jobId: str; requestId: str; requestedAt: str; approvedRoots: List[str]
    visionVersion: str; faceModelVersion: str = FACE_MODEL_VERSION
    frames: List[VisionFrameTask]; parameters: FaceParameters = Field(default_factory=FaceParameters)
    cache: CacheConfig; limits: LimitsConfig

class DetectedFace(BaseModel):
    id: str; frameSampleId: str; clipId: str; boundingBox: dict; confidence: float
    landmarks: List[dict] = []; yaw: Optional[float] = None; pitch: Optional[float] = None; roll: Optional[float] = None
    faceSize: float; frontalScore: float; eyeVisibility: float; occlusionEstimate: float; blur: float; lighting: float; qualityScore: float; rejectScore: float
    capabilityReasons: List[str] = []

class FaceCluster(BaseModel):
    id: str; faceIds: List[str] = []; clipIds: List[str] = []; bestFrameSampleId: Optional[str] = None; coverageSeconds: float = 0

class FaceTimeline(BaseModel):
    clipId: str; frameSampleId: str; timestampSeconds: float; clusterId: str; faceId: str; confidence: float

class FaceCapabilities(BaseModel):
    available: bool; detector: str; detectorArtifact: Optional[str] = None; landmarksAvailable: bool = False; embeddingProviderEnabled: bool = False; reason: Optional[str] = None

class FaceReport(BaseModel):
    schemaVersion: Literal[1] = 1; jobId: str; requestId: str
    status: Literal["running", "completed", "cancelled", "failed", "sidecar-unavailable"]
    sidecar: SidecarStatus; faceModelVersion: str; capabilities: FaceCapabilities
    progress: dict = {}; faces: List[DetectedFace] = []; clusters: List[FaceCluster] = []; timeline: List[FaceTimeline] = []
    cacheHits: int = 0; cacheMisses: int = 0; warnings: List[str] = []; startedAt: str; completedAt: Optional[str] = None
