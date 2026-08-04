from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Literal

# These are placeholder models for dependencies from other phases
# to make this module independently validatable. In the actual
# application, they would be imported from a central models definition.

class Point(BaseModel):
    x: float
    y: float

class Landmarks(BaseModel):
    left_eye: List[Point]
    right_eye: List[Point]
    mouth_left: Point
    mouth_right: Point

class Face(BaseModel):
    anonymous_id: str
    confidence: float
    blur_score: float
    landmarks: Landmarks

class FaceAnalysis(BaseModel):
    faces: List[Face]

class FrameSample(BaseModel):
    path: str
    timestamp: float
    status: str
    face_analysis: Optional[FaceAnalysis] = None

class VisionSignals(BaseModel):
    optical_flow_motion: float

class WeddingEventSignals(BaseModel):
    dominant_event: str
    confidence: float

# --- Phase 8: Emotion AI Models ---

ExpressionLabel = Literal[
    'smiling', 'neutral', 'surprised', 'sad-looking', 'tense', 'laughing',
    'eyes-closed', 'uncertain'
]

ClipMoodLabel = Literal[
    'joyful', 'romantic', 'emotional', 'energetic', 'calm', 'celebratory',
    'humorous', 'tense', 'neutral', 'uncertain'
]

EmotionEvidenceSource = Literal[
    'facial_expression', 'face_count', 'vision_motion', 'lighting',
    'shot_type', 'wedding_event', 'temporal_context', 'filename_fallback'
]

class EmotionEvidence(BaseModel):
    source: EmotionEvidenceSource
    confidence: float
    details: str

class FacialExpressionEstimate(BaseModel):
    label: ExpressionLabel
    confidence: float
    provider: str
    face_id: str  # Anonymous cluster ID from FaceAI phase
    frame_timestamp: float
    quality_warning: Optional[str] = None
    uncertainty_reason: Optional[str] = None

class ClipExpressionSummary(BaseModel):
    dominant_expression: ExpressionLabel
    secondary_expression: Optional[ExpressionLabel] = None
    smile_score: float = Field(..., ge=0, le=100)
    expression_score: float = Field(..., ge=0, le=100)
    consistency: float = Field(..., ge=0, le=1)

class ClipMoodEstimate(BaseModel):
    dominant_mood: ClipMoodLabel
    secondary_mood: Optional[ClipMoodLabel] = None
    confidence: float
    evidence: List[EmotionEvidence]
    usable_for_edit: bool
    recommended_handling: Literal[
        'longer_hold', 'normal', 'fast_reaction', 'avoid', 'uncertain'
    ]

class EmotionReport(BaseModel):
    clip_id: str
    expression_summary: Optional[ClipExpressionSummary] = None
    mood_estimate: ClipMoodEstimate
    face_expressions: List[FacialExpressionEstimate]

class ExpressionProviderStatus(BaseModel):
    provider_name: str
    enabled: bool
    reason: Optional[str] = None

class EmotionCapabilities(BaseModel):
    providers: List[ExpressionProviderStatus]

class EmotionAnalysisRequest(BaseModel):
    clip_id: str
    frames: List[FrameSample]
    vision_signals: VisionSignals
    wedding_event_signals: Optional[WeddingEventSignals] = None