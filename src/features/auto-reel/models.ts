

export const AUTO_REEL_JOB_STATES = [
  "idle",
  "validating",
  "scanning",
  "extracting",
  "analyzing_vision",
  "analyzing_faces",
  "analyzing_emotion",
  "analyzing_music",
  "scoring",
  "building_story",
  "planning",
  "awaiting_review",
  "executing",
  "completed",
  "cancelled",
  "failed"
] as const;

export type AutoReelJobState = (typeof AUTO_REEL_JOB_STATES)[number];

export const MUSIC_ANALYSIS_JOB_STATES = [
  "probing_audio",
  "extracting_audio",
  "loading_waveform",
  "analyzing_tempo",
  "detecting_beats",
  "detecting_onsets",
  "analyzing_energy",
  "segmenting_sections",
  "building_music_profile",
  "awaiting_music_review",
  "completed",
  "cancelled",
  "failed",
] as const;

export type AutoReelAspectRatio = "9:16" | "16:9" | "1:1" | "4:5";
export type ClipMediaType = "video" | "audio" | "image";
export type AutoReelMetadataStatus = "pending" | "available" | "unavailable" | "failed" | "metadata-fallback" | "host-verified";
export type AutoReelCapabilityNote = { reason: string; source?: string; field?: string; code?: string; severity?: "info" | "warning" | "reject" };
export type SignalSource = "measured" | "provider_model" | "heuristic" | "user_confirmed" | "user_corrected" | "unavailable";


export interface MediaSelection {
    mode: string;
    projectId: string;
    sequenceId: string;
    sequenceName: string;
    clipIds: string[];
    projectItemIds: string[];
    inPointSeconds: number;
    outPointSeconds: number;
    usedFallback: boolean;
    sequenceResolution: { width: number; height: number } | null;
    fps: number | null;
    timebase: number | null;
    playheadSeconds: number | null;
    selectedClipCount: number;
    scannedClipCount: number;
    mediaFingerprint: string;
    cacheKey: string;
    capabilityNotes: AutoReelCapabilityNote[];
}

export interface AutoReelSetupConfig {
    scoringPresetId: string;
    musicSource?: MusicSource;
}

export interface AutoReelRequest {
  id: string;
  prompt: string;
  mediaSelection: MediaSelection;
  targetDurationSeconds?: number;
  aspectRatio: AutoReelAspectRatio;
  outputSequenceName: string;
  createNewSequence: true;
  styleHints: string[];
  preferredEvents: string[];
  excludedClipIds: string[];
  submittedAt: string;
  setup?: AutoReelSetupConfig;
}

export type UserClipPreference = "required" | "excluded" | "preferred" | "neutral";

export interface ClipDescriptor {
  id: string;
  projectItemId?: string | null;
  projectItemNodeId?: string | null;
  name: string;
  mediaType: ClipMediaType;
  mediaPath?: string | null;
  sourceInSeconds: number | null;
  sourceOutSeconds: number | null;
  durationSeconds?: number | null;
  timelineStartSeconds?: number | null;
  timelineEndSeconds?: number | null;
  trackIndex?: number | null;
  trackType?: "video" | "audio" | null;
  speed: number | null;
  disabled: boolean | null;
  selected: boolean | null;
  userPreference?: UserClipPreference;
  linkedClipIds: string[] | null;
  frameRate?: number | null;
  width?: number | null;
  height?: number | null;
  proxyState?: boolean | null;
  lockedTrackState?: boolean | null;
  mediaFingerprint: string;
  cacheKey: string;
  metadataStatus: AutoReelMetadataStatus;
  capabilityNotes: AutoReelCapabilityNote[];
}

export interface FrameSample {
  id: string;
  clipId: string;
  sourceTimeSeconds: number;
  sampleKind: "start" | "middle" | "end" | "beat" | "custom";
  imagePath?: string;
  contentHash?: string;
  width?: number;
  height?: number;
  cacheKey?: string;
  cacheStatus?: "hit" | "miss" | "unavailable";
  error?: string;
  capabilityReason?: string;
  extractionStatus: "pending" | "available" | "unavailable" | "failed";
  capturedAt?: string;
}

export interface VisionSignals {
  clipId: string;
  source: SignalSource;
  confidence: number;
  sharpness?: number;
  blur?: number;
  exposure?: number;
  noise?: number;
  cameraShake?: number;
  motion?: number;
  focus?: number;
  framing?: number;
  cameraAngle?: string;
  shotType?: string;
  compositionNotes: string[];
  frameSampleIds: string[];
}

export interface VisionWarning {
  code: string;
  label: string;
  severity: "info" | "warning" | "reject";
  reason: string;
}

export interface VisionMetricConfidence {
  sharpness: number; blur: number; noise: number; exposure: number; brightness: number;
  contrast: number; saturation: number; whiteBalance: number; motion: number; cameraShake: number;
  edgeDensity: number; composition: number; ruleOfThirds: number; horizon: number;
  foregroundBackground: number; scene: number;
}

export interface VisionFrameAnalysis {
  frameSampleId: string; clipId: string; clipName: string; sampleKind: FrameSample["sampleKind"];
  sourceTimeSeconds: number; contentHash: string; visionVersion: string; processedAt: string;
  cacheKey: string; cacheStatus: "hit" | "miss" | "unavailable";
  sharpness: number; blurScore: number; noiseScore: number; exposure: number; brightness: number;
  contrast: number; saturation: number;
  whiteBalanceEstimate: { temperatureK?: number; tint: number; neutral: boolean; confidence: number };
  motionEstimate: number; cameraShake: number; edgeDensity: number; compositionEstimate: number;
  ruleOfThirdsEstimate: number;
  horizonEstimate: { angleDegrees?: number; present: boolean; confidence: number; note: string };
  foregroundRatio: number; backgroundRatio: number;
  sceneEstimate: {
    indoorOutdoor: "indoor" | "outdoor" | "unknown"; dayNight: "day" | "night" | "unknown";
    shotType: "wide" | "medium" | "close" | "detail" | "unknown"; droneLikelihood: number;
    confidence: number; notes: string[];
  };
  qualityScore: number; rejectScore: number; warnings: VisionWarning[];
  confidence: VisionMetricConfidence; capabilities: string[]; fallbackReason?: string; error?: string;
}

export interface VisionClipAnalysis {
  clipId: string; clipName: string; frameCount: number; qualityScore: number; rejectScore: number;
  bestFrameSampleId?: string; worstFrameSampleId?: string; warnings: VisionWarning[];
  frames: VisionFrameAnalysis[]; confidence: number; source: "measured" | "partial" | "unavailable";
  fallbackReason?: string;
}

export interface VisionBatchAnalysis {
  schemaVersion: 1; jobId: string; requestId: string;
  status: "running" | "completed" | "cancelled" | "failed" | "sidecar-unavailable";
  sidecar: { status: "available" | "unavailable"; baseUrl?: string; version?: string; reason?: string }; visionVersion: string; gpuAccelerated: boolean;
  progress: { currentFrameSampleId?: string; currentClipId?: string; currentClipName?: string; completedFrames: number; totalFrames: number; completedClips: number; totalClips: number; cacheHits: number; cacheMisses: number };
  clips: VisionClipAnalysis[]; failures: Array<{ taskId: string; frameSampleId?: string; clipId?: string; status: "unavailable" | "failed" | "cancelled"; message: string; attempts: number; recordedAt: string }>;
  warnings: string[]; startedAt: string; completedAt?: string;
}

export interface VisionCapabilities {
  available: boolean; version: string; gpuAccelerated: boolean; cpuFallback: boolean;
  opencvVersion: string; numpyVersion: string; pillowVersion: string; onnxRuntimeVersion?: string;
  onnxRuntimeProviders: string[]; openVinoAvailable: boolean; modules: string[]; features: string[]; reason?: string;
}

export interface FaceCapabilities {
  available: boolean;
  detector: string;
  detectorArtifact?: string;
  landmarksAvailable: boolean;
  embeddingProviderEnabled: boolean;
  reason?: string;
}

export interface DetectedFace {
  id: string;
  frameSampleId: string;
  clipId: string;
  boundingBox: { x: number; y: number; width: number; height: number };
  confidence: number;
  landmarks: any[];
  yaw?: number;
  pitch?: number;
  roll?: number;
  faceSize: number;
  frontalScore: number;
  eyeVisibility: number;
  occlusionEstimate: number;
  blur: number;
  lighting: number;
  qualityScore: number;
  rejectScore: number;
  capabilityReasons: string[];
}

export interface FaceCluster {
  id: string;
  faceIds: string[];
  clipIds: string[];
  bestFrameSampleId?: string;
  coverageSeconds: number;
}

export interface FaceTimeline {
  clipId: string;
  frameSampleId: string;
  timestampSeconds: number;
  clusterId: string;
  faceId: string;
  confidence: number;
}

export interface FaceReport {
  schemaVersion: 1;
  jobId: string;
  requestId: string;
  status: "running" | "completed" | "cancelled" | "failed" | "sidecar-unavailable";
  sidecar: { status: "available" | "unavailable"; baseUrl?: string; version?: string; reason?: string };
  faceModelVersion: string;
  capabilities: FaceCapabilities;
  progress: {
    completedFrames?: number;
    totalFrames?: number;
    currentFrameSampleId?: string;
  };
  faces: DetectedFace[];
  clusters: FaceCluster[];
  timeline: FaceTimeline[];
  cacheHits: number;
  cacheMisses: number;
  warnings: string[];
  startedAt: string;
  completedAt?: string;
}


export interface FaceDetection {
  faceId: string;
  frameSampleId: string;
  boundingBox: { x: number; y: number; width: number; height: number };
  confidence: number;
  referencePersonId?: string;
  role?: "bride" | "groom" | "family" | "friend" | "kid" | "photographer" | "pandit" | "unknown";
}

export interface FaceSignals {
  clipId: string;
  source: SignalSource;
  confidence: number;
  detections: FaceDetection[];
  detectedRoles: string[];
  brideVisible: boolean;
  groomVisible: boolean;
  referenceMatchAllowed: boolean;
}

export type ExpressionLabel =
  | "smiling"
  | "neutral"
  | "surprised"
  | "sad-looking"
  | "tense"
  | "laughing"
  | "eyes-closed"
  | "uncertain";

export type ClipMoodLabel =
  | "joyful"
  | "romantic"
  | "emotional"
  | "energetic"
  | "calm"
  | "celebratory"
  | "humorous"
  | "tense"
  | "neutral"
  | "uncertain";

export type EditorialRecommendation =
  | "longer_hold"
  | "normal"
  | "fast_reaction"
  | "avoid"
  | "uncertain";

export interface ExpressionProviderStatus {
  name: string;
  enabled: boolean;
  reason?: string;
}

export interface EmotionCapabilities {
  available: boolean;
  version: string;
  providers: ExpressionProviderStatus[];
  reason?: string;
}

export interface EmotionEvidence {
  source:
    | "facial_expression"
    | "face_count"
    | "vision_motion"
    | "lighting"
    | "shot_type"
    | "wedding_event"
    | "temporal_context"
    | "filename_fallback";
  confidence: number;
  details: string;
}

export interface FacialExpressionEstimate {
  label: ExpressionLabel;
  confidence: number;
  faceId: string;
  provider: string;
  quality_warning?: string;
  uncertainty_reason?: string;
}

export interface FaceExpressionFrame {
  frameSampleId: string;
  timestamp: number;
  expressions: FacialExpressionEstimate[];
}

export interface EmotionTimelineEntry {
  // ...
}

export interface ClipExpressionSummary {
  dominantExpression: ExpressionLabel;
  secondaryExpression?: ExpressionLabel;
  smileScore: number; // 0-100
  expressionScore: number; // 0-100
  consistency: number; // 0-1
}

export interface ClipMoodEstimate {
  dominant_mood: ClipMoodLabel;
  secondary_mood?: ClipMoodLabel;
  confidence: number;
  evidence: EmotionEvidence[];
  usableForEdit: boolean;
  recommendedHandling: EditorialRecommendation;
  uncertainty_reason?: string;
}

export interface EmotionClipReport {
  clipId: string;
  expressionSummary?: ClipExpressionSummary;
  moodEstimate: ClipMoodEstimate;
  faceExpressions: FacialExpressionEstimate[];
}

export interface EmotionReport {
  jobId: string;
  requestId: string;
  status: "running" | "completed" | "cancelled" | "failed" | "sidecar-unavailable";
  sidecar: { status: "available" | "unavailable"; baseUrl?: string; version?: string; reason?: string };
  emotionModelVersion: string;
  capabilities: EmotionCapabilities;
  progress: {
    completedClips: number;
    totalClips: number;
    currentClipId?: string;
  };
  clips: EmotionClipReport[];
  failures: any[];
  warnings: string[];
  startedAt: string;
  completedAt?: string;
}

export type MusicSourceType =
  | "local_file"
  | "premiere_project_item"
  | "authorized_direct_url"
  | "social_reference"
  | "no_music";

export interface MusicSource {
  type: MusicSourceType;
  mode?: "auto" | "manual" | "preserve-original" | string;
  path?: string; // For local_file, premiere_project_item, authorized_direct_url
  filePath?: string;
  fileName?: string;
  extractClipAudio?: boolean;
  url?: string; // For social_reference, authorized_direct_url
  projectItemId?: string; // For premiere_project_item
  name?: string;
  fingerprint?: string;
  cacheKey?: string;
  capabilityReason?: string;
}

export interface MusicAnalysisRequest {
  jobId: string;
  requestId: string;
  musicSource: MusicSource;
  analysisRangeStartSeconds?: number;
  analysisRangeEndSeconds?: number;
  preferredSectionType?: MusicSectionType;
  enableBeatSnapping: boolean;
  firstBeatOffsetSeconds?: number;
  manualBeatMarkers: number[];
  musicImportance: number;
  parameters: Record<string, any>;
}

export interface AudioProbeResult {
  durationSeconds: number;
  codec?: string;
  container?: string;
  sampleRate?: number;
  channels?: number;
  bitDepth?: number;
  loudnessMetadata?: number;
  startTime?: number;
  streamIndex?: number;
  fileSize?: number;
  fingerprint: string;
  sourcePathStatus: "approved" | "unapproved" | "unavailable";
  capabilityReason?: string;
}

export interface BeatPoint {
  timestamp: number;
  confidence: number;
  isDownbeat: boolean;
}

export interface OnsetPoint {
  timestamp: number;
  strength: number;
}

export interface EnergyPoint {
  timestamp: number;
  rms: number;
  normalizedEnergy: number; // 0-1
  onsetStrength: number;
  beatProximity: number;
  confidence: number;
  isSilence: boolean;
}

export type MusicSectionType =
  | "intro_candidate"
  | "low_energy"
  | "medium_energy"
  | "high_energy"
  | "repeated_section"
  | "chorus_candidate"
  | "drop_candidate"
  | "emotional_candidate"
  | "outro_candidate"
  | "unknown";

export interface MusicSection {
  id: string;
  startSeconds: number;
  endSeconds: number;
  durationSeconds: number;
  type: MusicSectionType;
  confidence: number;
  energyAverage: number;
  energyPeak: number;
  beatDensity: number;
  onsetDensity: number;
  repetitionScore: number;
  editorialSuitability: string[];
}

export type TempoCategory =
  | "very_slow"
  | "slow"
  | "medium"
  | "fast"
  | "very_fast"
  | "unstable"
  | "unknown";

export type EditorialCategory =
  | "romantic"
  | "emotional"
  | "cinematic"
  | "celebratory"
  | "energetic"
  | "luxury"
  | "documentary"
  | "calm"
  | "mixed"
  | "unknown";

export interface MusicEditorialProfile {
  overallTempoCategory: TempoCategory;
  overallEnergyCategory: EditorialCategory; // Reusing EditorialCategory for energy
  cutDensityRecommendation: "sparse" | "balanced" | "rapid" | "unknown";
  openingHookTiming?: number;
  emotionalSectionSuggestions: Array<{ start: number; end: number; confidence: number }>;
  danceSectionSuggestions: Array<{ start: number; end: number; confidence: number }>;
  climaxDropSuggestions: Array<{ start: number; end: number; confidence: number }>;
  outroTiming?: number;
  recommendedReelDurationRanges: Array<{ min: number; max: number }>;
  suitableWeddingModes: string[];
  unsuitableModes: string[];
  confidence: number;
  evidence: EmotionEvidence[]; // Reusing EmotionEvidence for consistency
}

export interface AudioAnalysis {
  clipId: string; // Or a unique ID for the audio source if not tied to a clip
  source: MusicSource;
  probeResult: AudioProbeResult;
  bpmEstimate: number;
  bpmConfidence: number;
  beatTimestamps: BeatPoint[];
  onsetTimestamps: OnsetPoint[];
  energyCurve: EnergyPoint[];
  sections: MusicSection[];
  editorialProfile: MusicEditorialProfile;
  tempoStability: number;
  transientDensity: number;
  cacheKey: string;
  cacheStatus: "hit" | "miss" | "unavailable";
  analysisVersion: string;
  error?: string;
  capabilityReason?: string;
}

export interface MusicProviderStatus {
  providerName: string;
  enabled: boolean;
  reason?: string;
}

export interface MusicCapabilities {
  available: boolean;
  version: string;
  ffmpegAvailable: boolean;
  librosaAvailable: boolean;
  providers: MusicProviderStatus[];
  reason?: string;
}

export interface SFXOpportunity {
  category:
    | "Whoosh"
    | "Hit"
    | "Rise"
    | "Drop"
    | "Impact"
    | "Transition"
    | "Crowd"
    | "Applause"
    | "Temple Bell"
    | "Firework"
    | "Camera Shutter"
    | "Sparkle"
    | "Soft Swell"
    | "Emotional Boom"
    | "Ambient Room Tone";
  timestamp: number;
  reason: string;
  intensity: number; // 0-1
  confidence: number;
  requiredAssetAvailability: "available" | "unavailable" | "unknown";
  sourceProviderStatus: string;
}

export interface MusicAnalysisReport {
  jobId: string;
  requestId: string;
  status: (typeof MUSIC_ANALYSIS_JOB_STATES)[number];
  sidecar: { status: "available" | "unavailable"; baseUrl?: string; version?: string; reason?: string };
  musicAnalysisVersion: string;
  capabilities: MusicCapabilities;
  progress: {
    completedAudioSources: number;
    totalAudioSources: number;
    currentAudioSourceId?: string;
    currentAudioSourceName?: string;
  };
  audioAnalyses: AudioAnalysis[];
  sfxOpportunities: SFXOpportunity[];
  failures: any[];
  warnings: string[];
  startedAt: string;
  completedAt?: string;
}

export interface MusicCatalogRecommendation {
  mood: EditorialCategory;
  tempoRange: { min: number; max: number };
  durationRange: { min: number; max: number };
  instrumentationStyle: string[];
  energyStructure: string[];
  editCompatibility: string[];
  reason: string;
}

export type SignalTrustLevel =
  | "measured"
  | "provider_model"
  | "heuristic"
  | "user_confirmed"
  | "user_corrected"
  | "unavailable";

export interface SignalWeight {
  signal: string; // e.g., "vision.sharpness", "emotion.smile_score"
  weight: number;
  trust: Partial<Record<SignalTrustLevel, number>>; // Multiplier for trust level
}

export interface PenaltyRule {
  id: string;
  signal: string;
  threshold: number;
  operator: ">" | "<" | "==";
  penaltyPoints: number;
  reason: string;
}

export interface DiversityRule {
  id: string;
  signal: string; // e.g., "wedding.primaryEvent", "face.dominantClusterId"
  maxOccurrences: number;
  penaltyPoints: number;
  reason: string;
}

export interface ScoringProfile {
  id: string;
  name: string;
  description: string;
  weights: SignalWeight[];
  penalties: PenaltyRule[];
  diversity: DiversityRule[];
  /** Bumped whenever the operator saves an edited profile. */
  version?: string;
  /**
   * Operator-editable multiplier per category (default 1). Scales every signal
   * weight inside that category; `preference` scales the user-choice signal.
   */
  categoryWeights?: Partial<Record<ScoreCategory, number>>;
}

export interface ScorePreset {
  id: string;
  name: string;
  description: string;
  profile: ScoringProfile;
}

export interface ClipScoreReason {
  description: string;
  scoreEffect: number; // Positive for bonuses, negative for penalties
  sourceSignal: string;
}

export type ScoreCategory =
  | "technical"
  | "vision"
  | "face"
  | "wedding"
  | "emotion"
  | "music"
  | "preference";

export const SCORE_CATEGORIES: readonly ScoreCategory[] = [
  "technical",
  "vision",
  "face",
  "wedding",
  "emotion",
  "music",
  "preference"
];

/**
 * A per-category rollup. `value` is null whenever the category contributed no
 * available signal, so callers can render "unavailable" instead of defaulting
 * a missing measurement to zero.
 */
export interface CategoryScore {
  category: ScoreCategory;
  value: number | null;
  available: boolean;
  weightedSignalCount: number;
  availableSignalCount: number;
  missingSignals: string[];
  dominantTrust: SignalTrustLevel | null;
}

export interface ClipScoreBreakdown {
  clipId: string;
  finalScore: number;
  rawScore: number;
  /**
   * Legacy flat category fields. These carry the real computed value when the
   * category is available and 0 when it is not — always read
   * `categories[...].available` before displaying them.
   */
  technicalScore: number;
  visionScore: number;
  faceScore: number;
  weddingScore: number;
  emotionScore: number;
  musicCompatibilityScore: number;
  preferenceScore: number;
  categories: Record<ScoreCategory, CategoryScore>;
  penalties: number; // Sum of all penalty points
  diversityAdjustment: number;
  confidence: number;
  trustSummary: Partial<Record<SignalTrustLevel, number>>;
  state: "selected" | "rejected" | "uncertain";
  positiveReasons: ClipScoreReason[];
  negativeReasons: ClipScoreReason[];
  unavailableSignals: string[];
  providerVersions: Record<string, string>;
  userPreference: UserClipPreference;
  locked: boolean;
}

export interface RankedClipCandidate {
  rank: number;
  clipId: string;
  score: number;
  breakdown: ClipScoreBreakdown;
}

export interface ScoringReport {
  jobId: string;
  status: "completed" | "failed" | "cancelled";
  scoringProfileId: string;
  scoringProfileVersion: string;
  scoringEngineVersion: string;
  rankedClips: RankedClipCandidate[];
  warnings: string[];
  /** True when scoring stopped early; rankedClips then holds partial results. */
  partial: boolean;
  totalClips: number;
  completedClips: number;
  failureReason?: string;
  startedAt: string;
  completedAt: string;
  lastScoredAt: string;
}

/**
 * Per-clip user overrides. Persisted on the job so a reopened Auto Reel keeps
 * the operator's locks, requirements, and exclusions.
 */
export interface AutoReelUserClipChoices {
  lockedClipIds: string[];
  requiredClipIds: string[];
  excludedClipIds: string[];
  updatedAt: string;
}

export function createEmptyUserClipChoices(updatedAt: string): AutoReelUserClipChoices {
  return { lockedClipIds: [], requiredClipIds: [], excludedClipIds: [], updatedAt };
}

export function getUserClipPreference(
  clipId: string,
  choices: AutoReelUserClipChoices | undefined
): UserClipPreference {
  if (!choices) return "neutral";
  if (choices.excludedClipIds.includes(clipId)) return "excluded";
  if (choices.requiredClipIds.includes(clipId)) return "required";
  if (choices.lockedClipIds.includes(clipId)) return "preferred";
  return "neutral";
}

export interface ScoringCapabilities {
  available: boolean;
  version: string;
  presets: Array<{ id: string; name: string; description: string }>;
  reason?: string;
}

export interface AutoReelJobProgress {
  current: number;
  total: number;
  message: string;
}

export interface AutoReelJobTransition {
  from: AutoReelJobState;
  to: AutoReelJobState;
  at: string;
  reason?: string;
}

export interface ExecutionReport {
  id: string;
  status: "completed" | "failed";
  startTime: string;
  endTime: string;
}

export interface PlanRevision {
  id: string;
  plan: ReelPlan;
  createdAt: string;
  reason: string;
}

export interface ReelPlan {
  schemaVersion: number;
  id: string;
  beats: StoryBeat[];
  totalDuration: number;
}

export interface StoryBeat {
  id: string;
  clipId: string;
  startTime: number;
  endTime: number;
}

export interface AutoReelFrameExtractionTask {
  clipId: string;
  clipName: string;
  mediaPath: string;
  mediaFingerprint: string;
  sourceInSeconds?: number;
  sourceOutSeconds?: number;
  samplePlan: FrameSample[];
  cacheKey: string;
}

export interface AutoReelAudioExtractionTask {
  id: string;
  clipId?: string;
  sourceKind: "clip-audio" | "selected-song";
  label: string;
  mediaPath: string;
  mediaFingerprint: string;
  cacheKey: string;
  parameters?: Record<string, any>;
}

export interface AutoReelExtractionRequest {
  schemaVersion?: 1;
  requestId: string;
  jobId: string;
  requestedAt?: string;
  approvedRoots?: string[];
  cache?: {
    rootName: string;
    extractorVersion: string;
    ttlSeconds?: number;
    maxBytes?: number;
  };
  limits?: {
    concurrency?: number;
    retryLimit?: number;
  };
  mediaSelection?: MediaSelection;
  frameTasks: AutoReelFrameExtractionTask[];
  audioTasks: AutoReelAudioExtractionTask[];
  setup?: { musicSource?: MusicSource };
}

export interface AutoReelExtractionResult {
  schemaVersion: 1;
  jobId: string;
  requestId: string;
  status: "running" | "completed" | "cancelled" | "failed" | "sidecar-unavailable";
  sidecar: {
    status: "available" | "unavailable";
    reason?: string;
  };
  progress: {
    completedClips: number;
    remainingClips: number;
    totalClips: number;
    completedAudioTasks: number;
    totalAudioTasks: number;
    cacheHits: number;
    cacheMisses: number;
    currentClipName?: string;
  };
  clipResults: any[];
  frameSamples: FrameSample[];
  audioExtractions: AutoReelAudioExtraction[];
  failures: AutoReelExtractionFailure[];
  warnings: string[];
  startedAt: string;
  completedAt: string;
}

export interface AutoReelExtractionFailure {
  taskId: string;
  clipId?: string;
  audioSourceId?: string;
  targetKind?: "frames" | "audio";
  audioTaskId?: string;
  status: "unavailable" | "failed" | "cancelled";
  message: string;
  attempts: number;
  recordedAt: string;
}

export interface AutoReelAudioExtraction {
  id: string;
  taskId?: string;
  clipId: string;
  sourceKind?: "clip-audio" | "selected-song";
  label?: string;
  filePath: string;
  format: string;
  durationSeconds: number;
  status: "completed" | "failed";
  error?: string;
}

export interface ExpressionSignals {
    clipId: string;
    source: SignalSource;
    confidence: number;
    primaryEmotion:
      | "happy"
      | "romantic"
      | "emotional"
      | "funny"
      | "energetic"
      | "calm"
      | "unknown";
    emotionScore: number;
    expressions: Array<{ label: string; score: number; frameSampleId?: string }>;
    notes: string[];
  }
  
  export interface WeddingEventSignals {
    clipId: string;
    source: SignalSource;
    confidence: number;
    primaryEvent:
      | "bride-entry"
      | "groom-entry"
      | "haldi"
      | "mehndi"
      | "sangeet"
      | "baraat"
      | "varmala"
      | "pheras"
      | "reception"
      | "cake"
      | "dance"
      | "couple-portrait"
      | "drone"
      | "decor"
      | "jewellery"
      | "family"
      | "unknown";
    candidates: Array<{ event: string; confidence: number }>;
    evidence: string[];
  }

export interface AutoReelJob {
  schemaVersion: 1;
  id: string;
  state: AutoReelJobState;
  request: AutoReelRequest;
  progress: AutoReelJobProgress;
  clips: ClipDescriptor[];
  frameSamples: FrameSample[];
  audioExtractions: AutoReelAudioExtraction[];
  visionSignals: VisionSignals[];
  faceSignals: FaceSignals[];
  expressionSignals: ExpressionSignals[];
  weddingEventSignals: WeddingEventSignals[];
  extraction?: AutoReelExtractionResult;
  vision?: VisionBatchAnalysis;
  face?: FaceReport;
  emotion?: EmotionReport;
  music?: MusicAnalysisReport; // New field for music analysis report
  scoring?: ScoringReport; // New field for scoring report
  /** Operator lock/require/exclude decisions, persisted across sessions. */
  userClipChoices?: AutoReelUserClipChoices;
  /** Saved custom weight profile, when the operator edited the preset. */
  customScoringProfile?: ScoringProfile;
  extractionFailures: AutoReelExtractionFailure[];
  scoreBreakdowns: ClipScoreBreakdown[];
  storyBeats: StoryBeat[];
  plan?: ReelPlan;
  revisions: PlanRevision[];
  storyPlan?: any; // To avoid circular/complex typing for now, or just import
  storyHistory?: any;
  durationPlan?: any;
  durationHistory?: any;
  productionReport?: any;
  cinematographyReport?: any;
  vfxPlan?: any;
  soundDesignPlan?: any;
  finalDirectionPlan?: any;
  cameraPerformanceReport?: any;
  storyEngagementReport?: any;
  viralReelReport?: any;
  reviewSessions?: any[];
  pluginRegistry?: Record<string, any>;
  workflowRun?: any;
  clientReviewReport?: any;
  assetIntelligenceReport?: any;
  searchCapabilityReport?: any;
  musicCompositionReport?: any;
  voiceReport?: any;
  cloudRenderReport?: any;
  computeFallbackReport?: any;
  executionPerformanceReport?: any;
  businessReport?: any;
  businessIntelligenceReport?: any;
  marketingCampaign?: any;
  thumbnailReport?: any;
  socialReport?: any;
  clientPortalReport?: any;
  teamCollaborationReport?: any;
  learningProgress?: any;
  automationHealthReport?: any;
  enterpriseReport?: any;
  missionReport?: any;
  executionReport?: ExecutionReport;
  transitions: AutoReelJobTransition[];
  warnings: string[];
  error?: string;
  createdAt: string;
  updatedAt: string;
}

const ACTIVE_JOB_STATES: ReadonlySet<AutoReelJobState> = new Set([
  "validating",
  "scanning",
  "extracting",
  "analyzing_vision",
  "analyzing_faces",
  "analyzing_emotion",
  "analyzing_music",
  "scoring",
  "building_story",
  "planning",
  "awaiting_review",
  "executing"
]);

const STATE_TRANSITIONS: Readonly<Record<AutoReelJobState, readonly AutoReelJobState[]>> = {
  idle: ["validating", "cancelled"],
  validating: ["scanning", "failed", "cancelled"],
  scanning: ["extracting", "analyzing_vision", "analyzing_music", "scoring", "failed", "cancelled"],
  extracting: ["awaiting_review", "analyzing_vision", "analyzing_music", "scoring", "failed", "cancelled"],
  analyzing_vision: ["analyzing_faces", "analyzing_emotion", "analyzing_music", "scoring", "failed", "cancelled"],
  analyzing_faces: ["analyzing_emotion", "analyzing_music", "scoring", "failed", "cancelled"],
  analyzing_emotion: ["analyzing_music", "scoring", "failed", "cancelled"],
  analyzing_music: ["scoring", "failed", "cancelled"],
  scoring: ["building_story", "planning", "failed", "cancelled"],
  building_story: ["planning", "failed", "cancelled"],
  planning: ["awaiting_review", "failed", "cancelled"],
  awaiting_review: ["planning", "executing", "cancelled", "failed"],
  executing: ["completed", "failed", "cancelled"],
  completed: ["idle"],
  cancelled: ["idle"],
  failed: ["idle"]
};

export function createAutoReelJob(
  request: AutoReelRequest,
  id: string,
  createdAt = new Date().toISOString()
): AutoReelJob {
  return {
    schemaVersion: 1,
    id,
    state: "idle",
    request,
    progress: { current: 0, total: 0, message: "Waiting to validate request" },
    clips: [],
    frameSamples: [],
    audioExtractions: [],
    visionSignals: [],
    faceSignals: [],
    expressionSignals: [],
    weddingEventSignals: [],
    extractionFailures: [],
    scoreBreakdowns: [],
    storyBeats: [],
    revisions: [],
    transitions: [],
    warnings: [],
    createdAt,
    updatedAt: createdAt
  };
}

export function canTransitionAutoReelJob(
  from: AutoReelJobState,
  to: AutoReelJobState
): boolean {
  return STATE_TRANSITIONS[from].includes(to);
}

export function transitionAutoReelJob(
  job: AutoReelJob,
  nextState: AutoReelJobState,
  options: {
    at?: string;
    reason?: string;
    progress?: AutoReelJobProgress;
    error?: string;
  } = {}
): AutoReelJob {
  if (!canTransitionAutoReelJob(job.state, nextState)) {
    throw new Error(`Invalid Auto Reel job transition: ${job.state} -> ${nextState}`);
  }

  const at = options.at ?? new Date().toISOString();
  const progress = options.progress ?? job.progress;

  return {
    ...job,
    state: nextState,
    progress,
    error: nextState === "failed" ? options.error ?? job.error ?? "Auto Reel job failed" : undefined,
    transitions: [
      ...job.transitions,
      { from: job.state, to: nextState, at, reason: options.reason }
    ],
    updatedAt: at
  };
}

export function isActiveAutoReelJobState(state: AutoReelJobState): boolean {
  return ACTIVE_JOB_STATES.has(state);
}

export function serializeAutoReelJob(job: AutoReelJob): string {
  return JSON.stringify(job);
}
