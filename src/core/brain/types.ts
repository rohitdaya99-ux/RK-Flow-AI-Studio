export interface BrainTrace {
  service: string;
  timestamp: string;
  detail: string;
}

export interface BrainPlanStep {
  id: string;
  title: string;
  status: "pending" | "ready";
}

export interface BrainClip {
  id: string;
  name: string;
  start: number;
  end: number;
  duration: number;
  track: number;
  mediaType: string;
  type: string;
  projectItemId?: string;
}

export interface BrainSequenceContext {
  projectName: string;
  sequenceName: string;
  sequenceKey: string;
  fps: number;
  playhead: number;
  inPoint: number;
  outPoint: number;
  duration: number;
  videoTracks: number;
  audioTracks: number;
  selectedClips: BrainClip[];
  markers: string[];
}

export interface MemorySnapshot {
  preferences: Record<string, string>;
  projectFacts: string[];
  decisions: string[];
  analysis: Record<string, unknown>;
}

export interface WeddingSegment {
  id: string;
  label: string;
  confidence: number;
  start: number;
  end: number;
  source: string;
}

export interface FaceCluster {
  id: string;
  label: string;
  role: "bride" | "groom" | "family" | "guest" | "unknown";
  confidence: number;
  clipIds: string[];
  emotionTags: string[];
  source: string;
}

export interface EmotionClipAnalysis {
  clipId: string;
  clipName: string;
  emotions: string[];
  confidence: number;
  source: string;
}

export interface CameraClipAnalysis {
  clipId: string;
  clipName: string;
  shotType: string;
  movement: string;
  confidence: number;
  source: string;
}

export interface ClipTechnicalScore {
  clipId: string;
  clipName: string;
  blur: number;
  focus: number;
  noise: number;
  exposure: number;
  whiteBalance: number;
  duplicateGroup: string | null;
  aiRating: number;
  source: string;
}

export interface MusicSection {
  id: string;
  label: string;
  start: number;
  end: number;
}

export interface MusicAnalysisResult {
  fileHash: string;
  fileName: string;
  bpm: number;
  beatPositions: number[];
  energyCurve: number[];
  sections: MusicSection[];
  mood: string;
  genre: string;
  source: string;
}

export interface TimelineIssue {
  id: string;
  title: string;
  detail: string;
  metric: string;
  payload?: unknown;
}

export interface TimelineHealthReport {
  score: number;
  formula: string;
  issues: TimelineIssue[];
  source: string;
}
