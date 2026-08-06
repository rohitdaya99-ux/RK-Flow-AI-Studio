import {
  ClipDescriptor,
  ClipScoreBreakdown,
  RankedClipCandidate,
  ScoreCategory,
  ScorePreset,
  ScoringProfile,
  ScoringReport,
  SCORE_CATEGORIES,
  SignalTrustLevel,
  AutoReelUserClipChoices,
  createEmptyUserClipChoices
} from "./models";
import { scoringPresets } from "./scoringPresets";
import { humaniseSignal, DEFAULT_PROFILE_VERSION } from "./autoReelScoringService";

/** Operator-facing preset order for the Phase 10 selector. */
export const SCORING_PRESET_ORDER = [
  "balanced",
  "cinematic",
  "emotional",
  "couple",
  "family",
  "dance",
  "luxury",
  "documentary",
  "viral"
] as const;

export type ScoringPresetId = (typeof SCORING_PRESET_ORDER)[number];

export function listScoringPresets(): ScorePreset[] {
  const byId = new Map(scoringPresets.map((preset) => [preset.id, preset]));
  const ordered: ScorePreset[] = [];
  for (const id of SCORING_PRESET_ORDER) {
    const preset = byId.get(id);
    if (preset) ordered.push(preset);
  }
  for (const preset of scoringPresets) {
    if (!SCORING_PRESET_ORDER.includes(preset.id as ScoringPresetId)) ordered.push(preset);
  }
  return ordered;
}

export function findScoringPreset(presetId: string): ScorePreset | undefined {
  return scoringPresets.find((preset) => preset.id === presetId);
}

/** Every category multiplier starts neutral; 1 means "use the preset as authored". */
export const DEFAULT_CATEGORY_WEIGHT = 1;
export const MIN_CATEGORY_WEIGHT = 0;
export const MAX_CATEGORY_WEIGHT = 2;

export function createDefaultCategoryWeights(): Record<ScoreCategory, number> {
  const weights = {} as Record<ScoreCategory, number>;
  for (const category of SCORE_CATEGORIES) {
    weights[category] = DEFAULT_CATEGORY_WEIGHT;
  }
  return weights;
}

export interface ScoringControlsState {
  presetId: string;
  categoryWeights: Record<ScoreCategory, number>;
  /** Version stamped onto the next saved custom profile. */
  profileVersion: string;
}

export function createScoringControlsState(
  presetId: string = "cinematic",
  profile?: ScoringProfile
): ScoringControlsState {
  const weights = createDefaultCategoryWeights();
  if (profile?.categoryWeights) {
    for (const category of SCORE_CATEGORIES) {
      const configured = profile.categoryWeights[category];
      if (typeof configured === "number" && Number.isFinite(configured) && configured >= 0) {
        weights[category] = clampCategoryWeight(configured);
      }
    }
  }
  return {
    presetId,
    categoryWeights: weights,
    profileVersion: profile?.version ?? DEFAULT_PROFILE_VERSION
  };
}

export function clampCategoryWeight(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_CATEGORY_WEIGHT;
  return Math.max(MIN_CATEGORY_WEIGHT, Math.min(MAX_CATEGORY_WEIGHT, value));
}

export function setCategoryWeight(
  state: ScoringControlsState,
  category: ScoreCategory,
  value: number
): ScoringControlsState {
  return {
    ...state,
    categoryWeights: { ...state.categoryWeights, [category]: clampCategoryWeight(value) }
  };
}

export function selectPreset(state: ScoringControlsState, presetId: string): ScoringControlsState {
  return { ...state, presetId, categoryWeights: createDefaultCategoryWeights() };
}

export function restoreDefaultWeights(state: ScoringControlsState): ScoringControlsState {
  return { ...state, categoryWeights: createDefaultCategoryWeights() };
}

export function hasCustomWeights(state: ScoringControlsState): boolean {
  return SCORE_CATEGORIES.some(
    (category) => state.categoryWeights[category] !== DEFAULT_CATEGORY_WEIGHT
  );
}

function nextProfileVersion(current: string): string {
  const parsed = Number.parseInt(current, 10);
  return Number.isFinite(parsed) ? String(parsed + 1) : DEFAULT_PROFILE_VERSION;
}

/**
 * Resolves the profile the engine should run with. Returns the untouched preset
 * profile while the operator has not edited any weight, so an unedited run is
 * byte-identical to the preset.
 */
export function resolveControlsProfile(state: ScoringControlsState): ScoringProfile {
  const preset = findScoringPreset(state.presetId) ?? listScoringPresets()[0];
  if (!hasCustomWeights(state)) {
    return preset.profile;
  }
  return {
    ...preset.profile,
    categoryWeights: { ...state.categoryWeights },
    version: state.profileVersion
  };
}

/** Builds the profile stored on the job when the operator saves a custom profile. */
export function buildCustomProfile(state: ScoringControlsState): {
  profile: ScoringProfile;
  state: ScoringControlsState;
} {
  const preset = findScoringPreset(state.presetId) ?? listScoringPresets()[0];
  const version = nextProfileVersion(state.profileVersion);
  return {
    profile: {
      ...preset.profile,
      categoryWeights: { ...state.categoryWeights },
      version
    },
    state: { ...state, profileVersion: version }
  };
}

export type ClipListFilter = "all" | "selected" | "rejected" | "uncertain";
export type ClipListSort = "score" | "name" | "duration" | "confidence";

export interface ClipListViewState {
  /** true shows the unadjusted raw score in the headline position. */
  rawMode: boolean;
  filter: ClipListFilter;
  sort: ClipListSort;
  search: string;
  expandedClipId: string | null;
}

export function createClipListViewState(): ClipListViewState {
  return { rawMode: false, filter: "all", sort: "score", search: "", expandedClipId: null };
}

export interface ClipListRow {
  candidate: RankedClipCandidate;
  clipName: string;
  durationSeconds: number | null;
}

export function clipDurationSeconds(clip: ClipDescriptor | undefined): number | null {
  if (!clip) return null;
  if (typeof clip.durationSeconds === "number") return clip.durationSeconds;
  if (typeof clip.sourceInSeconds === "number" && typeof clip.sourceOutSeconds === "number") {
    return Math.max(0, clip.sourceOutSeconds - clip.sourceInSeconds);
  }
  return null;
}

export function buildClipListRows(
  report: ScoringReport | undefined,
  clips: ClipDescriptor[]
): ClipListRow[] {
  if (!report) return [];
  const clipsById = new Map(clips.map((clip) => [clip.id, clip]));
  return report.rankedClips.map((candidate) => {
    const clip = clipsById.get(candidate.clipId);
    return {
      candidate,
      clipName: clip?.name ?? candidate.clipId,
      durationSeconds: clipDurationSeconds(clip)
    };
  });
}

export function applyClipListView(rows: ClipListRow[], view: ClipListViewState): ClipListRow[] {
  const search = view.search.trim().toLowerCase();
  const filtered = rows.filter((row) => {
    if (view.filter !== "all" && row.candidate.breakdown.state !== view.filter) return false;
    if (search && !row.clipName.toLowerCase().includes(search)) return false;
    return true;
  });

  const sorted = [...filtered];
  sorted.sort((a, b) => {
    switch (view.sort) {
      case "name":
        return a.clipName.localeCompare(b.clipName) || a.candidate.clipId.localeCompare(b.candidate.clipId);
      case "duration": {
        // Clips with no measurable duration sort last rather than as zero.
        const left = a.durationSeconds;
        const right = b.durationSeconds;
        if (left === null && right === null) return a.candidate.clipId.localeCompare(b.candidate.clipId);
        if (left === null) return 1;
        if (right === null) return -1;
        return right - left || a.candidate.clipId.localeCompare(b.candidate.clipId);
      }
      case "confidence":
        return (
          b.candidate.breakdown.confidence - a.candidate.breakdown.confidence ||
          a.candidate.clipId.localeCompare(b.candidate.clipId)
        );
      case "score":
      default: {
        const left = view.rawMode ? a.candidate.breakdown.rawScore : a.candidate.breakdown.finalScore;
        const right = view.rawMode ? b.candidate.breakdown.rawScore : b.candidate.breakdown.finalScore;
        if (Math.abs(right - left) > 0.01) return right - left;
        return a.candidate.rank - b.candidate.rank;
      }
    }
  });
  return sorted;
}

export function countClipStates(rows: ClipListRow[]): Record<"selected" | "rejected" | "uncertain", number> {
  const counts = { selected: 0, rejected: 0, uncertain: 0 };
  for (const row of rows) {
    counts[row.candidate.breakdown.state]++;
  }
  return counts;
}

export const TRUST_LABELS: Record<SignalTrustLevel, string> = {
  measured: "Measured",
  user_confirmed: "User-confirmed",
  user_corrected: "User-corrected",
  provider_model: "Provider-model",
  heuristic: "Heuristic",
  unavailable: "Unavailable"
};

export function describeTrust(trust: SignalTrustLevel | null): string {
  return trust === null ? TRUST_LABELS.unavailable : TRUST_LABELS[trust];
}

/** Heuristic evidence must stay visually separable from measured evidence. */
export function isHeuristicTrust(trust: SignalTrustLevel | null): boolean {
  return trust === "heuristic";
}

export const CATEGORY_LABELS: Record<ScoreCategory, string> = {
  technical: "Technical",
  vision: "Vision",
  face: "Face",
  wedding: "Wedding",
  emotion: "Emotion",
  music: "Music",
  preference: "Preference"
};

export interface CategoryDisplay {
  category: ScoreCategory;
  label: string;
  available: boolean;
  value: number | null;
  trust: SignalTrustLevel | null;
  trustLabel: string;
  heuristic: boolean;
  availableSignalCount: number;
  weightedSignalCount: number;
  missingSignals: string[];
}

export function buildCategoryDisplays(breakdown: ClipScoreBreakdown): CategoryDisplay[] {
  return SCORE_CATEGORIES.map((category) => {
    const score = breakdown.categories?.[category];
    const available = score?.available ?? false;
    const trust = score?.dominantTrust ?? null;
    return {
      category,
      label: CATEGORY_LABELS[category],
      available,
      value: available ? score?.value ?? null : null,
      trust,
      trustLabel: describeTrust(available ? trust : null),
      heuristic: available && isHeuristicTrust(trust),
      availableSignalCount: score?.availableSignalCount ?? 0,
      weightedSignalCount: score?.weightedSignalCount ?? 0,
      missingSignals: score?.missingSignals ?? []
    };
  });
}

function joinPhrases(parts: string[]): string {
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

/**
 * Reason descriptions are authored as standalone clauses ("it is sharp"). When
 * several are chained after a single "because", the repeated subject reads
 * badly, so drop it from every clause after the first.
 */
function joinReasonClauses(descriptions: string[]): string {
  const clauses = descriptions.map((description, index) =>
    index === 0 ? description : description.replace(/^it\s+/i, "")
  );
  return joinPhrases(clauses);
}

function pluralizeSignals(count: number): string {
  return count === 1 ? "1 signal was" : `${count} signals were`;
}

function roundScore(value: number): string {
  return Number.isFinite(value) ? value.toFixed(0) : "0";
}

/**
 * Builds the operator-readable explanation. Every clause is derived from the
 * supplied breakdown — nothing is inferred, so a clip with no available signal
 * is described as unscored rather than given invented praise.
 */
export function buildScoreExplanation(breakdown: ClipScoreBreakdown, clipName: string): string {
  const sentences: string[] = [];
  const positives = breakdown.positiveReasons ?? [];
  const negatives = breakdown.negativeReasons ?? [];
  const unavailable = breakdown.unavailableSignals ?? [];
  const availableSignals = Object.entries(breakdown.trustSummary ?? {}).reduce(
    (total, [trust, count]) => (trust === "unavailable" ? total : total + (count ?? 0)),
    0
  );

  if (availableSignals === 0) {
    sentences.push(
      `${clipName} could not be scored because no signal was available for it.`
    );
    if (unavailable.length > 0) {
      sentences.push(
        `${pluralizeSignals(unavailable.length)} unavailable: ${unavailable.join(", ")}.`
      );
    }
    return sentences.join(" ");
  }

  if (breakdown.state === "rejected") {
    sentences.push(
      `${clipName} scored ${roundScore(breakdown.finalScore)} because you excluded it, so it is held out of selection.`
    );
  } else if (positives.length > 0) {
    sentences.push(
      `${clipName} scored ${roundScore(breakdown.finalScore)} because ${joinReasonClauses(positives.map((reason) => reason.description))}.`
    );
  } else {
    sentences.push(
      `${clipName} scored ${roundScore(breakdown.finalScore)} from ${availableSignals} available signal${availableSignals === 1 ? "" : "s"}, none of which scored strongly.`
    );
  }

  if (breakdown.penalties > 0) {
    const penaltyReasons = negatives.filter((reason) => reason.scoreEffect < 0);
    sentences.push(
      penaltyReasons.length > 0
        ? `It lost ${roundScore(breakdown.penalties)} points due to ${joinReasonClauses(penaltyReasons.map((reason) => reason.description))}.`
        : `It lost ${roundScore(breakdown.penalties)} points to penalty rules.`
    );
  }

  if (breakdown.diversityAdjustment < 0) {
    sentences.push(
      `A further ${roundScore(Math.abs(breakdown.diversityAdjustment))} points were removed as a diversity adjustment for repeating an already well-covered look.`
    );
  }

  if (unavailable.length > 0) {
    sentences.push(
      `${pluralizeSignals(unavailable.length)} unavailable and contributed nothing: ${unavailable.map(humaniseSignal).join(", ")}.`
    );
  }

  sentences.push(
    `Confidence is ${roundScore(breakdown.confidence * 100)}% based on how many weighted signals could be read.`
  );

  return sentences.join(" ");
}

export type ClipChoiceKind = "lock" | "require" | "exclude";

/**
 * Toggles one operator choice. Lock, require, and exclude are mutually
 * exclusive per clip so the persisted preference stays unambiguous.
 */
export function toggleClipChoice(
  choices: AutoReelUserClipChoices | undefined,
  clipId: string,
  kind: ClipChoiceKind,
  updatedAt: string
): AutoReelUserClipChoices {
  const base = choices ?? createEmptyUserClipChoices(updatedAt);
  const locked = new Set(base.lockedClipIds);
  const required = new Set(base.requiredClipIds);
  const excluded = new Set(base.excludedClipIds);

  const target = kind === "lock" ? locked : kind === "require" ? required : excluded;
  const alreadySet = target.has(clipId);

  locked.delete(clipId);
  required.delete(clipId);
  excluded.delete(clipId);

  if (!alreadySet) {
    (kind === "lock" ? locked : kind === "require" ? required : excluded).add(clipId);
  }

  return {
    lockedClipIds: Array.from(locked).sort(),
    requiredClipIds: Array.from(required).sort(),
    excludedClipIds: Array.from(excluded).sort(),
    updatedAt
  };
}

export function hasClipChoice(
  choices: AutoReelUserClipChoices | undefined,
  clipId: string,
  kind: ClipChoiceKind
): boolean {
  if (!choices) return false;
  const list =
    kind === "lock"
      ? choices.lockedClipIds
      : kind === "require"
        ? choices.requiredClipIds
        : choices.excludedClipIds;
  return list.includes(clipId);
}

export interface ScoringRunStatus {
  phase: "idle" | "running" | "completed" | "cancelled" | "failed";
  completedClips: number;
  totalClips: number;
  currentClipName: string | null;
  failureReason: string | null;
}

export function createScoringRunStatus(): ScoringRunStatus {
  return {
    phase: "idle",
    completedClips: 0,
    totalClips: 0,
    currentClipName: null,
    failureReason: null
  };
}

export function remainingClips(status: ScoringRunStatus): number {
  return Math.max(0, status.totalClips - status.completedClips);
}

export function describeScoringRun(status: ScoringRunStatus, report?: ScoringReport): string {
  switch (status.phase) {
    case "running":
      return status.currentClipName
        ? `Scoring ${status.currentClipName} — ${status.completedClips} of ${status.totalClips} complete, ${remainingClips(status)} remaining.`
        : `Scoring ${status.completedClips} of ${status.totalClips} clips.`;
    case "cancelled":
      return `Scoring cancelled after ${status.completedClips} of ${status.totalClips} clips. Partial results are shown below.`;
    case "failed":
      return `Scoring failed: ${status.failureReason ?? "unknown error"}. No ranking was produced from this run.`;
    case "completed":
      return report
        ? `Scored ${report.completedClips} of ${report.totalClips} clips with profile ${report.scoringProfileId} v${report.scoringProfileVersion}.`
        : `Scoring completed.`;
    case "idle":
    default:
      return report
        ? `Showing the last scoring report for profile ${report.scoringProfileId} v${report.scoringProfileVersion}.`
        : `Scoring has not run yet. Configure weights and press Rescore Clips.`;
  }
}
