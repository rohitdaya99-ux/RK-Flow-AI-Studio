import { ResponseSchema } from "@google/generative-ai";
import { runGemini, runGeminiStructured } from "../../ai/GeminiService";
import { BrainClip, BrainSequenceContext } from "../../core/brain/types";

export interface BatchProgress {
  completed: number;
  total: number;
  label: string;
}

export function buildClipPrompt(clips: BrainClip[]) {
  return clips
    .map((clip, index) =>
      [
        `${index + 1}. ${clip.name}`,
        `clipId=${clip.id}`,
        `track=${clip.track}`,
        `start=${clip.start.toFixed(2)}s`,
        `duration=${clip.duration.toFixed(2)}s`,
        `mediaType=${clip.mediaType || "unknown"}`
      ].join(" | ")
    )
    .join("\n");
}

export async function runBatchedGemini<T>({
  clips,
  batchSize,
  buildPrompt,
  parse,
  responseSchema,
  onProgress
}: {
  clips: BrainClip[];
  batchSize: number;
  buildPrompt: (batch: BrainClip[]) => string;
  parse?: (text: string) => T[];
  responseSchema?: ResponseSchema;
  onProgress?: (progress: BatchProgress) => void;
}) {
  const results: T[] = [];

  for (let index = 0; index < clips.length; index += batchSize) {
    const batch = clips.slice(index, index + batchSize);

    onProgress?.({
      completed: Math.min(index + batch.length, clips.length),
      total: clips.length,
      label: `Analyzing clip ${index + 1} of ${clips.length}`
    });

    if (responseSchema) {
      const structured = await runGeminiStructured<T[]>(buildPrompt(batch), responseSchema);
      results.push(...structured);
      continue;
    }

    const text = await runGemini(buildPrompt(batch), { json: true });
    results.push(...(parse ? parse(text) : []));
  }

  return results;
}

export function normalizeJson<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

export function buildSequenceScope(moduleId: string, context: BrainSequenceContext) {
  return `${moduleId}:${context.sequenceKey}`;
}

export function signalSourceLabel(mode: "metadata" | "audio") {
  if (mode === "audio") {
    return "audio-signal analysis";
  }

  return "timeline metadata only (clip names, durations, track positions)";
}
