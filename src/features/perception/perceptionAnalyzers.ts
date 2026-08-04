import {
  BrainSequenceContext,
  CameraClipAnalysis,
  ClipTechnicalScore,
  EmotionClipAnalysis,
  FaceCluster,
  MusicAnalysisResult,
  TimelineHealthReport,
  TimelineIssue,
  WeddingSegment
} from "../../core/brain/types";
import { runGemini, runGeminiVision } from "../../ai/GeminiService";
import { cameraClipsSchema, emotionClipsSchema, faceClustersSchema, weddingSegmentsSchema } from "../../ai/schemas";
import { getFrameExtractor } from "../../services/premiere/FrameExtractor";
import { buildClipPrompt, normalizeJson, runBatchedGemini, signalSourceLabel } from "./perceptionUtils";
import { AnalysisProgressInput } from "./useSequenceAnalysis";

export async function analyzeWeddingSegments(
  context: BrainSequenceContext,
  onProgress: (progress: AnalysisProgressInput) => void
) {
  const clips = context.selectedClips;

  if (clips.length === 0) {
    return {
      segments: [] as WeddingSegment[],
      source: signalSourceLabel("metadata")
    };
  }

  const results = await runBatchedGemini<WeddingSegment>({
    clips,
    batchSize: 12,
    onProgress: ({ completed, total, label }) =>
      onProgress({ completed, total, label: `${label} for Wedding AI` }),
    buildPrompt: (batch) =>
      [
        "Classify Indian wedding event segments from timeline metadata only.",
        "Return JSON array with: id, label, confidence, start, end, source.",
        "Allowed labels: Haldi, Mehndi, Sangeet, Baraat, Bride Entry, Groom Entry, Varmala, Pheras, Sindoor, Mangalsutra, Vidaai, Reception, Engagement, Ring Ceremony, Unknown.",
        buildClipPrompt(batch)
      ].join("\n\n"),
    responseSchema: weddingSegmentsSchema,
    parse: (text) =>
      normalizeJson<WeddingSegment[]>(text, []).map((item) => normalizeWeddingSegment(item))
  });

  return {
    segments: results.sort((left, right) => left.start - right.start),
    source: signalSourceLabel("metadata")
  };
}

type TimingValue =
  | number
  | string
  | {
      seconds?: number | string;
      ticks?: number | string;
      ticksNumber?: number | string;
    }
  | null
  | undefined;

function normalizeWeddingSegment(item: WeddingSegment): WeddingSegment {
  return {
    ...item,
    start: normalizeTimingValue(item.start, `${item.id}:start`),
    end: normalizeTimingValue(item.end, `${item.id}:end`),
    source: signalSourceLabel("metadata")
  };
}

function normalizeTimingValue(value: TimingValue, label: string): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = parseTimingString(value);

    if (parsed !== null) {
      logTimingNormalization(value, label, parsed);
      return parsed;
    }
  }

  if (value && typeof value === "object") {
    const seconds = parsePrimitiveNumber(value.seconds);

    if (seconds !== null) {
      logTimingNormalization(value, label, seconds);
      return seconds;
    }

    const ticksNumber = parsePrimitiveNumber(value.ticksNumber);

    if (ticksNumber !== null) {
      const normalized = ticksNumber / 254016000000;
      logTimingNormalization(value, label, normalized);
      return normalized;
    }

    const ticks = parsePrimitiveNumber(value.ticks);

    if (ticks !== null) {
      const normalized = ticks / 254016000000;
      logTimingNormalization(value, label, normalized);
      return normalized;
    }
  }

  console.warn("[RK Flow] WeddingSegment received invalid timing value.", {
    field: label,
    type: typeof value,
    value
  });
  return 0;
}

function parseTimingString(value: string): number | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const direct = Number(trimmed);
  if (Number.isFinite(direct)) {
    return direct;
  }

  if (trimmed.endsWith("s")) {
    const secondsValue = Number.parseFloat(trimmed.slice(0, -1).trim());

    if (Number.isFinite(secondsValue)) {
      return secondsValue;
    }
  }

  const parts = trimmed.split(":").map((part) => Number(part));
  if (parts.some((part) => Number.isNaN(part))) {
    return null;
  }

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }

  return null;
}

function parsePrimitiveNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function logTimingNormalization(value: TimingValue, label: string, normalized: number) {
  console.warn("[RK Flow] Normalized WeddingSegment timing.", {
    field: label,
    type: typeof value,
    value,
    normalizedSeconds: normalized
  });
}

export async function analyzeFaceClusters(
  context: BrainSequenceContext,
  onProgress: (progress: AnalysisProgressInput) => void
) {
  const clips = context.selectedClips;
  const visualSummaries = await analyzeVisualPersonBatch(context, clips, onProgress);
  const fallbackClusters = await runBatchedGemini<FaceCluster>({
    clips: visualSummaries.metadataOnly,
    batchSize: 10,
    onProgress: ({ completed, total, label }) =>
      onProgress({ completed, total, label: `${label} for Face AI metadata fallback` }),
    buildPrompt: (batch) =>
      [
        "Infer people clusters from clip metadata only. Return JSON array with: id, label, role, confidence, clipIds, emotionTags, source.",
        "Roles: bride, groom, family, guest, unknown.",
        buildClipPrompt(batch)
      ].join("\n\n"),
    responseSchema: faceClustersSchema,
    parse: (text) =>
      normalizeJson<FaceCluster[]>(text, []).map((item) => ({
        ...item,
        source: signalSourceLabel("metadata")
      }))
  });

  const clusters = [
    ...aggregateClusters(visualSummaries.visual),
    ...fallbackClusters
  ];

  return {
    clusters,
    source:
      visualSummaries.visual.length > 0
        ? "visual frame samples + metadata fallback"
        : signalSourceLabel("metadata")
  };
}

export async function analyzeEmotions(
  context: BrainSequenceContext,
  onProgress: (progress: AnalysisProgressInput) => void
) {
  const visual = await analyzeVisualEmotionBatch(context, context.selectedClips, onProgress);
  const fallback = await runBatchedGemini<EmotionClipAnalysis>({
    clips: visual.metadataOnly,
    batchSize: 12,
    onProgress: ({ completed, total, label }) =>
      onProgress({ completed, total, label: `${label} for Emotion AI metadata fallback` }),
    buildPrompt: (batch) =>
      [
        "Classify clip emotions from timeline metadata only. Multiple tags allowed.",
        "Return JSON array with: clipId, clipName, emotions, confidence, source.",
        "Emotion tags: smile, cry, laugh, hug, dance, reaction.",
        buildClipPrompt(batch)
      ].join("\n\n"),
    responseSchema: emotionClipsSchema,
    parse: (text) =>
      normalizeJson<EmotionClipAnalysis[]>(text, []).map((item) => ({
        ...item,
        source: signalSourceLabel("metadata")
      }))
  });

  const results = [...visual.visual, ...fallback];

  return {
    clips: results,
    source:
      visual.visual.length > 0
        ? "visual frame samples + metadata fallback"
        : signalSourceLabel("metadata")
  };
}

export async function analyzeCamera(
  context: BrainSequenceContext,
  onProgress: (progress: AnalysisProgressInput) => void
) {
  const visual = await analyzeVisualCameraBatch(context, context.selectedClips, onProgress);
  const fallback = await runBatchedGemini<CameraClipAnalysis>({
    clips: visual.metadataOnly,
    batchSize: 12,
    onProgress: ({ completed, total, label }) =>
      onProgress({ completed, total, label: `${label} for Camera AI metadata fallback` }),
    buildPrompt: (batch) =>
      [
        "Infer shot type and movement from clip metadata only.",
        "Return JSON array with: clipId, clipName, shotType, movement, confidence, source.",
        "Shot types: drone, gimbal, handheld, tripod, wide, close, detail.",
        "Movement: static, pan, tilt, push, pull, unknown.",
        buildClipPrompt(batch)
      ].join("\n\n"),
    responseSchema: cameraClipsSchema,
    parse: (text) =>
      normalizeJson<CameraClipAnalysis[]>(text, []).map((item) => ({
        ...item,
        source: signalSourceLabel("metadata")
      }))
  });

  const results = [...visual.visual, ...fallback];

  return {
    clips: results,
    source:
      visual.visual.length > 0
        ? "visual frame samples + metadata fallback"
        : signalSourceLabel("metadata")
  };
}

export async function analyzeClipIntelligence(
  context: BrainSequenceContext,
  onProgress: (progress: AnalysisProgressInput) => void
) {
  onProgress({
    label: "Extracting sample frames for clip intelligence...",
    completed: 0,
    total: Math.max(context.selectedClips.length, 1)
  });
  const scores = await analyzeClipTechnicalScores(context, onProgress);

  return {
    clips: scores.sort((left, right) => right.aiRating - left.aiRating),
    formula:
      "AI Rating = blur 22% + focus 22% + noise 16% + exposure 20% + white balance 20%",
    source:
      "metadata-derived fallback (frame extraction unavailable in current Premiere bridge)"
  };
}

export async function analyzeTimelineHealth(
  context: BrainSequenceContext,
  clipScores: ClipTechnicalScore[] | null,
  onProgress: (progress: AnalysisProgressInput) => void
) {
  onProgress({ label: "Computing timeline health...", completed: 0, total: 1, percent: 0 });

  const sorted = [...context.selectedClips].sort((left, right) => left.start - right.start);
  let gapSeconds = 0;
  const gaps: Array<{ start: number, end: number }> = [];

  for (let index = 1; index < sorted.length; index += 1) {
    const previous = sorted[index - 1];
    const current = sorted[index];
    const gap = current.start - previous.end;

    if (gap > 0.1) {
      gapSeconds += gap;
      gaps.push({ start: previous.end, end: current.start });
    }
  }

  const duplicates = clipScores?.filter((clip) => clip.duplicateGroup !== null).length ?? 0;
  const averageDuration =
    sorted.reduce((sum, clip) => sum + clip.duration, 0) / Math.max(sorted.length, 1);
  const variance =
    sorted.reduce((sum, clip) => sum + Math.abs(clip.duration - averageDuration), 0) /
    Math.max(sorted.length, 1);

  const score = Math.max(
    0,
    Math.round(100 - gaps.length * 8 - gapSeconds * 4 - duplicates * 5 - variance * 3)
  );

  const issues: TimelineIssue[] = [];

  if (gaps.length > 0) {
    issues.push({
      id: "gaps",
      title: "Timeline gaps detected",
      detail: `${gaps.length} gaps totaling ${gapSeconds.toFixed(1)}s`,
      metric: `${gaps.length} gaps`,
      payload: gaps,
    });
  }

  if (duplicates > 0) {
    issues.push({
      id: "duplicates",
      title: "Duplicate clip names found",
      detail: `${duplicates} clips share duplicate names or repeated placements.`,
      metric: `${duplicates} duplicate clips`
    });
  }

  issues.push({
    id: "variance",
    title: "Clip length variance",
    detail: `Average clip variance is ${variance.toFixed(2)} seconds.`,
    metric: `${variance.toFixed(2)}s variance`
  });

  return {
    score,
    formula:
      "100 - (gap count × 8) - (gap seconds × 4) - (duplicate clips × 5) - (avg clip variance × 3)",
    issues,
    source: "timeline timings + cached clip intelligence"
  } satisfies TimelineHealthReport;
}

export async function analyzeMusicFile(
  file: File,
  audioBuffer: AudioBuffer,
  onProgress: (progress: AnalysisProgressInput) => void
) {
  onProgress({ label: "Decoding waveform...", completed: 1, total: 4, percent: 25 });

  const channel = audioBuffer.getChannelData(0);
  const samplesPerChunk = Math.max(1, Math.floor(channel.length / 64));
  const energyCurve: number[] = [];

  for (let offset = 0; offset < channel.length; offset += samplesPerChunk) {
    let sum = 0;

    for (let index = offset; index < Math.min(offset + samplesPerChunk, channel.length); index += 1) {
      sum += Math.abs(channel[index]);
    }

    energyCurve.push(sum / samplesPerChunk);
  }

  const beatPositions = estimateBeats(energyCurve, audioBuffer.duration);
  const bpm = estimateBpm(beatPositions);

  onProgress({ label: "Extracted waveform energy.", completed: 2, total: 4, percent: 50 });
  onProgress({ label: "Classifying mood and genre...", completed: 3, total: 4, percent: 75 });

  const moodGenreText = await runGemini(
    [
      "Classify mood and genre from music metadata only.",
      `File name: ${file.name}`,
      `BPM: ${bpm}`,
      `Duration: ${audioBuffer.duration.toFixed(2)} seconds`,
      "Return JSON with mood and genre."
    ].join("\n"),
    { json: true }
  );

  const moodGenre = normalizeJson<{ mood?: string; genre?: string }>(moodGenreText, {});
  const sections = deriveSections(audioBuffer.duration);

  return {
    fileHash: await hashFile(file),
    fileName: file.name,
    bpm,
    beatPositions,
    energyCurve,
    sections,
    mood: moodGenre.mood ?? "Unknown",
    genre: moodGenre.genre ?? "Unknown",
    source: `${signalSourceLabel("audio")} + Gemini metadata labels`
  } satisfies MusicAnalysisResult;
}

function boundedScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function estimateBeats(energyCurve: number[], duration: number) {
  const threshold =
    energyCurve.reduce((sum, value) => sum + value, 0) / Math.max(energyCurve.length, 1);

  return energyCurve
    .map((value, index) =>
      value > threshold * 1.15 ? (index / Math.max(energyCurve.length - 1, 1)) * duration : null
    )
    .filter((value): value is number => value !== null);
}

function estimateBpm(beatPositions: number[]) {
  if (beatPositions.length < 2) {
    return 0;
  }

  const intervals: number[] = [];

  for (let index = 1; index < beatPositions.length; index += 1) {
    intervals.push(beatPositions[index] - beatPositions[index - 1]);
  }

  const average = intervals.reduce((sum, value) => sum + value, 0) / intervals.length;
  return average > 0 ? Math.round(60 / average) : 0;
}

function deriveSections(duration: number) {
  const first = duration * 0.2;
  const second = duration * 0.55;

  return [
    { id: "intro", label: "Intro", start: 0, end: first },
    { id: "chorus", label: "Chorus", start: first, end: second },
    { id: "drop", label: "Drop", start: second, end: duration }
  ];
}

async function hashFile(file: File) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest))
    .slice(0, 12)
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

async function analyzeVisualPersonBatch(
  context: BrainSequenceContext,
  clips: BrainSequenceContext["selectedClips"],
  onProgress: (progress: AnalysisProgressInput) => void
) {
  const visual: Array<{
    clipId: string;
    label: string;
    role: FaceCluster["role"];
    confidence: number;
    emotions: string[];
  }> = [];
  const metadataOnly: BrainSequenceContext["selectedClips"] = [];

  for (let index = 0; index < clips.length; index += 4) {
    const batch = clips.slice(index, index + 4);
    onProgress({
      label: `Analyzing clip ${index + 1} of ${clips.length} with visual samples for Face AI`,
      completed: Math.min(index + 1, clips.length),
      total: Math.max(clips.length, 1)
    });

    for (const clip of batch) {
      const frameExtractor = getFrameExtractor();
      const sample = await frameExtractor.extractClipSamples(context.sequenceKey, clip);
      const frames = sample.frames.filter((frame) => frame.ok && frame.base64 && frame.mimeType).slice(0, 3);

      if (frames.length === 0) {
        metadataOnly.push(clip);
        continue;
      }

      const text = await runGeminiVision(
        [
          `Clip: ${clip.name}`,
          "Identify the primary visible person cluster in these frames.",
          "Return JSON with keys: label, role, confidence, emotions.",
          "Role must be one of bride, groom, family, guest, unknown."
        ].join("\n"),
        frames.map((frame) => ({ mimeType: frame.mimeType!, base64: frame.base64! })),
        { json: true }
      );

      const parsed = normalizeJson<{
        label?: string;
        role?: FaceCluster["role"];
        confidence?: number;
        emotions?: string[];
      }>(text, {});

      visual.push({
        clipId: clip.id,
        label: parsed.label ?? clip.name,
        role: parsed.role ?? "unknown",
        confidence: parsed.confidence ?? 0.6,
        emotions: parsed.emotions ?? []
      });
    }
  }

  return { visual, metadataOnly };
}

function aggregateClusters(
  visual: Array<{
    clipId: string;
    label: string;
    role: FaceCluster["role"];
    confidence: number;
    emotions: string[];
  }>
) {
  const groups = new Map<string, FaceCluster>();

  for (const item of visual) {
    const key = `${item.role}:${item.label.toLowerCase()}`;
    const existing = groups.get(key);

    if (!existing) {
      groups.set(key, {
        id: key,
        label: item.label,
        role: item.role,
        confidence: item.confidence,
        clipIds: [item.clipId],
        emotionTags: [...item.emotions],
        source: "visual"
      });
      continue;
    }

    existing.clipIds.push(item.clipId);
    existing.confidence = Math.max(existing.confidence, item.confidence);
    existing.emotionTags = Array.from(new Set([...existing.emotionTags, ...item.emotions]));
  }

  return Array.from(groups.values());
}

async function analyzeVisualEmotionBatch(
  context: BrainSequenceContext,
  clips: BrainSequenceContext["selectedClips"],
  onProgress: (progress: AnalysisProgressInput) => void
) {
  const visual: EmotionClipAnalysis[] = [];
  const metadataOnly: BrainSequenceContext["selectedClips"] = [];

  for (let index = 0; index < clips.length; index += 4) {
    const batch = clips.slice(index, index + 4);
    onProgress({
      label: `Analyzing clip ${index + 1} of ${clips.length} with visual samples for Emotion AI`,
      completed: Math.min(index + 1, clips.length),
      total: Math.max(clips.length, 1)
    });

    for (const clip of batch) {
      const frameExtractor = getFrameExtractor();
      const sample = await frameExtractor.extractClipSamples(context.sequenceKey, clip);
      const frames = sample.frames.filter((frame) => frame.ok && frame.base64 && frame.mimeType).slice(0, 3);

      if (frames.length === 0) {
        metadataOnly.push(clip);
        continue;
      }

      const text = await runGeminiVision(
        [
          `Clip: ${clip.name}`,
          "Classify the visible emotions across these frames.",
          "Return JSON with keys: emotions, confidence."
        ].join("\n"),
        frames.map((frame) => ({ mimeType: frame.mimeType!, base64: frame.base64! })),
        { json: true }
      );

      const parsed = normalizeJson<{ emotions?: string[]; confidence?: number }>(text, {});

      visual.push({
        clipId: clip.id,
        clipName: clip.name,
        emotions: parsed.emotions ?? [],
        confidence: parsed.confidence ?? 0.6,
        source: "visual"
      });
    }
  }

  return { visual, metadataOnly };
}

async function analyzeVisualCameraBatch(
  context: BrainSequenceContext,
  clips: BrainSequenceContext["selectedClips"],
  onProgress: (progress: AnalysisProgressInput) => void
) {
  const visual: CameraClipAnalysis[] = [];
  const metadataOnly: BrainSequenceContext["selectedClips"] = [];

  for (let index = 0; index < clips.length; index += 4) {
    const batch = clips.slice(index, index + 4);
    onProgress({
      label: `Analyzing clip ${index + 1} of ${clips.length} with visual samples for Camera AI`,
      completed: Math.min(index + 1, clips.length),
      total: Math.max(clips.length, 1)
    });

    for (const clip of batch) {
      const frameExtractor = getFrameExtractor();
      const sample = await frameExtractor.extractClipSamples(context.sequenceKey, clip);
      const frames = sample.frames.filter((frame) => frame.ok && frame.base64 && frame.mimeType).slice(0, 4);

      if (frames.length === 0) {
        metadataOnly.push(clip);
        continue;
      }

      const text = await runGeminiVision(
        [
          `Clip: ${clip.name}`,
          "Infer shot type and movement from these timeline frames.",
          "Return JSON with keys: shotType, movement, confidence."
        ].join("\n"),
        frames.map((frame) => ({ mimeType: frame.mimeType!, base64: frame.base64! })),
        { json: true }
      );

      const parsed = normalizeJson<{ shotType?: string; movement?: string; confidence?: number }>(text, {});

      visual.push({
        clipId: clip.id,
        clipName: clip.name,
        shotType: parsed.shotType ?? "unknown",
        movement: parsed.movement ?? "unknown",
        confidence: parsed.confidence ?? 0.6,
        source: "visual"
      });
    }
  }

  return { visual, metadataOnly };
}

async function analyzeClipTechnicalScores(
  context: BrainSequenceContext,
  onProgress: (progress: AnalysisProgressInput) => void
) {
  const scores: ClipTechnicalScore[] = [];
  const hashes = new Map<string, string>();

  for (let index = 0; index < context.selectedClips.length; index += 1) {
    const clip = context.selectedClips[index];
    onProgress({
      label: `Analyzing clip ${index + 1} of ${context.selectedClips.length} with extracted frames`,
      completed: index + 1,
      total: Math.max(context.selectedClips.length, 1)
    });
    const frameExtractor = getFrameExtractor();
    const sample = await frameExtractor.extractClipSamples(context.sequenceKey, clip);
    const visualFrames = sample.frames.filter((frame) => frame.ok && frame.path);

    if (visualFrames.length === 0) {
      scores.push(metadataFallbackScore(clip));
      continue;
    }

    const stats = await Promise.all(
      visualFrames.slice(0, 3).map((frame) => analyzeImageFrame(frame.path!))
    );

    const blur = average(stats.map((item) => item.blur));
    const focus = average(stats.map((item) => item.focus));
    const noise = average(stats.map((item) => item.noise));
    const exposure = average(stats.map((item) => item.exposure));
    const whiteBalance = average(stats.map((item) => item.whiteBalance));
    const hash = stats[0]?.averageHash ?? clip.id;
    const duplicateGroup = hashes.get(hash) ?? null;

    if (!hashes.has(hash)) {
      hashes.set(hash, clip.id);
    }

    scores.push({
      clipId: clip.id,
      clipName: clip.name,
      blur,
      focus,
      noise,
      exposure,
      whiteBalance,
      duplicateGroup,
      aiRating: Math.round(
        blur * 0.22 +
          focus * 0.22 +
          noise * 0.16 +
          exposure * 0.2 +
          whiteBalance * 0.2
      ),
      source: "visual"
    });
  }

  return scores;
}

function metadataFallbackScore(clip: BrainSequenceContext["selectedClips"][number]) {
  const blur = boundedScore(72 - clip.track * 3);
  const focus = boundedScore(70 - clip.track * 2);
  const noise = boundedScore(64);
  const exposure = boundedScore(68);
  const whiteBalance = boundedScore(66);

  return {
    clipId: clip.id,
    clipName: clip.name,
    blur,
    focus,
    noise,
    exposure,
    whiteBalance,
    duplicateGroup: null,
    aiRating: Math.round(
      blur * 0.22 +
        focus * 0.22 +
        noise * 0.16 +
        exposure * 0.2 +
        whiteBalance * 0.2
    ),
    source: "metadata-only"
  } satisfies ClipTechnicalScore;
}

async function analyzeImageFrame(filePath: string) {
  const image = await loadImage(filePath);
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return {
      blur: 60,
      focus: 60,
      noise: 60,
      exposure: 60,
      whiteBalance: 60,
      averageHash: "ctx-missing"
    };
  }

  ctx.drawImage(image, 0, 0);
  const data = ctx.getImageData(0, 0, image.width, image.height).data;
  const grayscale: number[] = [];
  let totalLuma = 0;
  let totalR = 0;
  let totalG = 0;
  let totalB = 0;

  for (let index = 0; index < data.length; index += 4) {
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    grayscale.push(luma);
    totalLuma += luma;
    totalR += r;
    totalG += g;
    totalB += b;
  }

  const mean = totalLuma / grayscale.length;
  const variance =
    grayscale.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / grayscale.length;
  const laplacian = estimateLaplacian(grayscale, image.width);
  const blur = boundedScore(Math.min(100, laplacian / 12));
  const focus = boundedScore(Math.min(100, variance / 18));
  const exposure = boundedScore(100 - Math.abs(mean - 128) * 0.7);
  const avgR = totalR / grayscale.length;
  const avgG = totalG / grayscale.length;
  const avgB = totalB / grayscale.length;
  const whiteBalance = boundedScore(100 - (Math.abs(avgR - avgG) + Math.abs(avgG - avgB)) * 0.4);
  const noise = boundedScore(100 - Math.min(80, estimateNoise(grayscale) * 4));

  return {
    blur,
    focus,
    noise,
    exposure,
    whiteBalance,
    averageHash: computeAverageHash(grayscale)
  };
}

function loadImage(filePath: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load frame ${filePath}`));
    image.src = `file://${filePath}`;
  });
}

function estimateLaplacian(values: number[], width: number) {
  let total = 0;

  for (let index = width + 1; index < values.length - width - 1; index += 1) {
    total += Math.abs(
      values[index - width] +
        values[index - 1] -
        4 * values[index] +
        values[index + 1] +
        values[index + width]
    );
  }

  return total / Math.max(values.length, 1);
}

function estimateNoise(values: number[]) {
  let total = 0;

  for (let index = 1; index < values.length; index += 1) {
    total += Math.abs(values[index] - values[index - 1]);
  }

  return total / Math.max(values.length - 1, 1);
}

function computeAverageHash(values: number[]) {
  const mean = average(values);

  return values
    .slice(0, 64)
    .map((value) => (value >= mean ? "1" : "0"))
    .join("");
}

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}
