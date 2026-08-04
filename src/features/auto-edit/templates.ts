
export interface AutoEditTemplate {
  name: string;
  targetDuration: string; // e.g., "30s", "1m", "2m30s"
  prioritizedSegments: WeddingSegment[]; // Segments to prioritize
  clipIntelligenceWeight: number; // 0-1 (e.g., 0.7 for high priority)
  emotionAIWeight: number; // 0-1 (e.g., 0.8 for high priority)
  beatSyncRules: BeatSyncRule[]; // Rules for beat-syncing
}

// Placeholder for WeddingSegment and BeatSyncRule types - these would typically be defined elsewhere
// For now, let's define them simply.
type WeddingSegment =
  | "Couple"
  | "Family"
  | "Ceremony"
  | "Reception"
  | "Highlights";

export interface BeatSyncRule {
  type: "auto" | "manual"; // Auto-sync to beats, or manual markers
  intensity: "low" | "medium" | "high"; // How aggressively to sync
}

export const AUTO_EDIT_TEMPLATES: AutoEditTemplate[] = [
  {
    name: "Reel",
    targetDuration: "1m",
    prioritizedSegments: ["Couple", "Highlights"],
    clipIntelligenceWeight: 0.8,
    emotionAIWeight: 0.7,
    beatSyncRules: [{ type: "auto", intensity: "high" }],
  },
  {
    name: "Shorts",
    targetDuration: "30s",
    prioritizedSegments: ["Couple", "Highlights"],
    clipIntelligenceWeight: 0.9,
    emotionAIWeight: 0.8,
    beatSyncRules: [{ type: "auto", intensity: "high" }],
  },
  {
    name: "Highlight",
    targetDuration: "3m",
    prioritizedSegments: ["Couple", "Ceremony", "Reception", "Highlights"],
    clipIntelligenceWeight: 0.7,
    emotionAIWeight: 0.7,
    beatSyncRules: [{ type: "auto", intensity: "medium" }],
  },
  {
    name: "Trailer",
    targetDuration: "1m30s",
    prioritizedSegments: ["Couple", "Ceremony", "Reception", "Highlights"],
    clipIntelligenceWeight: 0.75,
    emotionAIWeight: 0.85,
    beatSyncRules: [{ type: "auto", intensity: "high" }],
  },
  {
    name: "Teaser",
    targetDuration: "45s",
    prioritizedSegments: ["Couple", "Highlights"],
    clipIntelligenceWeight: 0.85,
    emotionAIWeight: 0.9,
    beatSyncRules: [{ type: "auto", intensity: "high" }],
  },
  {
    name: "Documentary",
    targetDuration: "15m",
    prioritizedSegments: ["Ceremony", "Reception", "Couple", "Family", "Highlights"],
    clipIntelligenceWeight: 0.6,
    emotionAIWeight: 0.6,
    beatSyncRules: [{ type: "manual", intensity: "low" }],
  },
  {
    name: "Couple Story",
    targetDuration: "5m",
    prioritizedSegments: ["Couple", "Highlights"],
    clipIntelligenceWeight: 0.8,
    emotionAIWeight: 0.9,
    beatSyncRules: [{ type: "auto", intensity: "medium" }],
  },
  {
    name: "Family Story",
    targetDuration: "7m",
    prioritizedSegments: ["Family", "Ceremony", "Reception"],
    clipIntelligenceWeight: 0.7,
    emotionAIWeight: 0.6,
    beatSyncRules: [{ type: "manual", intensity: "medium" }],
  },
  {
    name: "Cinematic Film",
    targetDuration: "20m",
    prioritizedSegments: ["Couple", "Ceremony", "Reception", "Family", "Highlights"],
    clipIntelligenceWeight: 0.75,
    emotionAIWeight: 0.8,
    beatSyncRules: [{ type: "manual", intensity: "high" }],
  },
  {
    name: "Same Day Edit",
    targetDuration: "3m",
    prioritizedSegments: ["Couple", "Ceremony", "Highlights"],
    clipIntelligenceWeight: 0.9,
    emotionAIWeight: 0.8,
    beatSyncRules: [{ type: "auto", intensity: "high" }],
  },
];

export function parseDurationSeconds(value: string): number {
  const match = value.match(/^(?:(\d+)m)?(?:(\d+)s)?$/i);

  if (!match) {
    return 0;
  }

  const minutes = Number(match[1] ?? 0);
  const seconds = Number(match[2] ?? 0);
  return minutes * 60 + seconds;
}
