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

# --- Phase 9: Music AI Models ---

MusicSourceType = Literal[
    "local_file", "premiere_project_item", "authorized_direct_url",
    "social_reference", "no_music"
]

class MusicSource(BaseModel):
    type: MusicSourceType
    path: Optional[str] = None  # For local_file, premiere_project_item, authorized_direct_url
    url: Optional[str] = None  # For social_reference, authorized_direct_url
    project_item_id: Optional[str] = None  # For premiere_project_item
    name: Optional[str] = None
    fingerprint: Optional[str] = None
    cache_key: Optional[str] = None
    capability_reason: Optional[str] = None

class AudioProbeResult(BaseModel):
    duration_seconds: float
    codec: Optional[str] = None
    container: Optional[str] = None
    sample_rate: Optional[int] = None
    channels: Optional[int] = None
    bit_depth: Optional[int] = None
    loudness_metadata: Optional[float] = None
    start_time: Optional[float] = None
    stream_index: Optional[int] = None
    file_size: Optional[int] = None
    fingerprint: str
    source_path_status: Literal["approved", "unapproved", "unavailable"]
    capability_reason: Optional[str] = None

class BeatPoint(BaseModel):
    timestamp: float
    confidence: float
    is_downbeat: bool

class OnsetPoint(BaseModel):
    timestamp: float
    strength: float

class EnergyPoint(BaseModel):
    timestamp: float
    rms: float
    normalized_energy: float = Field(..., ge=0, le=1)
    onset_strength: float
    beat_proximity: float
    confidence: float
    is_silence: bool

MusicSectionType = Literal[
    "intro_candidate", "low_energy", "medium_energy", "high_energy",
    "repeated_section", "chorus_candidate", "drop_candidate",
    "emotional_candidate", "outro_candidate", "unknown"
]

class MusicSection(BaseModel):
    id: str
    start_seconds: float
    end_seconds: float
    duration_seconds: float
    type: MusicSectionType
    confidence: float
    energy_average: float
    energy_peak: float
    beat_density: float
    onset_density: float
    repetition_score: float
    editorial_suitability: List[str]

TempoCategory = Literal[
    "very_slow", "slow", "medium", "fast", "very_fast", "unstable", "unknown"
]

EditorialCategory = Literal[
    "romantic", "emotional", "cinematic", "celebratory", "energetic",
    "luxury", "documentary", "calm", "mixed", "unknown"
]

class MusicEditorialProfile(BaseModel):
    overall_tempo_category: TempoCategory
    overall_energy_category: EditorialCategory
    cut_density_recommendation: Literal["sparse", "balanced", "rapid", "unknown"]
    opening_hook_timing: Optional[float] = None
    emotional_section_suggestions: List[Dict[str, float]] # List of {"start": x, "end": y, "confidence": z}
    dance_section_suggestions: List[Dict[str, float]]
    climax_drop_suggestions: List[Dict[str, float]]
    outro_timing: Optional[float] = None
    recommended_reel_duration_ranges: List[Dict[str, float]] # List of {"min": x, "max": y}
    suitable_wedding_modes: List[str]
    unsuitable_modes: List[str]
    confidence: float
    evidence: List[EmotionEvidence] # Reusing EmotionEvidence

class AudioAnalysis(BaseModel):
    clip_id: str # Or a unique ID for the audio source if not tied to a clip
    source: MusicSource
    probe_result: AudioProbeResult
    bpm_estimate: float
    bpm_confidence: float
    beat_timestamps: List[BeatPoint]
    onset_timestamps: List[OnsetPoint]
    energy_curve: List[EnergyPoint]
    sections: List[MusicSection]
    editorial_profile: MusicEditorialProfile
    tempo_stability: float
    transient_density: float
    cache_key: str
    cache_status: Literal["hit", "miss", "unavailable"]
    analysis_version: str
    error: Optional[str] = None
    capability_reason: Optional[str] = None

class MusicProviderStatus(BaseModel):
    provider_name: str
    enabled: bool
    reason: Optional[str] = None

class MusicCapabilities(BaseModel):
    available: bool
    version: str
    ffmpeg_available: bool
    librosa_available: bool
    providers: List[MusicProviderStatus]
    reason: Optional[str] = None

class SFXOpportunity(BaseModel):
    category: Literal[
        "Whoosh", "Hit", "Rise", "Drop", "Impact", "Transition", "Crowd",
        "Applause", "Temple Bell", "Firework", "Camera Shutter", "Sparkle",
        "Soft Swell", "Emotional Boom", "Ambient Room Tone"
    ]
    timestamp: float
    reason: str
    intensity: float = Field(..., ge=0, le=1)
    confidence: float
    required_asset_availability: Literal["available", "unavailable", "unknown"]
    source_provider_status: str

class MusicAnalysisReport(BaseModel):
    job_id: str
    request_id: str
    status: Literal[
        "probing_audio", "extracting_audio", "loading_waveform",
        "analyzing_tempo", "detecting_beats", "detecting_onsets",
        "analyzing_energy", "segmenting_sections", "building_music_profile",
        "awaiting_music_review", "completed", "cancelled", "failed"
    ]
    sidecar: Dict[str, str] # Simplified for now, should be a proper SidecarStatus model
    music_analysis_version: str
    capabilities: MusicCapabilities
    progress: Dict[str, int] # Simplified for now, should be a proper MusicProgress model
    audio_analyses: List[AudioAnalysis]
    sfx_opportunities: List[SFXOpportunity]
    failures: List[Dict] # Simplified
    warnings: List[str]
    started_at: str
    completed_at: Optional[str] = None

class MusicAnalysisRequest(BaseModel):
    clip_id: str
    music_source: MusicSource
    analysis_range_start_seconds: Optional[float] = None
    analysis_range_end_seconds: Optional[float] = None
    preferred_section_type: Optional[MusicSectionType] = None
    enable_beat_snapping: bool = False
    first_beat_offset_seconds: Optional[float] = None
    manual_beat_markers: List[float] = []
    music_importance: float = Field(..., ge=0, le=1)
    parameters: Dict = {} # For future extensibility