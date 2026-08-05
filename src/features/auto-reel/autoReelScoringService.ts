import {
  AutoReelJob, ScoringProfile, ScoringReport, ClipDescriptor,
  ClipScoreBreakdown, RankedClipCandidate, VisionClipAnalysis,
  DetectedFace, EmotionClipReport, ClipScoreReason, SignalTrustLevel,
  AudioAnalysis, WeddingEventSignals, ScoreCategory, SCORE_CATEGORIES,
  CategoryScore, AutoReelUserClipChoices, UserClipPreference,
  getUserClipPreference
} from "./models";
import { cinematicPreset, scoringPresets } from "./scoringPresets";
import { AutoReelJobMemory } from "./AutoReelJobMemory";
import { MemoryEngine } from "../../core/brain/MemoryEngine";

export const SCORING_ENGINE_VERSION = "phase-10-scoring-v1";
export const DEFAULT_PROFILE_VERSION = "1";

/** Signal namespace -> category. Unknown namespaces stay uncategorised. */
export function categoryForSignal(signal: string): ScoreCategory | null {
  const namespace = signal.split(".")[0];
  switch (namespace) {
    case "technical":
      return "technical";
    case "vision":
      return "vision";
    case "face":
      return "face";
    case "wedding":
      return "wedding";
    case "emotion":
      return "emotion";
    case "music":
      return "music";
    case "preference":
      return "preference";
    default:
      return null;
  }
}

export function getCategoryWeight(profile: ScoringProfile, category: ScoreCategory): number {
  const configured = profile.categoryWeights?.[category];
  return typeof configured === "number" && Number.isFinite(configured) && configured >= 0
    ? configured
    : 1;
}

function normalizeSignal(value: number | undefined, min: number, max: number): number {
  if (value === undefined) return 0;
  const clamped = Math.max(min, Math.min(max, value));
  return ((clamped - min) / (max - min)) * 100;
}

function getTrustMultiplier(source: string | undefined): number {
  switch (source) {
    case "user_confirmed":
    case "user_corrected":
      return 1.0;
    case "measured":
      return 0.95;
    case "provider_model":
      return 0.8;
    case "heuristic":
      return 0.6;
    case "unavailable":
    default:
      return 0.0;
  }
}

interface SignalValue {
  value?: number;
  trust?: SignalTrustLevel;
}

interface CategoryAccumulator {
  weighted: number;
  weight: number;
  availableSignalCount: number;
  weightedSignalCount: number;
  missingSignals: string[];
  trustCounts: Partial<Record<SignalTrustLevel, number>>;
}

export interface ScoringProgress {
  completedClips: number;
  totalClips: number;
  currentClipId: string | null;
  currentClipName: string | null;
}

export interface ScoreRunOptions {
  signal?: { aborted: boolean };
  onProgress?: (progress: ScoringProgress) => void;
  /** Injectable clock so reruns are byte-comparable in tests. */
  now?: () => string;
  userClipChoices?: AutoReelUserClipChoices;
}

export class ScoringCancelledError extends Error {
  public constructor(public readonly completedClips: number) {
    super("Scoring cancelled before completion.");
    this.name = "ScoringCancelledError";
  }
}

export class ScoringEngine {
  private visionByClipId = new Map<string, VisionClipAnalysis>();
  private facesByClipId = new Map<string, DetectedFace[]>();
  private emotionByClipId = new Map<string, EmotionClipReport>();
  private weddingByClipId = new Map<string, WeddingEventSignals[]>();
  private clipsById = new Map<string, ClipDescriptor>();
  private musicAnalyses: AudioAnalysis[];
  private userClipChoices?: AutoReelUserClipChoices;

  constructor(private job: AutoReelJob, private profile: ScoringProfile) {
    // Build lookups
    if (job.vision?.clips) {
      for (const vc of job.vision.clips) {
        this.visionByClipId.set(vc.clipId, vc);
      }
    }
    if (job.face?.faces) {
      for (const face of job.face.faces) {
        if (!this.facesByClipId.has(face.clipId)) {
          this.facesByClipId.set(face.clipId, []);
        }
        this.facesByClipId.get(face.clipId)!.push(face);
      }
    }
    if (job.emotion?.clips) {
      for (const ec of job.emotion.clips) {
        this.emotionByClipId.set(ec.clipId, ec);
      }
    }
    if (job.weddingEventSignals) {
      for (const ws of job.weddingEventSignals) {
        if (!this.weddingByClipId.has(ws.clipId)) {
          this.weddingByClipId.set(ws.clipId, []);
        }
        this.weddingByClipId.get(ws.clipId)!.push(ws);
      }
    }
    for (const clip of job.clips) {
      this.clipsById.set(clip.id, clip);
    }

    this.musicAnalyses = job.music?.audioAnalyses ?? [];
    this.userClipChoices = job.userClipChoices;
  }

  public score(options: ScoreRunOptions = {}): ScoringReport {
    const now = options.now ?? (() => new Date().toISOString());
    const startedAt = now();
    const choices = options.userClipChoices ?? this.userClipChoices;
    const breakdowns: ClipScoreBreakdown[] = [];
    const unavailableSignals = new Set<string>();
    const totalClips = this.job.clips.length;
    let cancelled = false;

    for (const clip of this.job.clips) {
      if (options.signal?.aborted) {
        cancelled = true;
        break;
      }
      breakdowns.push(this.scoreClip(clip, unavailableSignals, choices));
      options.onProgress?.({
        completedClips: breakdowns.length,
        totalClips,
        currentClipId: clip.id,
        currentClipName: clip.name
      });
    }

    this.applyDiversity(breakdowns);

    breakdowns.sort((a, b) => {
      if (Math.abs(b.finalScore - a.finalScore) > 0.01) {
        return b.finalScore - a.finalScore;
      }
      return a.clipId.localeCompare(b.clipId);
    });

    const rankedClips: RankedClipCandidate[] = breakdowns.map((b, index) => ({
      clipId: b.clipId,
      rank: index + 1,
      score: b.finalScore,
      breakdown: b,
    }));

    const completedAt = now();
    return {
      jobId: this.job.id,
      status: cancelled ? "cancelled" : "completed",
      scoringProfileId: this.profile.id,
      scoringProfileVersion: this.profile.version ?? DEFAULT_PROFILE_VERSION,
      scoringEngineVersion: SCORING_ENGINE_VERSION,
      rankedClips,
      warnings: Array.from(unavailableSignals)
        .sort()
        .map(s => `Signal unavailable: ${s}`),
      partial: cancelled,
      totalClips,
      completedClips: breakdowns.length,
      startedAt,
      completedAt,
      lastScoredAt: completedAt,
    };
  }

  private scoreClip(
    clip: ClipDescriptor,
    unavailableSignals: Set<string>,
    choices: AutoReelUserClipChoices | undefined
  ): ClipScoreBreakdown {
    const preference = getUserClipPreference(clip.id, choices);
    const locked = choices?.lockedClipIds.includes(clip.id) ?? false;
    const excluded =
      preference === "excluded" || (this.job.request.excludedClipIds?.includes(clip.id) ?? false);

    let totalWeight = 0;
    let totalWeightedScore = 0;
    let availableCount = 0;
    let totalCount = 0;
    const trustSummary: Record<SignalTrustLevel, number> = {
      user_confirmed: 0,
      user_corrected: 0,
      measured: 0,
      provider_model: 0,
      heuristic: 0,
      unavailable: 0,
    };

    const accumulators = new Map<ScoreCategory, CategoryAccumulator>();
    for (const category of SCORE_CATEGORIES) {
      accumulators.set(category, {
        weighted: 0,
        weight: 0,
        availableSignalCount: 0,
        weightedSignalCount: 0,
        missingSignals: [],
        trustCounts: {},
      });
    }

    const clipUnavailable: string[] = [];
    const positiveReasons: ClipScoreReason[] = [];
    const negativeReasons: ClipScoreReason[] = [];

    for (const weight of this.profile.weights) {
      totalCount++;
      const category = categoryForSignal(weight.signal);
      const accumulator = category ? accumulators.get(category)! : undefined;
      const categoryWeight = category ? getCategoryWeight(this.profile, category) : 1;
      const effectiveWeight = weight.weight * categoryWeight;
      if (accumulator) accumulator.weightedSignalCount++;

      const valInfo = this.getSignalValue(clip.id, weight.signal);
      if (valInfo === undefined || valInfo.value === undefined) {
        unavailableSignals.add(weight.signal);
        clipUnavailable.push(weight.signal);
        trustSummary.unavailable++;
        if (accumulator) accumulator.missingSignals.push(weight.signal);
        continue;
      }

      availableCount++;
      const trust = valInfo.trust || "provider_model";
      trustSummary[trust]++;
      const trustMult = getTrustMultiplier(trust);
      const contribution = valInfo.value * effectiveWeight * trustMult;

      totalWeight += effectiveWeight;
      totalWeightedScore += contribution;

      if (accumulator) {
        accumulator.weighted += contribution;
        accumulator.weight += effectiveWeight;
        accumulator.availableSignalCount++;
        accumulator.trustCounts[trust] = (accumulator.trustCounts[trust] ?? 0) + 1;
      }

      const maxPossible = 100 * effectiveWeight * trustMult;
      const normalizedContribution = maxPossible > 0 ? (contribution / maxPossible) * 100 : 0;

      const reason: ClipScoreReason = {
        sourceSignal: weight.signal,
        scoreEffect: contribution,
        description: describeSignal(weight.signal, valInfo.value, trust),
      };

      if (normalizedContribution >= 70) positiveReasons.push(reason);
      else if (normalizedContribution <= 30) negativeReasons.push(reason);
    }

    // Preference is a synthetic signal: only available once the operator has
    // actually expressed a choice for this clip. Neutral stays unavailable so
    // an untouched clip is never credited with an invented preference score.
    const preferenceAccumulator = accumulators.get("preference")!;
    const preferenceWeight = getCategoryWeight(this.profile, "preference");
    totalCount++;
    preferenceAccumulator.weightedSignalCount++;
    const preferenceValue = preferenceSignalValue(preference);
    if (preferenceValue === null) {
      unavailableSignals.add("preference.userChoice");
      clipUnavailable.push("preference.userChoice");
      trustSummary.unavailable++;
      preferenceAccumulator.missingSignals.push("preference.userChoice");
    } else if (preferenceWeight > 0) {
      availableCount++;
      trustSummary.user_confirmed++;
      const contribution = preferenceValue * preferenceWeight * 1.0;
      totalWeight += preferenceWeight;
      totalWeightedScore += contribution;
      preferenceAccumulator.weighted += contribution;
      preferenceAccumulator.weight += preferenceWeight;
      preferenceAccumulator.availableSignalCount++;
      preferenceAccumulator.trustCounts.user_confirmed =
        (preferenceAccumulator.trustCounts.user_confirmed ?? 0) + 1;

      const reason: ClipScoreReason = {
        sourceSignal: "preference.userChoice",
        scoreEffect: contribution,
        description: `you marked this clip ${preference}`,
      };
      if (preferenceValue >= 70) positiveReasons.push(reason);
      else if (preferenceValue <= 30) negativeReasons.push(reason);
    }

    const rawScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;

    // Penalties
    let penaltyPoints = 0;
    for (const rule of this.profile.penalties || []) {
      const valInfo = this.getSignalValue(clip.id, rule.signal);
      if (valInfo && valInfo.value !== undefined) {
        let applies = false;
        if (rule.operator === "<" && valInfo.value < rule.threshold) applies = true;
        if (rule.operator === ">" && valInfo.value > rule.threshold) applies = true;
        if (rule.operator === "==" && valInfo.value === rule.threshold) applies = true;

        if (applies) {
          penaltyPoints += rule.penaltyPoints;
          negativeReasons.push({
            sourceSignal: rule.signal,
            scoreEffect: -rule.penaltyPoints,
            description: rule.reason || `${rule.signal} ${rule.operator} ${rule.threshold}`,
          });
        }
      }
    }

    const finalScore = excluded ? 0 : Math.max(0, rawScore - penaltyPoints);
    const state: ClipScoreBreakdown["state"] = excluded
      ? "rejected"
      : availableCount === 0
        ? "uncertain"
        : finalScore > 0
          ? "selected"
          : "uncertain";

    positiveReasons.sort((a, b) => b.scoreEffect - a.scoreEffect);
    negativeReasons.sort((a, b) => a.scoreEffect - b.scoreEffect);

    const categories = {} as Record<ScoreCategory, CategoryScore>;
    for (const category of SCORE_CATEGORIES) {
      categories[category] = finalizeCategory(category, accumulators.get(category)!);
    }

    return {
      clipId: clip.id,
      rawScore,
      technicalScore: categories.technical.value ?? 0,
      visionScore: categories.vision.value ?? 0,
      faceScore: categories.face.value ?? 0,
      weddingScore: categories.wedding.value ?? 0,
      emotionScore: categories.emotion.value ?? 0,
      musicCompatibilityScore: categories.music.value ?? 0,
      preferenceScore: categories.preference.value ?? 0,
      categories,
      penalties: penaltyPoints,
      diversityAdjustment: 0,
      finalScore,
      confidence: totalCount > 0 ? availableCount / totalCount : 0,
      state,
      trustSummary,
      positiveReasons: positiveReasons.slice(0, 5),
      negativeReasons: negativeReasons.slice(0, 5),
      unavailableSignals: clipUnavailable,
      providerVersions: this.collectProviderVersions(),
      userPreference: preference,
      locked,
    };
  }

  private collectProviderVersions(): Record<string, string> {
    const versions: Record<string, string> = {};
    if (this.job.vision?.visionVersion) versions.vision = this.job.vision.visionVersion;
    if (this.job.face?.faceModelVersion) versions.face = this.job.face.faceModelVersion;
    if (this.job.emotion?.emotionModelVersion) versions.emotion = this.job.emotion.emotionModelVersion;
    if (this.job.music?.musicAnalysisVersion) versions.music = this.job.music.musicAnalysisVersion;
    return versions;
  }

  private getSignalValue(clipId: string, signalName: string): SignalValue | undefined {
    const vc = this.visionByClipId.get(clipId);
    const faces = this.facesByClipId.get(clipId) || [];
    const ec = this.emotionByClipId.get(clipId);
    const ws = this.weddingByClipId.get(clipId) || [];

    // Technical signals
    if (signalName.startsWith("technical.")) {
      const sub = signalName.split(".")[1];
      if (sub === "duration") {
        const clip = this.clipsById.get(clipId);
        const duration = clipDurationSeconds(clip);
        return duration === null ? undefined : { value: duration, trust: "measured" };
      }
      if (!vc || !vc.frames || vc.frames.length === 0) return undefined;
      const frames = vc.frames;
      let sum = 0;
      let counted = 0;
      for (const f of frames) {
        const value = technicalFrameValue(sub, f);
        if (value === null) continue;
        sum += value;
        counted++;
      }
      if (counted === 0) return undefined;
      return { value: normalizeSignal(sum / counted, 0, 1), trust: "measured" };
    }

    // Vision signals
    if (signalName.startsWith("vision.")) {
      if (!vc) return undefined;
      const sub = signalName.split(".")[1];
      if (sub === "quality") return { value: normalizeSignal(vc.qualityScore, 0, 1), trust: "provider_model" };

      if (sub === "shotType") {
        const requested = signalName.split(".")[2];
        if (!requested || !vc.frames || vc.frames.length === 0) return undefined;
        const matches = vc.frames.filter(
          (f) => f.sceneEstimate?.shotType === requested
        ).length;
        return { value: (matches / vc.frames.length) * 100, trust: "provider_model" };
      }

      if (vc.frames && vc.frames.length > 0) {
        let sum = 0;
        let counted = 0;
        for (const f of vc.frames) {
          const value = visionFrameValue(sub, f);
          if (value === null) continue;
          sum += value;
          counted++;
        }
        if (counted === 0) return undefined;
        return { value: normalizeSignal(sum / counted, 0, 1), trust: "provider_model" };
      }
      return undefined;
    }

    // Face signals
    if (signalName.startsWith("face.")) {
      if (!this.job.face) return undefined;
      const sub = signalName.split(".")[1];
      if (sub === "visibility") return { value: faces.length > 0 ? 100 : 0, trust: "provider_model" };
      if (sub === "count") return { value: Math.min(faces.length * 20, 100), trust: "measured" };
      if (sub === "quality") {
        const scored = faces.filter((f) => typeof f.qualityScore === "number");
        if (scored.length === 0) return undefined;
        const best = Math.max(...scored.map((f) => f.qualityScore as number));
        return { value: normalizeSignal(best, 0, 1), trust: "provider_model" };
      }
      return undefined;
    }

    // Emotion signals
    if (signalName.startsWith("emotion.")) {
      if (!ec) return undefined;
      const sub = signalName.split(".")[1];
      if (sub === "smile" || sub === "smileScore") {
        return maybeSignal(ec.expressionSummary?.smileScore, "provider_model");
      }
      if (sub === "expression" || sub === "expressionConfidence") {
        return maybeSignal(ec.expressionSummary?.expressionScore, "provider_model");
      }
      if (sub === "moodConfidence") {
        return maybeSignal(ec.moodEstimate?.confidence, "provider_model");
      }
      if (sub === "mood") {
        const requested = signalName.split(".")[2];
        if (!requested || !ec.moodEstimate) return undefined;
        const matches = ec.moodEstimate.dominant_mood === requested;
        return { value: matches ? normalizeSignal(ec.moodEstimate.confidence, 0, 1) : 0, trust: "provider_model" };
      }
      return undefined;
    }

    // Wedding signals — local cue heuristics, never measured ground truth.
    if (signalName.startsWith("wedding.")) {
      if (ws.length === 0) return undefined;

      const sub = signalName.replace("wedding.", "");
      const importanceMap: Record<string, number> = {
        "pheras": 100, "varmala": 95, "sindoor": 90, "baraat": 85,
        "bride-entry": 80, "groom-entry": 75, "bidaai": 90,
        "sangeet": 70, "mehndi": 65, "haldi": 60, "reception": 75,
        "dance": 70, "couple-portrait": 85, "family": 65,
        "decor": 50, "drone": 60, "detail": 40, "unknown": 20
      };

      // WeddingEventSignals.source already carries the provenance the operator
      // needs; a local-cue suggestion must never be reported as measured.
      const confirmed = ws.find((w) => w.source === "user_confirmed" || w.source === "user_corrected");
      const trust: SignalTrustLevel = confirmed ? confirmed.source : "heuristic";

      if (sub.startsWith("event.")) {
        const ev = sub.replace("event.", "");
        const match = ws.find((w) => w.primaryEvent === ev);
        if (!match) return { value: 0, trust };
        return { value: normalizeSignal(match.confidence, 0, 1), trust };
      }

      let maxVal = 0;
      for (const w of ws) {
        const imp = importanceMap[w.primaryEvent] ?? 20;
        const val = imp * clampUnit(w.confidence);
        if (val > maxVal) maxVal = val;
      }
      return { value: normalizeSignal(maxVal, 0, 100), trust };
    }

    // Music signals — derived alignment estimates, reported as heuristic.
    if (signalName.startsWith("music.")) {
      const analysis = this.musicAnalyses[0];
      if (!analysis) return undefined;
      const sub = signalName.split(".")[1];
      const clip = this.clipsById.get(clipId);

      if (sub === "tempoStability") {
        return maybeSignal(analysis.tempoStability, "heuristic");
      }
      if (sub === "beatCompatibility") {
        const duration = clipDurationSeconds(clip);
        if (duration === null || duration <= 0) return undefined;
        if (!analysis.bpmEstimate || analysis.bpmEstimate <= 0) return undefined;
        const beatPeriod = 60 / analysis.bpmEstimate;
        const beats = duration / beatPeriod;
        const distance = Math.abs(beats - Math.round(beats));
        return { value: (1 - Math.min(0.5, distance) / 0.5) * 100, trust: "heuristic" };
      }
      if (sub === "energy" || sub === "highEnergyDrop" || sub === "quietEmotional") {
        const energy = this.energyAtClip(analysis, clip);
        if (energy === null) return undefined;
        if (sub === "quietEmotional") return { value: (1 - energy) * 100, trust: "heuristic" };
        return { value: energy * 100, trust: "heuristic" };
      }
      if (sub === "section") {
        const section = this.sectionAtClip(analysis, clip);
        return section === null ? undefined : { value: 100, trust: "heuristic" };
      }
      return undefined;
    }

    return undefined;
  }

  private energyAtClip(analysis: AudioAnalysis, clip: ClipDescriptor | undefined): number | null {
    const at = clipTimelineStart(clip);
    if (at === null || !analysis.energyCurve || analysis.energyCurve.length === 0) return null;
    let closest = analysis.energyCurve[0];
    let bestDistance = Math.abs(closest.timestamp - at);
    for (const point of analysis.energyCurve) {
      const distance = Math.abs(point.timestamp - at);
      if (distance < bestDistance) {
        bestDistance = distance;
        closest = point;
      }
    }
    return typeof closest.normalizedEnergy === "number" ? clampUnit(closest.normalizedEnergy) : null;
  }

  private sectionAtClip(analysis: AudioAnalysis, clip: ClipDescriptor | undefined) {
    const at = clipTimelineStart(clip);
    if (at === null || !analysis.sections || analysis.sections.length === 0) return null;
    return (
      analysis.sections.find(
        (s) => at >= (s.startSeconds ?? 0) && at < (s.endSeconds ?? Number.POSITIVE_INFINITY)
      ) ?? null
    );
  }

  private applyDiversity(breakdowns: ClipScoreBreakdown[]) {
    breakdowns.sort((a, b) => {
      if (Math.abs(b.rawScore - a.rawScore) > 0.01) return b.rawScore - a.rawScore;
      return a.clipId.localeCompare(b.clipId);
    });

    for (const rule of this.profile.diversity || []) {
      const counts = new Map<string, number>();

      for (const b of breakdowns) {
        if (b.state === "rejected" || b.rawScore === 0) continue;

        let signalVal = "unknown";
        if (rule.signal.startsWith("face.")) {
          signalVal = (this.facesByClipId.get(b.clipId)?.length || 0).toString();
        } else if (rule.signal.startsWith("wedding.event")) {
          const evs = this.weddingByClipId.get(b.clipId);
          signalVal = evs && evs.length > 0 ? evs[0].primaryEvent : "unknown";
        } else if (rule.signal.startsWith("vision.")) {
          const vc = this.visionByClipId.get(b.clipId);
          signalVal = vc?.frames?.[0]?.sceneEstimate?.shotType ?? "unknown";
        }

        const count = counts.get(signalVal) || 0;
        if (count >= rule.maxOccurrences) {
          b.diversityAdjustment -= rule.penaltyPoints;
          b.finalScore = Math.max(0, b.finalScore - rule.penaltyPoints);
        }
        counts.set(signalVal, count + 1);
      }
    }
  }
}

function preferenceSignalValue(preference: UserClipPreference): number | null {
  switch (preference) {
    case "required":
      return 100;
    case "preferred":
      return 75;
    case "excluded":
      return 0;
    case "neutral":
    default:
      return null;
  }
}

function finalizeCategory(category: ScoreCategory, acc: CategoryAccumulator): CategoryScore {
  const available = acc.availableSignalCount > 0 && acc.weight > 0;
  let dominantTrust: SignalTrustLevel | null = null;
  let dominantCount = 0;
  for (const [trust, count] of Object.entries(acc.trustCounts)) {
    if ((count ?? 0) > dominantCount) {
      dominantCount = count ?? 0;
      dominantTrust = trust as SignalTrustLevel;
    }
  }
  return {
    category,
    value: available ? acc.weighted / acc.weight : null,
    available,
    weightedSignalCount: acc.weightedSignalCount,
    availableSignalCount: acc.availableSignalCount,
    missingSignals: acc.missingSignals,
    dominantTrust,
  };
}

function maybeSignal(value: number | undefined, trust: SignalTrustLevel): SignalValue | undefined {
  return typeof value === "number" ? { value: normalizeSignal(value, 0, 1), trust } : undefined;
}

function clampUnit(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0;
  // Wedding/emotion confidences arrive either as 0..1 or 0..100 depending on provider.
  const unit = value > 1 ? value / 100 : value;
  return Math.max(0, Math.min(1, unit));
}

function clipDurationSeconds(clip: ClipDescriptor | undefined): number | null {
  if (!clip) return null;
  if (typeof clip.durationSeconds === "number") return clip.durationSeconds;
  if (typeof clip.sourceInSeconds === "number" && typeof clip.sourceOutSeconds === "number") {
    return Math.max(0, clip.sourceOutSeconds - clip.sourceInSeconds);
  }
  return null;
}

function clipTimelineStart(clip: ClipDescriptor | undefined): number | null {
  if (!clip) return null;
  return typeof clip.timelineStartSeconds === "number" ? clip.timelineStartSeconds : null;
}

function technicalFrameValue(sub: string, frame: any): number | null {
  switch (sub) {
    case "sharpness":
      return numberOrNull(frame.sharpness);
    case "exposure":
      return numberOrNull(frame.exposure);
    case "blur":
      return invertOrNull(frame.blurScore);
    case "noise":
      return invertOrNull(frame.noiseScore);
    case "stability":
      return invertOrNull(frame.cameraShake);
    case "focus":
      return numberOrNull(frame.focusEstimate ?? frame.sharpness);
    case "composition":
      return numberOrNull(frame.compositionEstimate);
    case "framing":
      return numberOrNull(frame.ruleOfThirdsEstimate ?? frame.compositionEstimate);
    case "motion":
      return numberOrNull(frame.motionEstimate);
    default:
      return null;
  }
}

function visionFrameValue(sub: string, frame: any): number | null {
  switch (sub) {
    case "motion":
      return numberOrNull(frame.motionEstimate);
    case "composition":
      return numberOrNull(frame.compositionEstimate);
    case "ruleOfThirds":
      return numberOrNull(frame.ruleOfThirdsEstimate);
    case "lighting":
      return numberOrNull(frame.exposure);
    case "cameraAngle":
      return numberOrNull(frame.sceneEstimate?.droneLikelihood);
    default:
      return null;
  }
}

function numberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function invertOrNull(value: unknown): number | null {
  const parsed = numberOrNull(value);
  return parsed === null ? null : 1 - parsed;
}

function describeSignal(signal: string, value: number, trust: SignalTrustLevel): string {
  return `${humaniseSignal(signal)} measured ${value.toFixed(0)}/100 (${trust.replace(/_/g, " ")})`;
}

export function humaniseSignal(signal: string): string {
  const parts = signal.split(".");
  const tail = parts.slice(1).join(" ") || parts[0];
  return tail
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .toLowerCase();
}

export function resolveScoringProfile(job: AutoReelJob): ScoringProfile {
  if (job.customScoringProfile) {
    return job.customScoringProfile;
  }
  const presetId = job.request.setup?.scoringPresetId || "cinematic";
  const preset = scoringPresets.find((p) => p.id === presetId) || cinematicPreset;
  return preset.profile;
}

export interface RunScoringOptions extends ScoreRunOptions {
  profile?: ScoringProfile;
  memory?: MemoryEngine;
  persist?: boolean;
}

export async function runScoringPipeline(
  job: AutoReelJob,
  options: RunScoringOptions = {}
): Promise<AutoReelJob> {
  const profile = options.profile ?? resolveScoringProfile(job);

  const engine = new ScoringEngine(job, profile);
  const report = engine.score(options);

  const updatedJob: AutoReelJob = {
    ...job,
    scoring: report,
    scoreBreakdowns: report.rankedClips.map((rc) => rc.breakdown),
    customScoringProfile: options.profile ?? job.customScoringProfile,
  };

  if (options.persist !== false) {
    const jobMemory = new AutoReelJobMemory(options.memory ?? new MemoryEngine());
    jobMemory.save(updatedJob);
  }
  return updatedJob;
}
