export type StoryMode = 
  | "Wedding Film"
  | "Cinematic Film"
  | "Instagram Reel"
  | "YouTube Highlight"
  | "YouTube Shorts"
  | "Luxury Wedding"
  | "Documentary"
  | "Emotional"
  | "Family"
  | "Couple"
  | "Baby Shower"
  | "Engagement"
  | "Save The Date"
  | "Pre Wedding"
  | "Reception"
  | "Haldi"
  | "Mehndi"
  | "Sangeet"
  | "Baraat";

export type NarrativeSectionTiming = "Beginning" | "Build-up" | "Peak" | "Emotional" | "Ending";

export type NarrativeSectionType = 
  | "Opening"
  | "Venue"
  | "Details"
  | "Bride Prep"
  | "Groom Prep"
  | "Family"
  | "Bride Entry"
  | "Groom Entry"
  | "Baraat"
  | "Haldi"
  | "Mehndi"
  | "Sangeet"
  | "Varmala"
  | "Pheras"
  | "Sindoor"
  | "Reception"
  | "Cake"
  | "Dance"
  | "Portraits"
  | "Emotional Moments"
  | "Drone"
  | "Ending";

export type DurationEstimate = "short" | "medium" | "long";

export interface ClipPlacement {
  id: string;
  clipId: string;
  reason: string;
  confidence: number;
  storyImportance: number;
  durationEstimate: DurationEstimate;
  state: "active" | "deleted" | "replaced" | "locked" | "moved" | "skipped";
}

export interface StorySegment {
  id: string;
  clips: ClipPlacement[];
}

export interface NarrativeSection {
  id: string;
  type: NarrativeSectionType;
  timing: NarrativeSectionTiming;
  segments: StorySegment[];
}

export interface StorySequence {
  id: string;
  sections: NarrativeSection[];
}

export interface StoryPlan {
  id: string;
  mode: StoryMode;
  sequence: StorySequence;
  confidence: number;
  createdAt: string;
}

export interface StoryVersion {
  id: string;
  plan: StoryPlan;
  createdAt: string;
  reason: string;
}

export interface StoryHistory {
  currentVersionId: string;
  versions: StoryVersion[];
}
