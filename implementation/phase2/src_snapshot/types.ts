export type WeddingTheme = 'Haldi' | 'Mehendi' | 'Sangeet' | 'Baraat' | 'Wedding' | 'Reception' | 'Vidaai';

export type AutoEditMode =
  | 'Auto Reel'
  | 'Auto Highlight Film'
  | 'Auto Teaser'
  | 'Baby Shower Reel'
  | 'Engagement Reel'
  | 'Save The Date'
  | 'Pre-Wedding Film'
  | 'Haldi Highlight'
  | 'Mehndi Highlight'
  | 'Sangeet Highlight'
  | 'Baraat Highlight'
  | 'Wedding Ceremony'
  | 'Reception Highlight'
  | 'Couple Story'
  | 'Family Story'
  | 'Instagram Reel'
  | 'YouTube Highlight'
  | 'Vertical Shorts'
  | 'Cinematic Film';

export type EventTag =
  | 'Bride Entry'
  | 'Groom Entry'
  | 'Haldi'
  | 'Mehndi'
  | 'Sangeet'
  | 'Baraat'
  | 'Varmala'
  | 'Sindoor'
  | 'Mangalsutra'
  | 'Pheras'
  | 'Reception'
  | 'Bidaai'
  | 'Parents Emotion'
  | 'Couple Emotion'
  | 'Family Moments'
  | 'Kids'
  | 'Dance'
  | 'Fireworks'
  | 'Drone Shots';

export type LogSeverity = 'info' | 'warn' | 'error' | 'success';

export interface LogEntry {
  id: string;
  severity: LogSeverity;
  message: string;
  timestamp: string;
}

export interface WorkflowRecommendation {
  id: string;
  title: string;
  summary: string;
  confidence: number;
  action: string;
  reversible: boolean;
  details: string[];
}

export interface ProjectPlan {
  theme: WeddingTheme;
  summary: string;
  recommendations: WorkflowRecommendation[];
  generatedAt: string;
}

export interface MusicAnalysis {
  sourceName: string;
  bpm: number;
  beatPositions: number[];
  drops: string[];
  chorusPositions: number[];
  versePositions: number[];
  introDurationSeconds: number;
  outroDurationSeconds: number;
  energyCurve: number[];
  intensity: number;
}

export interface ClipAnalysis {
  clipId: string;
  clipName: string;
  emotionScore: number;
  qualityScore: number;
  sharpnessScore: number;
  exposureScore: number;
  motionScore: number;
  compositionScore: number;
  faceDetected: boolean;
  smileDetected: boolean;
  crowdEnergy: number;
  storyImportance: number;
  detectedEvents: EventTag[];
  isDiscarded: boolean;
}

export interface TimelinePlan extends ProjectPlan {
  mode: AutoEditMode;
  previewClips: string[];
  musicAnalysis: MusicAnalysis;
}

export interface TransitionSuggestion {
  type: string;
  reason: string;
}

export type ExportPreset =
  | 'Instagram Reels'
  | 'YouTube Shorts'
  | 'YouTube Highlight'
  | 'YouTube 4K'
  | 'Facebook'
  | 'WhatsApp'
  | 'Master Archive';

export interface GeminiResponse {
  text: string;
  model: string;
  cached: boolean;
}

export interface GeminiRequestOptions {
  retries?: number;
  useCache?: boolean;
  temperature?: number;
  maxOutputTokens?: number;
}

export interface PremiereActionResult {
  success: boolean;
  message: string;
  detail?: string;
}
