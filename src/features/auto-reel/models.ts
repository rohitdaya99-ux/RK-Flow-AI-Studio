import type { CommandAction } from "../../types/Command";

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

export type MediaSelectionMode =
  | "selected-clips"
  | "active-sequence"
  | "in-out-range"
  | "project-items"
  | "manual-selection";

export type AutoReelAspectRatio = "9:16" | "16:9" | "1:1" | "4:5" | "custom";
export type AutoReelTuningLevel = "low" | "balanced" | "high";
export type AutoReelBalanceTarget = "bride" | "groom" | "family" | "balanced";
export type AutoReelEmotionPriority = "low" | "balanced" | "high";
export type AutoReelEnergyLevel = "calm" | "balanced" | "high";
export type AutoReelCutDensity = "sparse" | "balanced" | "rapid";
export type AutoReelStoryMode = "story" | "emotion" | "music" | "viral" | "documentary" | "cinematic";
export type AutoReelMusicMode =
  | "none"
  | "local-file"
  | "project-item"
  | "authorized-direct-url"
  | "social-reference";
export type AutoReelPersonRole = "bride" | "groom" | "family" | "custom";
export type AutoReelReferenceReelMode = "url" | "local-file";

export interface AutoReelClipFilterConfig {
  includeLockedTracks: boolean;
  includeDisabledClips: boolean;
  includeAudioOnlyItems: boolean;
  includeStillItems: boolean;
  minimumClipCount: number;
  maximumClipCount: number;
}

export interface AutoReelMusicSourceConfig {
  mode: AutoReelMusicMode;
  fileName?: string;
  filePath?: string;
  projectItemId?: string;
  directUrl?: string;
  socialReferenceUrl?: string;
  cachedMusicId?: string;
  extractClipAudio: boolean;
  copyrightNoticeAccepted: boolean;
}

export interface AutoReelReferencePerson {
  id: string;
  role: AutoReelPersonRole;
  label: string;
  fileName?: string;
}

export interface AutoReelReferenceReelConfig {
  mode: AutoReelReferenceReelMode;
  url?: string;
  localFileName?: string;
}

export interface AutoReelSetupConfig {
  sourceMode: MediaSelectionMode;
  clipFilter: AutoReelClipFilterConfig;
  aspectRatio: AutoReelAspectRatio;
  reelType: string;
  style: string;
  storyMode: AutoReelStoryMode;
  emotionPriority: AutoReelEmotionPriority;
  balanceTarget: AutoReelBalanceTarget;
  energy: AutoReelEnergyLevel;
  cutDensity: AutoReelCutDensity;
  transitionIntensity: AutoReelTuningLevel;
  motionIntensity: AutoReelTuningLevel;
  sfxIntensity: AutoReelTuningLevel;
  colorIntensity: AutoReelTuningLevel;
  outputSequenceName: string;
  createNewSequence: true;
  musicSource: AutoReelMusicSourceConfig;
  references: AutoReelReferencePerson[];
  referenceReel?: AutoReelReferenceReelConfig;
  selectedProjectItemIds: string[];
  manualClipIds: string[];
}

export type ClipMediaType = "video" | "audio" | "still" | "unknown";
export type SignalSource = "measured" | "ai" | "metadata" | "user";
export type AutoReelMetadataStatus = "host-verified" | "metadata-fallback" | "unavailable";

export interface AutoReelCapabilityNote {
  field: string;
  source: AutoReelMetadataStatus;
  reason: string;
}

export interface AutoReelFrameSize {
  width: number;
  height: number;
}

export interface MediaSelection {
  mode: MediaSelectionMode;
  projectId?: string;
  sequenceId?: string;
  sequenceName?: string;
  clipIds: string[];
  projectItemIds: string[];
  inPointSeconds?: number;
  outPointSeconds?: number;
  usedFallback: boolean;
  sequenceResolution: AutoReelFrameSize | null;
  fps: number | null;
  timebase: number | null;
  playheadSeconds: number | null;
  selectedClipCount: number;
  scannedClipCount: number;
  mediaFingerprint: string;
  cacheKey: string;
  capabilityNotes: AutoReelCapabilityNote[];
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

export interface ClipDescriptor {
  id: string;
  projectItemId?: string | null;
  projectItemNodeId?: string | null;
  name: string;
  mediaType: ClipMediaType;
  mediaPath?: string | null;
  sourceInSeconds: number | null;
  sourceOutSeconds: number | null;
  timelineStartSeconds?: number | null;
  timelineEndSeconds?: number | null;
  trackIndex?: number | null;
  trackType?: "video" | "audio" | null;
  speed: number | null;
  disabled: boolean | null;
  selected: boolean | null;
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
  capturedAt: string;
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

export interface AudioEnergyPoint {
  timeSeconds: number;
  energy: number;
}

export interface AudioSection {
  label: "intro" | "verse" | "chorus" | "drop" | "outro" | "unknown";
  startSeconds: number;
  endSeconds: number;
  energy: number;
}

export interface AudioAnalysis {
  id: string;
  sourceClipId?: string;
  sourcePath?: string;
  source: SignalSource;
  durationSeconds: number;
  bpm?: number;
  beatTimesSeconds: number[];
  energyCurve: AudioEnergyPoint[];
  sections: AudioSection[];
  confidence: number;
  analyzedAt: string;
}

export interface AutoReelAudioWaveformPoint {
  timeSeconds: number;
  amplitude: number;
}

export interface AutoReelAudioExtraction {
  id: string;
  taskId: string;
  sourceKind: "selected-song" | "clip-audio";
  clipId?: string;
  sourcePath?: string;
  outputPath?: string;
  cacheKey: string;
  cacheStatus: "hit" | "miss" | "unavailable";
  extractionStatus: "available" | "unavailable" | "failed";
  durationSeconds?: number;
  sampleRate?: number;
  channels?: number;
  codec?: string;
  waveform: AutoReelAudioWaveformPoint[];
  extractedAt: string;
  error?: string;
  capabilityReason?: string;
}

export interface AutoReelFrameExtractionTask {
  clipId: string;
  clipName: string;
  mediaPath: string;
  mediaFingerprint: string;
  cacheKey: string;
  sourceInSeconds: number;
  sourceOutSeconds: number;
  samplePlan: Array<{
    id: string;
    sourceTimeSeconds: number;
    sampleKind: FrameSample["sampleKind"];
  }>;
}

export interface AutoReelAudioExtractionTask {
  id: string;
  sourceKind: "selected-song" | "clip-audio";
  clipId?: string;
  label: string;
  mediaPath: string;
  mediaFingerprint: string;
  cacheKey: string;
}

export interface AutoReelExtractionFailure {
  taskId: string;
  clipId?: string;
  audioTaskId?: string;
  targetKind: "frames" | "audio";
  status: "unavailable" | "failed" | "cancelled";
  message: string;
  attempts: number;
  recordedAt: string;
}

export interface AutoReelExtractionRequest {
  schemaVersion: 1;
  jobId: string;
  requestId: string;
  requestedAt: string;
  approvedRoots: string[];
  frameTasks: AutoReelFrameExtractionTask[];
  audioTasks: AutoReelAudioExtractionTask[];
  cache: {
    rootName: "rkflow-cache";
    extractorVersion: string;
    ttlSeconds: number;
    maxBytes: number;
  };
  limits: {
    concurrency: number;
    retryLimit: number;
  };
}

export interface AutoReelClipExtractionResult {
  clipId: string;
  clipName: string;
  frameSampleIds: string[];
  status: "available" | "partial" | "unavailable" | "failed";
  cacheHits: number;
  cacheMisses: number;
  attempts: number;
  error?: string;
}

export interface AutoReelExtractionProgressSnapshot {
  currentClipId?: string;
  currentClipName?: string;
  completedClips: number;
  remainingClips: number;
  totalClips: number;
  completedAudioTasks: number;
  totalAudioTasks: number;
  cacheHits: number;
  cacheMisses: number;
}

export interface AutoReelExtractionResult {
  schemaVersion: 1;
  jobId: string;
  requestId: string;
  status: "completed" | "cancelled" | "failed" | "sidecar-unavailable";
  sidecar: {
    status: "available" | "unavailable";
    baseUrl?: string;
    version?: string;
    reason?: string;
  };
  progress: AutoReelExtractionProgressSnapshot;
  clipResults: AutoReelClipExtractionResult[];
  frameSamples: FrameSample[];
  audioExtractions: AutoReelAudioExtraction[];
  failures: AutoReelExtractionFailure[];
  warnings: string[];
  startedAt: string;
  completedAt: string;
}

export interface ClipScoreBreakdown {
  clipId: string;
  finalScore: number;
  qualityScore: number;
  emotionScore: number;
  faceScore: number;
  weddingEventScore: number;
  musicMatchScore: number;
  userPreferenceScore: number;
  penalties: Array<{ reason: string; score: number }>;
  reasons: string[];
  confidence: number;
}

export interface StoryBeat {
  id: string;
  order: number;
  label: string;
  purpose: string;
  targetDurationSeconds: number;
  preferredEvents: string[];
  emotionalGoal: string;
  clipIds: string[];
}

export interface TransitionDecision {
  id: string;
  afterSegmentId: string;
  type: "cut" | "cross-dissolve" | "dip" | "whip" | "zoom" | "flash" | "match-cut";
  durationSeconds: number;
  reason: string;
  beatAligned: boolean;
}

export interface MotionDecision {
  id: string;
  segmentId: string;
  type: "none" | "pan" | "zoom" | "push-in" | "pull-out" | "speed-ramp" | "stabilize";
  intensity: number;
  reason: string;
}

export interface SFXDecision {
  id: string;
  segmentId?: string;
  transitionId?: string;
  type: "whoosh" | "hit" | "rise" | "drop" | "impact" | "crowd" | "applause" | "temple-bell" | "firework";
  gainDb: number;
  reason: string;
}

export interface ColorSuggestion {
  id: string;
  segmentId: string;
  preset?: string;
  whiteBalance?: "cooler" | "neutral" | "warmer";
  exposureAdjustment?: number;
  protectSkinTones: boolean;
  reason: string;
}

export interface ReelSegment {
  id: string;
  order: number;
  storyBeatId: string;
  clipId: string;
  projectItemId?: string;
  sourceInSeconds: number;
  sourceOutSeconds: number;
  timelineStartSeconds: number;
  durationSeconds: number;
  score: number;
  reason: string;
  locked: boolean;
}

export interface ReelPlan {
  id: string;
  jobId: string;
  requestId: string;
  version: number;
  title: string;
  intentSummary: string;
  sourceSequenceId?: string;
  targetDurationSeconds: number;
  totalDurationSeconds: number;
  segments: ReelSegment[];
  storyBeats: StoryBeat[];
  transitions: TransitionDecision[];
  motionDecisions: MotionDecision[];
  sfxDecisions: SFXDecision[];
  colorSuggestions: ColorSuggestion[];
  rejectedClipIds: string[];
  warnings: string[];
  generatedAt: string;
}

export interface PlanRevision {
  id: string;
  planId: string;
  revision: number;
  reason: string;
  changeSummary: string[];
  plan: ReelPlan;
  createdAt: string;
}

export interface ExecutionActionReport {
  commandId: string;
  action: CommandAction;
  success: boolean;
  message: string;
  error?: string;
  completedAt: string;
}

export interface ExecutionReport {
  id: string;
  jobId: string;
  planId: string;
  sourceSequenceId?: string;
  outputSequenceId?: string;
  outputSequenceName: string;
  createdNewSequence: true;
  sourceTimelineModified: false;
  actions: ExecutionActionReport[];
  startedAt: string;
  completedAt?: string;
  status: "running" | "completed" | "failed" | "cancelled";
  error?: string;
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
  audioAnalysis?: AudioAnalysis;
  extraction?: AutoReelExtractionResult;
  extractionFailures: AutoReelExtractionFailure[];
  scoreBreakdowns: ClipScoreBreakdown[];
  storyBeats: StoryBeat[];
  plan?: ReelPlan;
  revisions: PlanRevision[];
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
