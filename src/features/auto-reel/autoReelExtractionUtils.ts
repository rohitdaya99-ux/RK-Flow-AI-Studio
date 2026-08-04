import type { ClipDescriptor, FrameSample } from "./models";

export interface AutoReelPlannedFrameSample {
  id: string;
  clipId: string;
  sourceTimeSeconds: number;
  sampleKind: FrameSample["sampleKind"];
}

export interface AutoReelCacheKeyInput {
  category: string;
  mediaFingerprint: string;
  version: string;
  parameters: Record<string, unknown>;
}

export function hashStableText(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `rk${(hash >>> 0).toString(16)}`;
}

export function buildExtractionCacheKey(input: AutoReelCacheKeyInput): string {
  return hashStableText(
    [
      input.category,
      input.mediaFingerprint,
      input.version,
      stableSerialize(input.parameters)
    ].join("::")
  );
}

export function buildFrameSamplePlan(
  clip: Pick<ClipDescriptor, "id" | "sourceInSeconds" | "sourceOutSeconds" | "cacheKey">,
  adaptiveHookSeconds: number[] = []
): AutoReelPlannedFrameSample[] {
  const rangeStart = typeof clip.sourceInSeconds === "number" ? clip.sourceInSeconds : 0;
  const rangeEndCandidate =
    typeof clip.sourceOutSeconds === "number" ? clip.sourceOutSeconds : rangeStart;
  const rangeEnd = rangeEndCandidate >= rangeStart ? rangeEndCandidate : rangeStart;
  const middle = rangeStart + (rangeEnd - rangeStart) / 2;
  const baseSamples: AutoReelPlannedFrameSample[] = [
    createPlannedFrameSample(clip.id, clip.cacheKey, "start", rangeStart),
    createPlannedFrameSample(clip.id, clip.cacheKey, "middle", middle),
    createPlannedFrameSample(clip.id, clip.cacheKey, "end", rangeEnd)
  ];
  const adaptiveSamples = adaptiveHookSeconds
    .filter((value) => Number.isFinite(value))
    .map((value) => clampNumber(value, rangeStart, rangeEnd))
    .filter((value, index, values) => values.indexOf(value) === index)
    .sort((left, right) => left - right)
    .map((value) => createPlannedFrameSample(clip.id, clip.cacheKey, "custom", value));

  return [...baseSamples, ...adaptiveSamples];
}

function createPlannedFrameSample(
  clipId: string,
  clipCacheKey: string,
  sampleKind: FrameSample["sampleKind"],
  sourceTimeSeconds: number
): AutoReelPlannedFrameSample {
  const normalizedTime = Number(sourceTimeSeconds.toFixed(3));
  return {
    id: buildExtractionCacheKey({
      category: "frame-sample",
      mediaFingerprint: clipCacheKey,
      version: "phase-4-frame-sample-v1",
      parameters: {
        clipId,
        sampleKind,
        sourceTimeSeconds: normalizedTime
      }
    }),
    clipId,
    sampleKind,
    sourceTimeSeconds: normalizedTime
  };
}

function clampNumber(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableSerialize(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value as Record<string, unknown>)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableSerialize((value as Record<string, unknown>)[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}
