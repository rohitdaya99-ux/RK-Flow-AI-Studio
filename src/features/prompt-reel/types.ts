export type ReelSelectionMode = "selected" | "sequence" | "sequence-fallback";

export type PromptReelMusicAnalysisStatus = "available" | "missing" | "ambiguous";

export interface PromptReelAnalysisStatus {
  selectionMode: ReelSelectionMode;
  clipCount: number;
  analyzedClipCount: number;
  unanalysedClipCount: number;
  coverageRatio: number;
  weddingClipCount: number;
  emotionClipCount: number;
  clipIntelligenceClipCount: number;
  musicStatus: PromptReelMusicAnalysisStatus;
  needsAnalysis: boolean;
  message: string | null;
}

export interface ReelPlanClip {
  clipId: string;
  clipName: string;
  start: number;
  end: number;
  sourceDuration: number;
  durationSeconds: number;
  track: number;
  mediaType: string;
  mediaPath?: string;
  projectItemId?: string;
  shotType: string;
  emotionWeight: number;
  musicEnergyWeight: number;
  shotWeight: number;
  selectionScore: number;
  reason: string;
  promptTags: string[];
}

export interface ReelPlan {
  title: string;
  templateName: string;
  intentSummary: string;
  targetDurationSeconds: number;
  totalDurationSeconds: number;
  selectionMode: ReelSelectionMode;
  resolutionPath: "memory" | "local" | "cache" | "gemini";
  clips: ReelPlanClip[];
  notes: string[];
  durationQualityWarning?: string;
}
