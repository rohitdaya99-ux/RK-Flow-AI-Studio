export type DurationReason = 
  | "emotion_hold" 
  | "music_rhythm" 
  | "music_peak" 
  | "drone_reveal" 
  | "reaction_shot" 
  | "low_quality_trim" 
  | "pacing_fast" 
  | "pacing_slow" 
  | "standard_cut" 
  | "source_limit";

export interface ClipDurationDecision {
  clipId: string;
  targetDuration: number;
  minimumDuration: number;
  maximumDuration: number;
  preferredCutPoint: number;
  confidence: number;
  reason: DurationReason;
  detailedReasoning: string;
}

export interface TimingProfile {
  id: string;
  mode: string;
  baseDurationMin: number;
  baseDurationMax: number;
  pacingMultiplier: number;
}

export interface DurationPlan {
  id: string;
  storyPlanId: string;
  decisions: ClipDurationDecision[];
  profile: TimingProfile;
  totalEstimatedDuration: number;
  createdAt: string;
}

export interface DurationVersion {
  id: string;
  plan: DurationPlan;
  createdAt: string;
  reason: string;
}

export interface DurationHistory {
  currentVersionId: string;
  versions: DurationVersion[];
}
