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
  | "project-items";

export type ClipMediaType = "video" | "audio" | "still" | "unknown";
export type SignalSource = "measured" | "ai" | "metadata" | "user";

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
}

export interface AutoReelRequest {
  id: string;
  prompt: string;
  mediaSelection: MediaSelection;
  targetDurationSeconds?: number;
  aspectRatio: "9:16" | "16:9" | "1:1" | "custom";
  outputSequenceName: string;
  createNewSequence: true;
  styleHints: string[];
  preferredEvents: string[];
  excludedClipIds: string[];
  submittedAt: string;
}

export interface ClipDescriptor {
  id: string;
  projectItemId?: string;
  name: string;
  mediaType: ClipMediaType;
  mediaPath?: string;
  sourceInSeconds: number;
  sourceOutSeconds: number;
  timelineStartSeconds?: number;
  timelineEndSeconds?: number;
  trackIndex?: number;
  speed: number;
  disabled: boolean;
  linkedClipIds: string[];
  frameRate?: number;
  width?: number;
  height?: number;
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
  visionSignals: VisionSignals[];
  faceSignals: FaceSignals[];
  expressionSignals: ExpressionSignals[];
  weddingEventSignals: WeddingEventSignals[];
  audioAnalysis?: AudioAnalysis;
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
  extracting: ["analyzing_vision", "analyzing_music", "scoring", "failed", "cancelled"],
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
    visionSignals: [],
    faceSignals: [],
    expressionSignals: [],
    weddingEventSignals: [],
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
