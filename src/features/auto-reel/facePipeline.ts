import { AutoReelSidecarCancelledError, AutoReelSidecarClient } from "./autoReelSidecarClient";
import type { AutoReelJob, FaceCapabilities, FaceReport } from "./models";

export const FACE_MODEL_VERSION = "phase-6-anonymous-opencv-haar-v1";

export class FacePipelineCancelledError extends Error {
  constructor() {
    super("Auto Reel Face analysis was cancelled.");
    this.name = "FacePipelineCancelledError";
  }
}

export async function runFacePipeline(args: {
  job: AutoReelJob;
  signal?: AbortSignal;
  onProgress?: (analysis: FaceReport) => void;
  client?: AutoReelSidecarClient;
}): Promise<FaceReport> {
  const { job, signal, onProgress, client: clientArg } = args;
  const client = clientArg ?? new AutoReelSidecarClient();

  const vision = job.vision;
  if (!vision || vision.status !== "completed") {
    return unavailableBatch(job, "Face analysis requires a completed Vision analysis report, which is not available.");
  }

  try {
    const capabilities = await client.getFaceCapabilities();
    if (!capabilities.available) {
      return unavailableBatch(job, capabilities.reason || "Local Face capabilities are unavailable.", capabilities);
    }
    
    const frames = job.frameSamples.filter(f => f.extractionStatus === 'available');
    const approvedRoots = unique(frames.map((frame) => parentPath(frame.imagePath!)));

    const request = {
      schemaVersion: 1,
      jobId: job.id,
      requestId: `${job.request.id}:face`,
      requestedAt: new Date().toISOString(),
      approvedRoots,
      visionVersion: vision.visionVersion,
      frames: frames.map(f => ({
          frameSampleId: f.id,
          clipId: f.clipId,
          imagePath: f.imagePath,
          contentHash: f.contentHash,
      })),
      cache: {
        rootName: "rkflow-cache",
        extractorVersion: "phase-4-extraction-v1",
        ttlSeconds: 86400,
        maxBytes: 536870912,
      },
      limits: {
        concurrency: 2,
        retryLimit: 1,
      },
    };

    return await client.runFaceJob(request, { signal, onProgress });
  } catch (error) {
    if (error instanceof AutoReelSidecarCancelledError || signal?.aborted) {
      throw new FacePipelineCancelledError();
    }
    return unavailableBatch(job, error instanceof Error ? error.message : "Local Face sidecar is unavailable.");
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

function unavailableBatch(job: AutoReelJob, reason: string, capabilities?: FaceCapabilities): FaceReport {
  const now = new Date().toISOString();
  return {
    schemaVersion: 1,
    jobId: job.id,
    requestId: `${job.request.id}:face`,
    status: "sidecar-unavailable",
    sidecar: { status: "unavailable", reason },
    faceModelVersion: FACE_MODEL_VERSION,
    capabilities: capabilities || { available: false, detector: "unknown", landmarksAvailable: false, embeddingProviderEnabled: false, reason },
    progress: {},
    faces: [],
    clusters: [],
    timeline: [],
    cacheHits: 0,
    cacheMisses: 0,
    warnings: [reason],
    startedAt: now,
    completedAt: now,
  };
}
