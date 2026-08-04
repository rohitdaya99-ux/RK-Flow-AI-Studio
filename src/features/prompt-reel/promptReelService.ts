import { runGeminiStructured } from "../../ai/GeminiService";
import { AICopilot } from "../../ai/copilot/AICopilot";
import { reelPlanSchema } from "../../ai/schemas";
import { resolveGeminiConfig } from "../../config";
import { ContextEngine, MemoryEngine } from "../../core/brain";
import {
  BrainClip,
  BrainSequenceContext,
  CameraClipAnalysis,
  ClipTechnicalScore,
  EmotionClipAnalysis,
  FaceCluster,
  MusicAnalysisResult,
  WeddingSegment
} from "../../core/brain/types";
import { PremiereBridge } from "../../premiere/PremiereBridge";
import { loggerService } from "../../services/loggerService";
import { TimelineClip } from "../../types/Timeline";
import { AUTO_EDIT_TEMPLATES, parseDurationSeconds } from "../auto-edit/templates";
import { listCachedMusicAnalyses } from "../music-ai/musicAnalysisCache";
import {
  analyzeClipIntelligence,
  analyzeEmotions,
  analyzeWeddingSegments
} from "../perception/perceptionAnalyzers";
import { AnalysisProgressInput } from "../perception/useSequenceAnalysis";
import {
  PromptReelAnalysisStatus,
  ReelPlan,
  ReelPlanClip,
  ReelSelectionMode
} from "./types";

const copilot = new AICopilot();
const memory = new MemoryEngine();
const contextEngine = new ContextEngine();
const bridge = new PremiereBridge();
const DEFAULT_TARGET_SECONDS = 60;
const STANDARD_MIN_CLIP_DURATION_SECONDS = 1.2;
const RELAXED_MIN_CLIP_DURATION_SECONDS = 0.5;
const FLAT_DURATION_EPSILON_SECONDS = 0.15;
const FLAT_DURATION_RATIO = 0.8;

interface WeddingAnalysisResult {
  segments: WeddingSegment[];
  source: string;
}

interface EmotionAnalysisResult {
  clips: EmotionClipAnalysis[];
  source: string;
}

interface ClipIntelligenceAnalysisResult {
  clips: ClipTechnicalScore[];
  formula: string;
  source: string;
}

interface CachedSequenceAnalysis {
  wedding: WeddingAnalysisResult | null;
  face: { clusters: FaceCluster[] } | null;
  emotion: EmotionAnalysisResult | null;
  camera: { clips: CameraClipAnalysis[] } | null;
  intelligence: ClipIntelligenceAnalysisResult | null;
  music: MusicAnalysisResult | null;
  musicCacheCount: number;
}

interface PromptReelSource {
  sequenceContext: BrainSequenceContext;
  clips: BrainClip[];
  mode: ReelSelectionMode;
}

interface CandidateClip extends BrainClip {
  mediaPath?: string;
  weddingLabels: string[];
  faceRoles: string[];
  emotionTags: string[];
  shotType: string;
  technicalScore: number;
  musicEnergy: number;
  selectionScore: number;
}

interface LocalPromptIntent {
  targetDurationSeconds: number;
  templateName: string;
  summary: string;
  focusTags: string[];
  promptTags: string[];
  energetic: boolean;
  emotional: boolean;
  familyFocus: boolean;
  genericTemplateOnly: boolean;
}

interface GeneratedReelPlanShape {
  title: string;
  templateName: string;
  intentSummary: string;
  targetDurationSeconds: number;
  clips: Array<{
    clipId: string;
    durationSeconds: number;
    reason: string;
    emotionWeight: number;
    musicEnergyWeight: number;
    shotWeight: number;
  }>;
  notes: string[];
}

export async function inspectPromptReelAnalysis({
  useSelectedClips,
  musicFileHash
}: {
  useSelectedClips: boolean;
  musicFileHash?: string;
}): Promise<PromptReelAnalysisStatus> {
  const source = await readPromptReelSource(useSelectedClips);
  return buildAnalysisStatus(source, readCachedAnalysis(source.sequenceContext.sequenceKey, musicFileHash));
}

export async function analyzePromptReelSelection({
  useSelectedClips,
  onProgress
}: {
  useSelectedClips: boolean;
  onProgress?: (progress: { label: string; completed: number; total: number; percent: number }) => void;
}): Promise<PromptReelAnalysisStatus> {
  const source = await readPromptReelSource(useSelectedClips);
  const videoClips = getVideoClips(source.clips);

  if (videoClips.length === 0) {
    throw new Error("No video clips are available for Prompt Reel analysis.");
  }

  const analysisContext: BrainSequenceContext = {
    ...source.sequenceContext,
    selectedClips: videoClips
  };
  const existing = readCachedAnalysis(source.sequenceContext.sequenceKey);
  const total = 3;
  const scope = source.sequenceContext.sequenceKey;

  onProgress?.({ label: "Starting Wedding AI analysis...", completed: 0, total, percent: 0 });
  const wedding = await forcePromptReelAnalysis(
    "wedding-ai:analysis",
    `wedding-ai:${scope}`,
    analysisContext,
    analyzeWeddingSegments,
    createAnalysisProgressReporter("Wedding AI", 0, total, onProgress)
  );
  memory.setAnalysis(`wedding-ai:${scope}`, "result", mergeWeddingAnalysis(existing.wedding, wedding));

  onProgress?.({ label: "Starting Emotion AI analysis...", completed: 1, total, percent: 34 });
  const emotion = await forcePromptReelAnalysis(
    "emotion-ai:analysis",
    `emotion-ai:${scope}`,
    analysisContext,
    analyzeEmotions,
    createAnalysisProgressReporter("Emotion AI", 1, total, onProgress)
  );
  memory.setAnalysis(`emotion-ai:${scope}`, "result", mergeEmotionAnalysis(existing.emotion, emotion));

  onProgress?.({ label: "Starting Clip Intelligence analysis...", completed: 2, total, percent: 67 });
  const intelligence = await forcePromptReelAnalysis(
    "clip-intelligence:analysis",
    `clip-intelligence:${scope}`,
    analysisContext,
    analyzeClipIntelligence,
    createAnalysisProgressReporter("Clip Intelligence", 2, total, onProgress)
  );
  memory.setAnalysis(
    `clip-intelligence:${scope}`,
    "result",
    mergeClipIntelligenceAnalysis(existing.intelligence, intelligence)
  );

  const status = await inspectPromptReelAnalysis({ useSelectedClips });
  onProgress?.({ label: "Prompt Reel analysis complete.", completed: total, total, percent: 100 });
  loggerService.log(
    `[Prompt Reel] Core analysis completed for ${status.analyzedClipCount}/${status.clipCount} active video clips.`,
    "success"
  );
  return status;
}

export async function generatePromptReelPlan({
  prompt,
  useSelectedClips,
  skipMemory = false,
  musicFileHash
}: {
  prompt: string;
  useSelectedClips: boolean;
  skipMemory?: boolean;
  musicFileHash?: string;
}): Promise<{
  plan: ReelPlan;
  sequenceContext: BrainSequenceContext;
}> {
  const source = await readPromptReelSource(useSelectedClips);
  const analysis = readCachedAnalysis(source.sequenceContext.sequenceKey, musicFileHash);
  const intent = parsePromptIntent(prompt);
  const candidates = buildCandidates(source.clips, analysis, source.sequenceContext, intent);

  if (candidates.length === 0) {
    throw new Error("No video clips were available to plan a reel.");
  }

  const clipSignature = hashText(candidates.map((clip) => clip.id).join("|"));
  const analysisSignature = hashText(buildAnalysisSignature(candidates));
  const memoryScopeKey = `prompt-reel:${source.sequenceContext.sequenceKey}:${source.mode}:${hashText(prompt)}:${clipSignature}:${analysisSignature}`;
  const hasGeminiKey = Boolean(resolveGeminiConfig().apiKey);

  const resolved = await copilot.resolve<GeneratedReelPlanShape>({
    intent: "prompt-reel:generate",
    context: {
      prompt,
      mode: source.mode,
      intent,
      candidates,
      sequenceContext: source.sequenceContext,
      analysisSummary: summarizeAnalysis(analysis)
    },
    memoryScopeKey,
    memoryCacheKey: "result",
    skipMemory,
    localResolver: async (_snapshot, rawContext) => {
      const ctx = rawContext as {
        prompt: string;
        mode: ReelSelectionMode;
        intent: LocalPromptIntent;
        candidates: CandidateClip[];
      };

      if (!hasGeminiKey || ctx.intent.genericTemplateOnly) {
        return buildLocalPlan(ctx.mode, ctx.intent, ctx.candidates, analysis.music);
      }

      return null;
    },
    geminiResolver: async (_snapshot, rawContext) => {
      const ctx = rawContext as {
        prompt: string;
        mode: ReelSelectionMode;
        intent: LocalPromptIntent;
        candidates: CandidateClip[];
      };

      return runGeminiStructured<GeneratedReelPlanShape>(
        buildGeminiPrompt(ctx.prompt, ctx.mode, ctx.intent, ctx.candidates, analysis.music),
        reelPlanSchema
      );
    }
  });

  const plan = hydratePlan(resolved.value, candidates, resolved.path, source.mode);

  if (resolved.path === "gemini" || resolved.path === "cache") {
    const durationQualityWarning = findFlatGeminiDurationWarning(plan, candidates, intent);

    if (durationQualityWarning) {
      plan.durationQualityWarning = durationQualityWarning;
      loggerService.log(`[Prompt Reel] ${durationQualityWarning}`, "warn");
    }
  }

  return {
    sequenceContext: source.sequenceContext,
    plan
  };
}

async function readPromptReelSource(useSelectedClips: boolean): Promise<PromptReelSource> {
  const sequenceContext = await contextEngine.readSequenceContext();

  if (!sequenceContext) {
    throw new Error("Open an active Premiere sequence before generating a prompt reel.");
  }

  const hasSelection = useSelectedClips && sequenceContext.selectedClips.length > 0;
  const chosenClips = hasSelection ? sequenceContext.selectedClips : await readAllSequenceClips();
  const mode: ReelSelectionMode = hasSelection
    ? "selected"
    : useSelectedClips
      ? "sequence-fallback"
      : "sequence";

  if (chosenClips.length === 0) {
    throw new Error("No timeline clips were available to plan a reel.");
  }

  const inOutClips = applyInOutRange(chosenClips, sequenceContext.inPoint, sequenceContext.outPoint);

  return {
    sequenceContext,
    clips: inOutClips.length > 0 ? inOutClips : chosenClips,
    mode
  };
}

async function forcePromptReelAnalysis<T>(
  intent: string,
  memoryScopeKey: string,
  context: BrainSequenceContext,
  analyze: (
    nextContext: BrainSequenceContext,
    onProgress: (progress: AnalysisProgressInput) => void
  ) => Promise<T>,
  onProgress: (progress: AnalysisProgressInput) => void
) {
  const resolved = await copilot.resolve<T>({
    intent,
    context,
    memoryScopeKey,
    memoryCacheKey: "result",
    skipMemory: true,
    geminiResolver: async () => analyze(context, onProgress)
  });

  return resolved.value;
}

function createAnalysisProgressReporter(
  moduleLabel: string,
  moduleIndex: number,
  totalModules: number,
  onProgress?: (progress: { label: string; completed: number; total: number; percent: number }) => void
) {
  return (progress: AnalysisProgressInput) => {
    if (!onProgress) {
      return;
    }

    const currentPercent = normalizeAnalysisPercent(progress);
    onProgress({
      label: `${moduleLabel}: ${typeof progress === "string" ? progress : progress.label}`,
      completed: Math.min(totalModules, moduleIndex + Math.round(currentPercent / 100)),
      total: totalModules,
      percent: Math.round(((moduleIndex + currentPercent / 100) / totalModules) * 100)
    });
  };
}

function normalizeAnalysisPercent(progress: AnalysisProgressInput) {
  if (typeof progress === "string") {
    return 0;
  }

  if (progress.percent !== undefined) {
    return Math.max(0, Math.min(100, progress.percent));
  }

  const total = Math.max(1, progress.total ?? 1);
  return Math.round((Math.max(0, progress.completed ?? 0) / total) * 100);
}

function mergeWeddingAnalysis(
  existing: WeddingAnalysisResult | null,
  fresh: WeddingAnalysisResult
): WeddingAnalysisResult {
  return {
    ...fresh,
    segments: mergeAnalysisEntries(
      existing?.segments ?? [],
      fresh.segments,
      (segment) => `${canonicalClipId(segment.id)}:${segment.label}:${segment.start.toFixed(3)}:${segment.end.toFixed(3)}`
    ).sort((left, right) => left.start - right.start)
  };
}

function mergeEmotionAnalysis(
  existing: EmotionAnalysisResult | null,
  fresh: EmotionAnalysisResult
): EmotionAnalysisResult {
  return {
    ...fresh,
    clips: mergeAnalysisEntries(existing?.clips ?? [], fresh.clips, (clip) => canonicalClipId(clip.clipId))
  };
}

function mergeClipIntelligenceAnalysis(
  existing: ClipIntelligenceAnalysisResult | null,
  fresh: ClipIntelligenceAnalysisResult
): ClipIntelligenceAnalysisResult {
  return {
    ...fresh,
    clips: mergeAnalysisEntries(existing?.clips ?? [], fresh.clips, (clip) => canonicalClipId(clip.clipId)).sort(
      (left, right) => right.aiRating - left.aiRating
    )
  };
}

function mergeAnalysisEntries<T>(existing: T[], fresh: T[], identity: (entry: T) => string) {
  const merged = new Map<string, T>();

  for (const entry of existing) {
    merged.set(identity(entry), entry);
  }

  for (const entry of fresh) {
    merged.set(identity(entry), entry);
  }

  return [...merged.values()];
}

function buildAnalysisStatus(source: PromptReelSource, analysis: CachedSequenceAnalysis): PromptReelAnalysisStatus {
  const clips = getVideoClips(source.clips);
  const weddingClipCount = clips.filter((clip) => hasWeddingAnalysis(clip, analysis)).length;
  const emotionClipCount = clips.filter((clip) => hasEmotionAnalysis(clip, analysis)).length;
  const clipIntelligenceClipCount = clips.filter((clip) => hasClipIntelligenceAnalysis(clip, analysis)).length;
  const analyzedClipCount = clips.filter(
    (clip) =>
      hasWeddingAnalysis(clip, analysis) ||
      hasEmotionAnalysis(clip, analysis) ||
      hasClipIntelligenceAnalysis(clip, analysis)
  ).length;
  const unanalysedClipCount = clips.length - analyzedClipCount;
  const coverageRatio = clips.length > 0 ? analyzedClipCount / clips.length : 0;
  const needsAnalysis = clips.length > 0 && unanalysedClipCount / clips.length >= 0.8;

  return {
    selectionMode: source.mode,
    clipCount: clips.length,
    analyzedClipCount,
    unanalysedClipCount,
    coverageRatio,
    weddingClipCount,
    emotionClipCount,
    clipIntelligenceClipCount,
    musicStatus:
      analysis.music !== null ? "available" : analysis.musicCacheCount > 1 ? "ambiguous" : "missing",
    needsAnalysis,
    message: needsAnalysis
      ? "No analysis found for these clips yet — results will be generic. Run Wedding AI / Emotion AI first for better clip selection."
      : null
  };
}

function getVideoClips(clips: BrainClip[]) {
  return clips.filter((clip) => clip.mediaType !== "audio" && clip.type !== "audio");
}

function hasWeddingAnalysis(clip: BrainClip, analysis: CachedSequenceAnalysis) {
  return (analysis.wedding?.segments ?? []).some(
    (segment) => clipMatchesId(clip, segment.id) || overlapsSegment(clip, segment)
  );
}

function hasEmotionAnalysis(clip: BrainClip, analysis: CachedSequenceAnalysis) {
  return (analysis.emotion?.clips ?? []).some((entry) => clipMatchesId(clip, entry.clipId));
}

function hasClipIntelligenceAnalysis(clip: BrainClip, analysis: CachedSequenceAnalysis) {
  return (analysis.intelligence?.clips ?? []).some((entry) => clipMatchesId(clip, entry.clipId));
}

function buildAnalysisSignature(candidates: CandidateClip[]) {
  return candidates
    .map((clip) =>
      [
        clip.id,
        clip.weddingLabels.join(","),
        clip.faceRoles.join(","),
        clip.emotionTags.join(","),
        clip.shotType,
        clip.technicalScore.toFixed(3),
        clip.musicEnergy.toFixed(3)
      ].join("~")
    )
    .join("|");
}

function findFlatGeminiDurationWarning(
  plan: ReelPlan,
  candidates: CandidateClip[],
  intent: LocalPromptIntent
) {
  if (plan.clips.length < 2) {
    return null;
  }

  const largestCluster = plan.clips.reduce(
    (largest, anchor) => {
      const count = plan.clips.filter(
        (clip) => Math.abs(clip.durationSeconds - anchor.durationSeconds) <= FLAT_DURATION_EPSILON_SECONDS
      ).length;

      return count > largest.count ? { count, duration: anchor.durationSeconds } : largest;
    },
    { count: 0, duration: 0 }
  );
  const flatRatio = largestCluster.count / plan.clips.length;

  if (flatRatio < FLAT_DURATION_RATIO) {
    return null;
  }

  const candidateMap = new Map(candidates.map((clip) => [clip.id, clip]));
  const expectedWeights = plan.clips
    .map((clip) => candidateMap.get(clip.clipId))
    .filter((clip): clip is CandidateClip => clip !== undefined)
    .map((clip) => deriveWeights(clip, intent));
  const variedSignals = getVariedWeightSignals(expectedWeights);

  if (variedSignals.length === 0) {
    return null;
  }

  return `Gemini reel plan looks suspiciously flat: ${largestCluster.count}/${plan.clips.length} clips (${Math.round(
    flatRatio * 100
  )}%) are within ${FLAT_DURATION_EPSILON_SECONDS.toFixed(2)}s of ${largestCluster.duration.toFixed(
    2
  )}s despite varying ${variedSignals.join(", ")} inputs.`;
}

function getVariedWeightSignals(
  weights: Array<{ emotionWeight: number; musicEnergyWeight: number; shotWeight: number }>
) {
  const signals: Array<[string, Array<number>]> = [
    ["emotion", weights.map((weight) => weight.emotionWeight)],
    ["music energy", weights.map((weight) => weight.musicEnergyWeight)],
    ["shot type", weights.map((weight) => weight.shotWeight)]
  ];

  return signals
    .filter(([, values]) => values.length > 1 && Math.max(...values) - Math.min(...values) >= 0.1)
    .map(([label]) => label);
}

function buildGeminiPrompt(
  prompt: string,
  mode: ReelSelectionMode,
  intent: LocalPromptIntent,
  candidates: CandidateClip[],
  music: MusicAnalysisResult | null
) {
  return [
    "Create a Premiere reel plan from the user prompt and candidate clip metadata.",
    `User prompt: ${prompt}`,
    `Selection mode: ${mode}`,
    `Target duration: ${intent.targetDurationSeconds} seconds.`,
    `Template bias: ${intent.templateName}.`,
    "Rules:",
    "- Do not invent clip ids. Use only the candidate clip ids below.",
    "- Include however many clips fit the target duration and prompt intent. There is no fixed clip-count cap.",
    "- Each clip must include a short, specific reason that references prompt intent or clip signals.",
    "- Each clip duration must vary by emotionWeight + musicEnergyWeight + shotWeight. Do not use a flat duration for every clip.",
    "- Favor the user's requested moments such as bride entry, varmala, family, reactions, dance, emotional beats, or close-ups when present.",
    music
      ? "Music AI cache is available. You may use the provided musicEnergy values."
      : "No reliable Music AI song binding is available for this sequence. Use musicEnergyWeight=0 when not justified.",
    "",
    "Candidate clips:",
    ...candidates.map((clip, index) =>
      [
        `${index + 1}. clipId=${clip.id}`,
        `name=${clip.name}`,
        `start=${clip.start.toFixed(2)} end=${clip.end.toFixed(2)} duration=${clip.duration.toFixed(2)}`,
        `wedding=${clip.weddingLabels.join(",") || "none"}`,
        `faces=${clip.faceRoles.join(",") || "none"}`,
        `emotions=${clip.emotionTags.join(",") || "none"}`,
        `shotType=${clip.shotType}`,
        `technicalScore=${clip.technicalScore.toFixed(2)}`,
        `musicEnergy=${clip.musicEnergy.toFixed(2)}`,
        `selectionScore=${clip.selectionScore.toFixed(2)}`
      ].join(" | ")
    )
  ].join("\n");
}

function buildLocalPlan(
  mode: ReelSelectionMode,
  intent: LocalPromptIntent,
  candidates: CandidateClip[],
  music: MusicAnalysisResult | null
): GeneratedReelPlanShape {
  const sorted = [...candidates].sort((left, right) => right.selectionScore - left.selectionScore);
  const standardClips = selectLocalPlanClips(sorted, intent, STANDARD_MIN_CLIP_DURATION_SECONDS, false);
  const usedRelaxedRetry = standardClips.length === 0;
  const clips = usedRelaxedRetry
    ? selectLocalPlanClips(sorted, intent, RELAXED_MIN_CLIP_DURATION_SECONDS, true)
    : standardClips;

  if (clips.length === 0 && sorted[0]) {
    const weights = deriveWeights(sorted[0], intent);
    const fallbackDuration = deriveLastResortDuration(sorted[0], intent, sorted.length);
    clips.push({
      clipId: sorted[0].id,
      durationSeconds: fallbackDuration,
      reason: `${buildReason(sorted[0], intent, weights)}; used a target-derived last-resort duration`,
      emotionWeight: weights.emotionWeight,
      musicEnergyWeight: weights.musicEnergyWeight,
      shotWeight: weights.shotWeight
    });
  }

  return {
    title: `${intent.templateName} Prompt Reel`,
    templateName: intent.templateName,
    intentSummary: `${intent.summary} Planned from ${mode === "selected" ? "selected clips" : "sequence clips"} using cached analysis and prompt heuristics.`,
    targetDurationSeconds: intent.targetDurationSeconds,
    clips,
    notes: [
      `Prompt keywords: ${intent.promptTags.join(", ") || "generic reel request"}.`,
      music
        ? "Duration weighting includes a cached Music AI energy proxy."
        : "No bound Music AI song analysis was available, so music energy weight may remain zero.",
      ...(usedRelaxedRetry
        ? ["No standard-duration clip fit the target, so Prompt Reel retried with short-duration pacing before any fallback."]
        : [])
    ]
  };
}

function selectLocalPlanClips(
  sorted: CandidateClip[],
  intent: LocalPromptIntent,
  minimumDuration: number,
  fitToRemainingBudget: boolean
): GeneratedReelPlanShape["clips"] {
  const clips: GeneratedReelPlanShape["clips"] = [];
  let total = 0;

  for (const clip of sorted) {
    const weights = deriveWeights(clip, intent);
    const weightedDuration = weightedClipDuration(weights);
    const remainingBudget = intent.targetDurationSeconds + 0.75 - total;
    const requestedDuration = fitToRemainingBudget ? Math.min(weightedDuration, remainingBudget) : weightedDuration;
    const durationSeconds = clampDuration(clip.duration, requestedDuration, minimumDuration);

    if (total + durationSeconds > intent.targetDurationSeconds + 0.75) {
      continue;
    }

    clips.push({
      clipId: clip.id,
      durationSeconds,
      reason: buildReason(clip, intent, weights),
      emotionWeight: weights.emotionWeight,
      musicEnergyWeight: weights.musicEnergyWeight,
      shotWeight: weights.shotWeight
    });
    total += durationSeconds;
  }

  return clips;
}

function weightedClipDuration(weights: {
  emotionWeight: number;
  musicEnergyWeight: number;
  shotWeight: number;
}) {
  return (
    STANDARD_MIN_CLIP_DURATION_SECONDS +
    weights.emotionWeight * 2.4 +
    weights.musicEnergyWeight * 1.6 +
    weights.shotWeight * 1.8
  );
}

function deriveLastResortDuration(clip: CandidateClip, intent: LocalPromptIntent, candidateCount: number) {
  const expectedClipCount = Math.max(1, Math.min(candidateCount, Math.ceil(intent.targetDurationSeconds / 2.5)));
  const targetDerivedDuration = intent.targetDurationSeconds / expectedClipCount;
  return clampDuration(clip.duration, targetDerivedDuration, RELAXED_MIN_CLIP_DURATION_SECONDS);
}

function hydratePlan(
  generated: GeneratedReelPlanShape,
  candidates: CandidateClip[],
  resolutionPath: ReelPlan["resolutionPath"],
  selectionMode: ReelSelectionMode
): ReelPlan {
  const candidateMap = new Map(candidates.map((clip) => [clip.id, clip]));
  const clips: ReelPlanClip[] = [];

  for (const item of generated.clips) {
    const clip = candidateMap.get(item.clipId);

    if (!clip) {
      continue;
    }

    clips.push({
      clipId: clip.id,
      clipName: clip.name,
      start: clip.start,
      end: clip.end,
      sourceDuration: clip.duration,
      durationSeconds: clampDuration(clip.duration, item.durationSeconds),
      track: clip.track,
      mediaType: clip.mediaType,
      mediaPath: clip.mediaPath,
      projectItemId: clip.projectItemId,
      shotType: clip.shotType,
      emotionWeight: normalizeWeight(item.emotionWeight),
      musicEnergyWeight: normalizeWeight(item.musicEnergyWeight),
      shotWeight: normalizeWeight(item.shotWeight),
      selectionScore: clip.selectionScore,
      reason: item.reason.trim(),
      promptTags: [...clip.weddingLabels, ...clip.emotionTags, ...clip.faceRoles].filter(Boolean)
    });
  }

  const totalDurationSeconds = clips.reduce((sum, clip) => sum + clip.durationSeconds, 0);

  return {
    title: generated.title,
    templateName: generated.templateName,
    intentSummary: generated.intentSummary,
    targetDurationSeconds: generated.targetDurationSeconds,
    totalDurationSeconds,
    selectionMode,
    resolutionPath,
    clips,
    notes: generated.notes
  };
}

export function getPromptReelMusicOptions() {
  return listCachedMusicAnalyses();
}

function readCachedAnalysis(sequenceKey: string, musicFileHash?: string): CachedSequenceAnalysis {
  const musicEntries = listCachedMusicAnalyses();
  const music = musicFileHash
    ? musicEntries.find((entry) => entry.fileHash === musicFileHash) ?? null
    : musicEntries.length === 1
      ? musicEntries[0]
      : null;

  return {
    wedding: memory.getAnalysis<WeddingAnalysisResult>(`wedding-ai:${sequenceKey}`, "result"),
    face: memory.getAnalysis<{ clusters: FaceCluster[] }>(`face-ai:${sequenceKey}`, "result"),
    emotion: memory.getAnalysis<EmotionAnalysisResult>(`emotion-ai:${sequenceKey}`, "result"),
    camera: memory.getAnalysis<{ clips: CameraClipAnalysis[] }>(`camera-ai:${sequenceKey}`, "result"),
    intelligence: memory.getAnalysis<ClipIntelligenceAnalysisResult>(`clip-intelligence:${sequenceKey}`, "result"),
    music,
    musicCacheCount: musicEntries.length
  };
}

function summarizeAnalysis(analysis: CachedSequenceAnalysis) {
  return {
    weddingSegments: analysis.wedding?.segments.length ?? 0,
    faceClusters: analysis.face?.clusters.length ?? 0,
    emotionClips: analysis.emotion?.clips.length ?? 0,
    cameraClips: analysis.camera?.clips.length ?? 0,
    clipScores: analysis.intelligence?.clips.length ?? 0,
    musicAnalyzed: Boolean(analysis.music)
  };
}

function buildCandidates(
  clips: BrainClip[],
  analysis: CachedSequenceAnalysis,
  context: BrainSequenceContext,
  intent: LocalPromptIntent
): CandidateClip[] {
  return clips
    .filter((clip) => clip.mediaType !== "audio" && clip.type !== "audio")
    .map((clip) => {
      const weddingLabels = (analysis.wedding?.segments ?? [])
        .filter((segment) => clipMatchesId(clip, segment.id) || overlapsSegment(clip, segment))
        .map((segment) => segment.label);
      const faceRoles = (analysis.face?.clusters ?? [])
        .filter((cluster) => cluster.clipIds.some((clipId) => clipMatchesId(clip, clipId)))
        .flatMap((cluster) => [cluster.role, cluster.label]);
      const emotionTags =
        analysis.emotion?.clips.find((entry) => clipMatchesId(clip, entry.clipId))?.emotions ?? [];
      const shotType =
        analysis.camera?.clips.find((entry) => clipMatchesId(clip, entry.clipId))?.shotType ?? inferShotTypeFromName(clip.name);
      const technicalScore =
        normalizeWeight(
          (analysis.intelligence?.clips.find((entry) => clipMatchesId(clip, entry.clipId))?.aiRating ?? 55) / 100
        );
      const musicEnergy = resolveMusicEnergy(analysis.music, clip, context.duration);
      const selectionScore = scoreClip({
        clip,
        weddingLabels,
        faceRoles,
        emotionTags,
        shotType,
        technicalScore,
        musicEnergy,
        intent
      });

      return {
        ...clip,
        weddingLabels,
        faceRoles,
        emotionTags,
        shotType,
        technicalScore,
        musicEnergy,
        selectionScore
      };
    });
}

function parsePromptIntent(prompt: string): LocalPromptIntent {
  const text = prompt.toLowerCase();
  const durationMatch =
    text.match(/(\d+)\s*(?:sec|second|seconds|s)\b/) ??
    text.match(/(\d+)\s*(?:min|minute|minutes|m)\b/);
  const requestedSeconds = durationMatch
    ? durationMatch[0].includes("min")
      ? Number(durationMatch[1]) * 60
      : Number(durationMatch[1])
    : null;
  const promptTags = extractPromptTags(text);
  const energetic = /(mast|energetic|dance|party|sangeet|fast|hype|celebrat)/.test(text);
  const emotional = /(emotional|family|reaction|cry|hug|vidaai|sentimental|soft)/.test(text);
  const familyFocus = /(family|parents|relatives|guests)/.test(text);
  const templateName = matchTemplate(text, requestedSeconds);
  const genericTemplateOnly =
    promptTags.length === 0 &&
    /(make|bana|create).*(reel|short|highlight|teaser)|\b(reel|highlight|shorts|teaser)\b/.test(text);

  return {
    targetDurationSeconds:
      requestedSeconds ??
      parseDurationSeconds(resolveTemplate(templateName).targetDuration) ??
      DEFAULT_TARGET_SECONDS,
    templateName,
    summary: buildIntentSummary(promptTags, requestedSeconds, templateName, energetic, emotional, familyFocus),
    focusTags: promptTags,
    promptTags,
    energetic,
    emotional,
    familyFocus,
    genericTemplateOnly
  };
}

function buildIntentSummary(
  promptTags: string[],
  requestedSeconds: number | null,
  templateName: string,
  energetic: boolean,
  emotional: boolean,
  familyFocus: boolean
) {
  const parts = [`Template ${templateName}`];
  if (requestedSeconds) {
    parts.push(`${requestedSeconds}s target`);
  }
  if (promptTags.length > 0) {
    parts.push(`focus on ${promptTags.join(", ")}`);
  }
  if (energetic) {
    parts.push("energetic pacing");
  }
  if (emotional) {
    parts.push("emotion-led pacing");
  }
  if (familyFocus) {
    parts.push("family moments");
  }
  return parts.join(" • ");
}

function matchTemplate(text: string, requestedSeconds: number | null) {
  if (/shorts?\b/.test(text)) {
    return "Shorts";
  }
  if (/teaser/.test(text)) {
    return "Teaser";
  }
  if (/highlight/.test(text)) {
    return "Highlight";
  }
  if (/trailer/.test(text)) {
    return "Trailer";
  }
  if (/documentary/.test(text)) {
    return "Documentary";
  }
  if (requestedSeconds !== null && requestedSeconds <= 35) {
    return "Shorts";
  }
  if (requestedSeconds !== null && requestedSeconds <= 50) {
    return "Teaser";
  }
  if (requestedSeconds !== null && requestedSeconds <= 75) {
    return "Reel";
  }
  return "Reel";
}

function resolveTemplate(name: string) {
  return AUTO_EDIT_TEMPLATES.find((template) => template.name === name) ?? AUTO_EDIT_TEMPLATES[0];
}

function extractPromptTags(text: string) {
  const tags: string[] = [];
  const map: Array<[RegExp, string]> = [
    [/(bride entry|entry shot)/, "Bride Entry"],
    [/(varmala|jaimala)/, "Varmala"],
    [/(pheras|phere)/, "Pheras"],
    [/(vidaai|vidai)/, "Vidaai"],
    [/(family|parents|mother|father)/, "family"],
    [/(reaction|smile|laugh|cry|hug)/, "reaction"],
    [/(dance|sangeet|party)/, "dance"],
    [/(groom)/, "groom"],
    [/(bride)/, "bride"],
    [/(close[- ]?up|detail)/, "detail"],
    [/(drone|wide)/, "wide"]
  ];

  for (const [pattern, label] of map) {
    if (pattern.test(text)) {
      tags.push(label);
    }
  }

  return Array.from(new Set(tags));
}

function scoreClip({
  clip,
  weddingLabels,
  faceRoles,
  emotionTags,
  shotType,
  technicalScore,
  musicEnergy,
  intent
}: {
  clip: BrainClip;
  weddingLabels: string[];
  faceRoles: string[];
  emotionTags: string[];
  shotType: string;
  technicalScore: number;
  musicEnergy: number;
  intent: LocalPromptIntent;
}) {
  let score = technicalScore * 0.22 + normalizeWeight(clip.duration / Math.max(intent.targetDurationSeconds, 1)) * 0.08;

  const haystack = [
    clip.name.toLowerCase(),
    weddingLabels.join(" ").toLowerCase(),
    faceRoles.join(" ").toLowerCase(),
    emotionTags.join(" ").toLowerCase(),
    shotType.toLowerCase()
  ].join(" ");

  for (const tag of intent.focusTags) {
    if (haystack.includes(tag.toLowerCase())) {
      score += 0.22;
    }
  }

  if (intent.emotional && emotionTags.some((tag) => ["cry", "hug", "reaction", "smile"].includes(tag))) {
    score += 0.18;
  }

  if (intent.energetic && (emotionTags.includes("dance") || /wide|drone|gimbal/.test(shotType))) {
    score += 0.16;
  }

  if (intent.familyFocus && faceRoles.some((role) => /family|guest/.test(role))) {
    score += 0.14;
  }

  if (musicEnergy > 0.65 && intent.energetic) {
    score += 0.1;
  }

  if (weddingLabels.length === 0 && faceRoles.length === 0 && emotionTags.length === 0) {
    score -= 0.08;
  }

  return score;
}

function deriveWeights(clip: CandidateClip, intent: LocalPromptIntent) {
  const emotionWeight = normalizeWeight(
    clip.emotionTags.length > 0
      ? clip.emotionTags.some((tag) => intent.emotional && ["cry", "hug", "reaction", "smile"].includes(tag))
        ? 0.95
        : clip.emotionTags.includes("dance")
          ? 0.8
          : 0.62
      : 0.35
  );
  const musicEnergyWeight = normalizeWeight(intent.energetic ? clip.musicEnergy : clip.musicEnergy * 0.7);
  const shotWeight = normalizeWeight(
    /close|detail/.test(clip.shotType) && (intent.emotional || intent.focusTags.includes("detail"))
      ? 0.92
      : /wide|drone/.test(clip.shotType) && intent.energetic
        ? 0.84
        : /gimbal|handheld/.test(clip.shotType)
          ? 0.66
          : 0.48
  );

  return { emotionWeight, musicEnergyWeight, shotWeight };
}

function buildReason(
  clip: CandidateClip,
  intent: LocalPromptIntent,
  weights: { emotionWeight: number; musicEnergyWeight: number; shotWeight: number }
) {
  const reasons: string[] = [];

  if (intent.focusTags.some((tag) => clip.weddingLabels.join(" ").toLowerCase().includes(tag.toLowerCase()))) {
    reasons.push(`matches ${clip.weddingLabels.join("/")}`);
  }
  if (intent.familyFocus && clip.faceRoles.some((role) => /family|guest/.test(role))) {
    reasons.push("supports family focus");
  }
  if (intent.emotional && clip.emotionTags.length > 0) {
    reasons.push(`emotional tags ${clip.emotionTags.join(", ")}`);
  }
  if (intent.energetic && clip.musicEnergy > 0.5) {
    reasons.push(`tracks strong music energy (${clip.musicEnergy.toFixed(2)})`);
  }
  reasons.push(`shot type ${clip.shotType}`);
  reasons.push(
    `duration weighted by emotion ${weights.emotionWeight.toFixed(2)}, music ${weights.musicEnergyWeight.toFixed(2)}, shot ${weights.shotWeight.toFixed(2)}`
  );

  return reasons.join("; ");
}

function resolveMusicEnergy(
  music: MusicAnalysisResult | null,
  clip: BrainClip,
  sequenceDuration: number
) {
  if (!music || music.energyCurve.length === 0 || sequenceDuration <= 0) {
    return 0;
  }

  const midpoint = clip.start + clip.duration / 2;
  const index = Math.max(
    0,
    Math.min(
      music.energyCurve.length - 1,
      Math.floor((midpoint / sequenceDuration) * music.energyCurve.length)
    )
  );

  return normalizeWeight(music.energyCurve[index] ?? 0);
}

async function readAllSequenceClips(): Promise<BrainClip[]> {
  const timeline = await bridge.readTimeline();

  if (!timeline) {
    return [];
  }

  const clips = [...timeline.videoTracks, ...timeline.audioTracks].flatMap((track) =>
    track.clips.map((clip, index) => toBrainClip(track.type, clip, index))
  );

  return clips;
}

function toBrainClip(trackType: "video" | "audio", clip: TimelineClip, index: number): BrainClip {
  return {
    id: buildClipId(clip.name, clip.start, clip.trackIndex, index),
    name: clip.name,
    start: clip.start,
    end: clip.end,
    duration: clip.duration,
    track: clip.trackIndex,
    mediaType: trackType,
    type: trackType,
    projectItemId: clip.projectItemId
  };
}

function applyInOutRange(clips: BrainClip[], inPoint: number, outPoint: number) {
  if (outPoint <= inPoint) {
    return clips;
  }

  return clips.filter((clip) => clip.end >= inPoint && clip.start <= outPoint);
}

function clipMatchesId(clip: BrainClip, otherId: string) {
  return canonicalClipId(clip.id) === canonicalClipId(otherId);
}

function canonicalClipId(id: string) {
  return id.split("::").slice(0, 3).join("::");
}

function overlapsSegment(clip: BrainClip, segment: WeddingSegment) {
  return clip.end >= segment.start && clip.start <= segment.end;
}

function inferShotTypeFromName(name: string) {
  const text = name.toLowerCase();
  if (/(drone|wide)/.test(text)) {
    return "wide";
  }
  if (/(close|detail|macro)/.test(text)) {
    return "detail";
  }
  if (/(gimbal|steady)/.test(text)) {
    return "gimbal";
  }
  if (/(handheld|cam)/.test(text)) {
    return "handheld";
  }
  return "unknown";
}

function buildClipId(name: string, start: number, track: number, index: number) {
  return `${name}::${track}::${start.toFixed(3)}::${index}`;
}

function clampDuration(
  sourceDuration: number,
  requestedDuration: number,
  minimumDuration = STANDARD_MIN_CLIP_DURATION_SECONDS
) {
  const safeMinimum = Math.max(0, minimumDuration);
  const safeSourceDuration = Number.isFinite(sourceDuration) ? Math.max(0, sourceDuration) : 0;
  const maxDuration = Math.max(safeMinimum, safeSourceDuration);
  return Math.max(safeMinimum, Math.min(maxDuration, requestedDuration));
}

function normalizeWeight(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(1, value));
}

function hashText(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(16);
}
