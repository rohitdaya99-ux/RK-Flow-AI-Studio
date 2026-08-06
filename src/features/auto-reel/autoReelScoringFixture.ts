import {
  AutoReelUserClipChoices,
  ClipDescriptor,
  ClipScoreBreakdown,
  ScoreCategory,
  ScoringReport,
  SCORE_CATEGORIES,
  SignalTrustLevel
} from "./models";

/**
 * Deterministic scoring data used by the layout fixture and the Phase 10 UI
 * tests. It deliberately includes an unavailable category, a heuristic
 * category, a penalised clip, and a clip with no readable signal at all so the
 * "never show a fake score" rules stay exercised.
 */

interface FixtureCategorySpec {
  value: number | null;
  trust: SignalTrustLevel | null;
  missingSignals?: string[];
}

function buildCategories(
  spec: Partial<Record<ScoreCategory, FixtureCategorySpec>>
): ClipScoreBreakdown["categories"] {
  const categories = {} as ClipScoreBreakdown["categories"];
  for (const category of SCORE_CATEGORIES) {
    const entry = spec[category];
    const available = entry !== undefined && entry.value !== null;
    categories[category] = {
      category,
      value: available ? entry!.value : null,
      available,
      weightedSignalCount: entry ? 2 : 1,
      availableSignalCount: available ? 2 : 0,
      missingSignals: entry?.missingSignals ?? (available ? [] : [`${category}.unavailable`]),
      dominantTrust: available ? entry!.trust : null
    };
  }
  return categories;
}

function breakdown(
  clipId: string,
  overrides: Partial<ClipScoreBreakdown> & {
    categorySpec?: Partial<Record<ScoreCategory, FixtureCategorySpec>>;
  }
): ClipScoreBreakdown {
  const { categorySpec, ...rest } = overrides;
  const categories = buildCategories(categorySpec ?? {});
  return {
    clipId,
    finalScore: 0,
    rawScore: 0,
    technicalScore: categories.technical.value ?? 0,
    visionScore: categories.vision.value ?? 0,
    faceScore: categories.face.value ?? 0,
    weddingScore: categories.wedding.value ?? 0,
    emotionScore: categories.emotion.value ?? 0,
    musicCompatibilityScore: categories.music.value ?? 0,
    preferenceScore: categories.preference.value ?? 0,
    categories,
    penalties: 0,
    diversityAdjustment: 0,
    confidence: 0,
    state: "uncertain",
    trustSummary: {},
    positiveReasons: [],
    negativeReasons: [],
    unavailableSignals: [],
    providerVersions: { vision: "vision-1.0.0" },
    userPreference: "neutral",
    locked: false,
    ...rest
  };
}

export function buildScoringFixtureClips(): ClipDescriptor[] {
  return [
    fixtureClip("clip-023", "Clip 023 Varmala Hero", 4.5),
    fixtureClip("clip-011", "Clip 011 Bride Entry", 6.25),
    fixtureClip("clip-047", "Clip 047 Family Wide", 3.0),
    fixtureClip("clip-099", "Clip 099 Unreadable Source", null)
  ];
}

function fixtureClip(id: string, name: string, durationSeconds: number | null): ClipDescriptor {
  return {
    id,
    name,
    mediaType: "video",
    sourceInSeconds: 0,
    sourceOutSeconds: durationSeconds,
    durationSeconds,
    timelineStartSeconds: 0,
    speed: 1,
    disabled: false,
    selected: true,
    linkedClipIds: [],
    mediaFingerprint: `${id}-fingerprint`,
    cacheKey: `${id}-cache`,
    metadataStatus: "host-verified",
    capabilityNotes: []
  };
}

export function buildScoringFixtureReport(
  options: { partial?: boolean } = {}
): ScoringReport {
  const partial = options.partial ?? false;

  const top = breakdown("clip-023", {
    finalScore: 87,
    rawScore: 93,
    penalties: 6,
    confidence: 0.86,
    state: "selected",
    categorySpec: {
      technical: { value: 91, trust: "measured" },
      vision: { value: 84, trust: "provider_model" },
      face: { value: 72, trust: "provider_model" },
      wedding: { value: 88, trust: "heuristic" },
      emotion: { value: 79, trust: "provider_model" },
      music: { value: 81, trust: "heuristic" }
    },
    trustSummary: { measured: 4, provider_model: 5, heuristic: 3, unavailable: 1 },
    positiveReasons: [
      { sourceSignal: "technical.sharpness", scoreEffect: 24.1, description: "it is sharp" },
      { sourceSignal: "technical.exposure", scoreEffect: 18.4, description: "it is well exposed" },
      { sourceSignal: "emotion.smileScore", scoreEffect: 15.2, description: "it contains a visible smile estimate" },
      { sourceSignal: "music.section", scoreEffect: 12.7, description: "it aligns well with the selected music section" }
    ],
    negativeReasons: [
      {
        sourceSignal: "face.duplicateCoverage",
        scoreEffect: -6,
        description: "near-duplicate anonymous face coverage"
      }
    ],
    unavailableSignals: ["preference.userChoice"]
  });

  const second = breakdown("clip-011", {
    finalScore: 74.5,
    rawScore: 74.5,
    confidence: 0.62,
    state: "selected",
    categorySpec: {
      technical: { value: 78, trust: "measured" },
      vision: { value: 71, trust: "provider_model" },
      emotion: { value: 66, trust: "provider_model" }
    },
    trustSummary: { measured: 2, provider_model: 3, unavailable: 4 },
    positiveReasons: [
      { sourceSignal: "technical.sharpness", scoreEffect: 19.8, description: "it is sharp" }
    ],
    negativeReasons: [],
    unavailableSignals: ["face.visibility", "wedding.event.importance", "music.beatCompatibility", "preference.userChoice"]
  });

  const third = breakdown("clip-047", {
    finalScore: 41.2,
    rawScore: 49.2,
    penalties: 3,
    diversityAdjustment: -5,
    confidence: 0.44,
    state: "uncertain",
    categorySpec: {
      technical: { value: 52, trust: "measured" },
      wedding: { value: 38, trust: "heuristic" }
    },
    trustSummary: { measured: 2, heuristic: 2, unavailable: 5 },
    positiveReasons: [],
    negativeReasons: [
      { sourceSignal: "technical.blur", scoreEffect: -3, description: "excessive blur" }
    ],
    unavailableSignals: ["face.visibility", "vision.motion", "emotion.smileScore", "music.energy", "preference.userChoice"]
  });

  const unscored = breakdown("clip-099", {
    finalScore: 0,
    rawScore: 0,
    confidence: 0,
    state: "uncertain",
    trustSummary: { unavailable: 7 },
    unavailableSignals: [
      "technical.sharpness",
      "vision.quality",
      "face.visibility",
      "wedding.event.importance",
      "emotion.smileScore",
      "music.beatCompatibility",
      "preference.userChoice"
    ]
  });

  const ordered = partial ? [top, second] : [top, second, third, unscored];

  return {
    jobId: "job-fixture",
    status: partial ? "cancelled" : "completed",
    scoringProfileId: "cinematic",
    scoringProfileVersion: "1",
    scoringEngineVersion: "phase-10-scoring-v1",
    rankedClips: ordered.map((entry, index) => ({
      clipId: entry.clipId,
      rank: index + 1,
      score: entry.finalScore,
      breakdown: entry
    })),
    warnings: partial ? ["Signal unavailable: preference.userChoice"] : [],
    partial,
    totalClips: 4,
    completedClips: ordered.length,
    startedAt: "2026-08-05T09:00:00.000Z",
    completedAt: "2026-08-05T09:00:12.000Z",
    lastScoredAt: "2026-08-05T09:00:12.000Z"
  };
}

export function buildScoringFixtureChoices(): AutoReelUserClipChoices {
  return {
    lockedClipIds: ["clip-011"],
    requiredClipIds: ["clip-023"],
    excludedClipIds: [],
    updatedAt: "2026-08-05T09:00:00.000Z"
  };
}
