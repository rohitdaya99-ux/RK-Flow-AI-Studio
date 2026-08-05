import { AutoReelSidecarCancelledError, AutoReelSidecarClient } from "./autoReelSidecarClient";
import type { AutoReelJob, EmotionCapabilities, EmotionReport } from "./models";

export const EMOTION_VERSION = "phase-8-emotion-v1";

export class EmotionPipelineCancelledError extends Error {
  constructor() {
    super("Auto Reel Emotion analysis was cancelled.");
    this.name = "EmotionPipelineCancelledError";
  }
}

export async function runEmotionPipeline(args: {
  job: AutoReelJob;
  signal?: AbortSignal;
  onProgress?: (analysis: EmotionReport) => void;
  client?: AutoReelSidecarClient;
}): Promise<EmotionReport> {
  const { job, signal, onProgress, client: clientArg } = args;
  const client = clientArg ?? new AutoReelSidecarClient();

  if (!job.face || job.face.status !== "completed") {
    return unavailableBatch(job, "Emotion analysis requires a completed Face analysis report, which is not available.");
  }

  try {
    const capabilities = await client.getEmotionCapabilities();
    if (!capabilities.available) {
      return unavailableBatch(job, capabilities.reason || "Local Emotion capabilities are unavailable.", capabilities);
    }
    
    const approvedRoots = unique(
      job.request.mediaSelection.clipIds
        .map(id => job.clips.find(c => c.id === id)?.mediaPath)
        .filter((path): path is string => !!path)
        .map(parentPath)
    );

    const request = {
      schemaVersion: 1,
      jobId: job.id,
      requestId: `${job.request.id}:emotion`,
      requestedAt: new Date().toISOString(),
      approvedRoots,
      faceReport: job.face,
      cache: {
        rootName: "rkflow-cache",
        extractorVersion: "phase-4-extraction-v1", // Or appropriate version
        ttlSeconds: 86400,
        maxBytes: 536870912,
      },
      limits: {
        concurrency: 2,
        retryLimit: 1,
      },
    };

    return await client.runEmotionJob(request, { signal, onProgress });
  } catch (error) {
    if (error instanceof AutoReelSidecarCancelledError || signal?.aborted) {
      throw new EmotionPipelineCancelledError();
    }
    return unavailableBatch(job, error instanceof Error ? error.message : "Local Emotion sidecar is unavailable.");
  }
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function parentPath(path: string): string {
  const normalized = path.replace(/\\/g, "/");
  const index = normalized.lastIndexOf("/");
  return index > 0 ? normalized.slice(0, index) : normalized;
}

function unavailableBatch(job: AutoReelJob, reason: string, capabilities?: EmotionCapabilities): EmotionReport {
  const now = new Date().toISOString();
  return {
    jobId: job.id,
    requestId: `${job.request.id}:emotion`,
    status: "sidecar-unavailable",
    sidecar: { status: "unavailable", reason },
    emotionModelVersion: EMOTION_VERSION,
    capabilities: capabilities || { available: false, version: EMOTION_VERSION, providers: [], reason },
    progress: { completedClips: 0, totalClips: 0 },
    clips: [],
    failures: [],
    warnings: [reason],
    startedAt: now,
    completedAt: now,
  };
}
