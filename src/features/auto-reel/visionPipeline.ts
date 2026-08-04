import { AutoReelSidecarCancelledError, AutoReelSidecarClient } from "./autoReelSidecarClient";
import type { AutoReelJob, FrameSample, VisionBatchAnalysis, VisionCapabilities } from "./models";

export const VISION_VERSION = "phase-5-vision-v1";

export class VisionPipelineCancelledError extends Error { constructor() { super("Auto Reel Vision analysis was cancelled."); this.name = "VisionPipelineCancelledError"; } }

export async function runVisionPipeline(args: {
  job: AutoReelJob; signal?: AbortSignal; onProgress?: (analysis: VisionBatchAnalysis) => void; client?: AutoReelSidecarClient;
}): Promise<VisionBatchAnalysis> {
  const frames = args.job.frameSamples.filter(isExtractedFrame);
  const client = args.client ?? new AutoReelSidecarClient();
  if (frames.length === 0) return unavailableBatch(args.job, "Vision analysis requires extracted image frames. No available extracted frames were produced by the existing extraction pipeline.");
  try {
    const capabilities = await client.getVisionCapabilities();
    if (!capabilities.available) return unavailableBatch(args.job, capabilities.reason || "Local Vision capabilities are unavailable.", capabilities);
    const approvedRoots = unique(frames.map((frame) => parentPath(frame.imagePath!)));
    return await client.runVisionJob({
      schemaVersion: 1, jobId: args.job.id, requestId: `${args.job.request.id}:vision`, requestedAt: new Date().toISOString(),
      approvedRoots, visionVersion: VISION_VERSION,
      frames: frames.map((frame) => ({ frameSampleId: frame.id, clipId: frame.clipId, clipName: clipName(args.job, frame.clipId), imagePath: frame.imagePath, contentHash: frame.contentHash, extractorVersion: "phase-4-extraction-v1", sampleKind: frame.sampleKind, sourceTimeSeconds: frame.sourceTimeSeconds, width: frame.width, height: frame.height, extractorCacheKey: frame.cacheKey || "" })),
      parameters: { maxDimension: 512, letterboxSize: 512, normalizeHistogram: true, brightnessNormalize: true },
      cache: { rootName: "rkflow-cache", extractorVersion: "phase-4-extraction-v1", ttlSeconds: 86400, maxBytes: 536870912 },
      limits: { concurrency: 2, retryLimit: 1 }
    }, { signal: args.signal, onProgress: args.onProgress });
  } catch (error) {
    if (error instanceof AutoReelSidecarCancelledError || args.signal?.aborted) throw new VisionPipelineCancelledError();
    return unavailableBatch(args.job, error instanceof Error ? error.message : "Local Vision sidecar is unavailable.");
  }
}

function isExtractedFrame(frame: FrameSample): frame is FrameSample & { imagePath: string; contentHash: string } {
  return frame.extractionStatus === "available" && typeof frame.imagePath === "string" && frame.imagePath.length > 0 && typeof frame.contentHash === "string" && frame.contentHash.length > 0;
}
function clipName(job: AutoReelJob, id: string): string { return job.clips.find((clip) => clip.id === id)?.name || id; }
function unique(values: string[]): string[] { return [...new Set(values.filter(Boolean))]; }
function parentPath(path: string): string { const normalized = path.replace(/\\/g, "/"); const index = normalized.lastIndexOf("/"); return index > 0 ? normalized.slice(0, index) : normalized; }
function unavailableBatch(job: AutoReelJob, reason: string, capabilities?: VisionCapabilities): VisionBatchAnalysis {
  return { schemaVersion: 1, jobId: job.id, requestId: `${job.request.id}:vision`, status: "sidecar-unavailable", sidecar: { status: "unavailable", reason }, visionVersion: VISION_VERSION, gpuAccelerated: capabilities?.gpuAccelerated || false, progress: { completedFrames: 0, totalFrames: 0, completedClips: 0, totalClips: 0, cacheHits: 0, cacheMisses: 0 }, clips: [], failures: [], warnings: [reason], startedAt: new Date().toISOString(), completedAt: new Date().toISOString() };
}
