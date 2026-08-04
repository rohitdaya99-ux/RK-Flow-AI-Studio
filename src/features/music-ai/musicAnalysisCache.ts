import { MemoryEngine } from "../../core/brain";
import { MusicAnalysisResult } from "../../core/brain/types";
import { analyzeMusicFile } from "../perception/perceptionAnalyzers";

const memory = new MemoryEngine();
const MUSIC_CACHE_PREFIX = "music-ai:file:";

export function listCachedMusicAnalyses(): MusicAnalysisResult[] {
  return Object.entries(memory.load().analysis)
    .filter(([key, value]) => key.startsWith(MUSIC_CACHE_PREFIX) && isMusicAnalysis(value))
    .map(([, value]) => value as MusicAnalysisResult)
    .sort((left, right) => left.fileName.localeCompare(right.fileName));
}

export async function analyzeAndCacheMusicFile(
  file: File,
  onProgress: (progress: { label: string; percent?: number }) => void
): Promise<MusicAnalysisResult> {
  const hash = await hashFile(file);
  const cached = memory.getAnalysis<MusicAnalysisResult>(`${MUSIC_CACHE_PREFIX}${hash}`, "result");

  if (cached) {
    onProgress({ label: "Loaded cached song analysis.", percent: 100 });
    return cached;
  }

  onProgress({ label: "Reading audio file...", percent: 10 });
  const context = new AudioContext();

  try {
    const buffer = await file.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(buffer.slice(0));
    const result = await analyzeMusicFile(file, audioBuffer, (next) => {
      if (typeof next === "string") {
        onProgress({ label: next });
        return;
      }

      onProgress({ label: next.label, percent: next.percent });
    });

    memory.setAnalysis(`${MUSIC_CACHE_PREFIX}${result.fileHash}`, "result", result);
    return result;
  } finally {
    await context.close?.();
  }
}

function isMusicAnalysis(value: unknown): value is MusicAnalysisResult {
  return Boolean(
    value &&
      typeof value === "object" &&
      typeof (value as MusicAnalysisResult).fileHash === "string" &&
      typeof (value as MusicAnalysisResult).fileName === "string" &&
      Array.isArray((value as MusicAnalysisResult).energyCurve)
  );
}

async function hashFile(file: File) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest))
    .slice(0, 12)
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}
