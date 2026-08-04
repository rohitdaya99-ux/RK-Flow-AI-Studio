import type { AutoReelSetupContext } from "./autoReelSetupService";
import type {
  AutoReelAudioExtraction,
  AutoReelAudioExtractionTask,
  AutoReelExtractionFailure,
  AutoReelExtractionRequest,
  AutoReelExtractionResult,
  AutoReelFrameExtractionTask,
  AutoReelJob,
  AutoReelRequest,
  ClipDescriptor,
  FrameSample
} from "./models";
import {
  AutoReelSidecarCancelledError,
  AutoReelSidecarClient,
  AutoReelSidecarUnavailableError
} from "./autoReelSidecarClient";
import { buildExtractionCacheKey, buildFrameSamplePlan } from "./autoReelExtractionUtils";

const EXTRACTION_VERSION = "phase-4-extraction-v1";
const CACHE_TTL_SECONDS = 60 * 60 * 24 * 7;
const CACHE_MAX_BYTES = 1024 * 1024 * 1024;
const EXTRACTION_CONCURRENCY = 2;
const EXTRACTION_RETRY_LIMIT = 2;

export class AutoReelExtractionCancelledError extends Error {
  public constructor(message = "Auto Reel extraction was cancelled.") {
    super(message);
    this.name = "AutoReelExtractionCancelledError";
  }
}

export interface AutoReelExtractionStageResult {
  extraction: AutoReelExtractionResult;
  frameSamples: FrameSample[];
  audioExtractions: AutoReelAudioExtraction[];
  failures: AutoReelExtractionFailure[];
  warnings: string[];
  planningText: string;
}

interface ExtractionPreflight {
  request: AutoReelExtractionRequest;
  preflightFrameSamples: FrameSample[];
  preflightAudioExtractions: AutoReelAudioExtraction[];
  preflightFailures: AutoReelExtractionFailure[];
  preflightClipResults: AutoReelExtractionResult["clipResults"];
  warnings: string[];
}

export async function runAutoReelExtractionStage(args: {
  job: AutoReelJob;
  request: AutoReelRequest;
  clips: ClipDescriptor[];
  context: AutoReelSetupContext;
  signal?: AbortSignal;
  client?: AutoReelSidecarClient;
  onProgress?: (result: AutoReelExtractionResult) => void;
}): Promise<AutoReelExtractionStageResult> {
  const preflight = buildAutoReelExtractionRequest({
    job: args.job,
    request: args.request,
    clips: args.clips,
    context: args.context
  });
  const client = args.client ?? new AutoReelSidecarClient();

  if (preflight.request.frameTasks.length === 0 && preflight.request.audioTasks.length === 0) {
    const fallback = buildImmediateExtractionResult(preflight, args.job, args.request, "completed", "No eligible verified local media paths were available for extraction.");
    args.onProgress?.(fallback);
    return toStageResult(fallback);
  }

  try {
    const result = await client.runExtractionJob(preflight.request, {
      signal: args.signal,
      onProgress: (payload) => args.onProgress?.(mergeExtractionResult(preflight, payload))
    });
    return toStageResult(mergeExtractionResult(preflight, result));
  } catch (error: unknown) {
    if (error instanceof AutoReelSidecarCancelledError || args.signal?.aborted) {
      throw new AutoReelExtractionCancelledError();
    }
    if (error instanceof AutoReelSidecarUnavailableError) {
      const fallback = buildImmediateExtractionResult(preflight, args.job, args.request, "sidecar-unavailable", error.message);
      args.onProgress?.(fallback);
      return toStageResult(fallback);
    }
    throw error;
  }
}

export function buildAutoReelExtractionRequest(args: {
  job: AutoReelJob;
  request: AutoReelRequest;
  clips: ClipDescriptor[];
  context: AutoReelSetupContext;
}): ExtractionPreflight {
  const approvedRoots = new Set<string>();
  const frameTasks: AutoReelFrameExtractionTask[] = [];
  const audioTasks: AutoReelAudioExtractionTask[] = [];
  const preflightFrameSamples: FrameSample[] = [];
  const preflightAudioExtractions: AutoReelAudioExtraction[] = [];
  const preflightFailures: AutoReelExtractionFailure[] = [];
  const preflightClipResults: AutoReelExtractionResult["clipResults"] = [];
  const warnings: string[] = [];

  for (const clip of args.clips) {
    if (clip.mediaType !== "video") {
      preflightClipResults.push({
        clipId: clip.id,
        clipName: clip.name,
        frameSampleIds: [],
        status: "unavailable",
        cacheHits: 0,
        cacheMisses: 0,
        attempts: 0,
        error: `Clip "${clip.name}" is ${clip.mediaType} media and is not eligible for frame extraction.`
      });
      continue;
    }

    const baseSamples = buildFrameSamplePlan(clip);
    if (!clip.mediaPath) {
      const message = `Clip "${clip.name}" does not expose a verified source media path in this host session.`;
      warnings.push(message);
      preflightFrameSamples.push(...baseSamples.map((sample) => unavailableFrameSample(sample, message)));
      preflightFailures.push({
        taskId: `frames:${clip.id}`,
        clipId: clip.id,
        targetKind: "frames",
        status: "unavailable",
        message,
        attempts: 0,
        recordedAt: new Date().toISOString()
      });
      preflightClipResults.push({
        clipId: clip.id,
        clipName: clip.name,
        frameSampleIds: baseSamples.map((sample) => sample.id),
        status: "unavailable",
        cacheHits: 0,
        cacheMisses: 0,
        attempts: 0,
        error: message
      });
      continue;
    }

    if (typeof clip.sourceInSeconds !== "number" || typeof clip.sourceOutSeconds !== "number") {
      const message = `Clip "${clip.name}" is missing verified source in/out timing for extraction.`;
      warnings.push(message);
      preflightFrameSamples.push(...baseSamples.map((sample) => unavailableFrameSample(sample, message)));
      preflightFailures.push({
        taskId: `frames:${clip.id}`,
        clipId: clip.id,
        targetKind: "frames",
        status: "unavailable",
        message,
        attempts: 0,
        recordedAt: new Date().toISOString()
      });
      preflightClipResults.push({
        clipId: clip.id,
        clipName: clip.name,
        frameSampleIds: baseSamples.map((sample) => sample.id),
        status: "unavailable",
        cacheHits: 0,
        cacheMisses: 0,
        attempts: 0,
        error: message
      });
      continue;
    }

    approvedRoots.add(directoryOfPath(clip.mediaPath));
    frameTasks.push({
      clipId: clip.id,
      clipName: clip.name,
      mediaPath: clip.mediaPath,
      mediaFingerprint: clip.mediaFingerprint,
      cacheKey: buildExtractionCacheKey({
        category: "clip-frames",
        mediaFingerprint: clip.mediaFingerprint,
        version: EXTRACTION_VERSION,
        parameters: {
          clipId: clip.id,
          sourceInSeconds: clip.sourceInSeconds,
          sourceOutSeconds: clip.sourceOutSeconds,
          samplePlan: baseSamples.map((sample) => ({
            sourceTimeSeconds: sample.sourceTimeSeconds,
            sampleKind: sample.sampleKind
          }))
        }
      }),
      sourceInSeconds: clip.sourceInSeconds,
      sourceOutSeconds: clip.sourceOutSeconds,
      samplePlan: baseSamples.map((sample) => ({
        id: sample.id,
        sourceTimeSeconds: sample.sourceTimeSeconds,
        sampleKind: sample.sampleKind
      }))
    });
  }

  const selectedSong = resolveSelectedSongAudioTask(args.request, args.context);
  if (selectedSong) {
    if (selectedSong.mediaPath) {
      approvedRoots.add(directoryOfPath(selectedSong.mediaPath));
      audioTasks.push(selectedSong);
    } else {
      preflightAudioExtractions.push(unavailableAudioExtraction(selectedSong, selectedSong.label));
    }
  }

  if (args.request.setup?.musicSource.extractClipAudio) {
    for (const frameTask of frameTasks) {
      audioTasks.push({
        id: buildExtractionCacheKey({
          category: "clip-audio",
          mediaFingerprint: frameTask.mediaFingerprint,
          version: EXTRACTION_VERSION,
          parameters: { clipId: frameTask.clipId, sourceKind: "clip-audio" }
        }),
        sourceKind: "clip-audio",
        clipId: frameTask.clipId,
        label: `${frameTask.clipName} audio`,
        mediaPath: frameTask.mediaPath,
        mediaFingerprint: frameTask.mediaFingerprint,
        cacheKey: buildExtractionCacheKey({
          category: "audio-proxy",
          mediaFingerprint: frameTask.mediaFingerprint,
          version: EXTRACTION_VERSION,
          parameters: { clipId: frameTask.clipId, sourceKind: "clip-audio" }
        })
      });
    }
  }

  return {
    request: {
      schemaVersion: 1,
      jobId: args.job.id,
      requestId: args.request.id,
      requestedAt: new Date().toISOString(),
      approvedRoots: Array.from(approvedRoots).filter((value) => value.length > 0).sort(),
      frameTasks,
      audioTasks,
      cache: {
        rootName: "rkflow-cache",
        extractorVersion: EXTRACTION_VERSION,
        ttlSeconds: CACHE_TTL_SECONDS,
        maxBytes: CACHE_MAX_BYTES
      },
      limits: {
        concurrency: EXTRACTION_CONCURRENCY,
        retryLimit: EXTRACTION_RETRY_LIMIT
      }
    },
    preflightFrameSamples,
    preflightAudioExtractions,
    preflightFailures,
    preflightClipResults,
    warnings
  };
}

export function buildExtractionProgressMessage(result: AutoReelExtractionResult): string {
  const clipLabel = result.progress.currentClipName ? ` ${result.progress.currentClipName}` : "";
  const clipProgress = `${result.progress.completedClips}/${Math.max(1, result.progress.totalClips)} clips`;
  const audioProgress = `${result.progress.completedAudioTasks}/${Math.max(1, result.progress.totalAudioTasks)} audio`;
  return `Extracting${clipLabel}. ${clipProgress}, ${audioProgress}, cache ${result.progress.cacheHits} hit / ${result.progress.cacheMisses} miss.`;
}

export function isAutoReelExtractionCancelledError(error: unknown): error is AutoReelExtractionCancelledError {
  return error instanceof AutoReelExtractionCancelledError;
}

function mergeExtractionResult(
  preflight: ExtractionPreflight,
  result: AutoReelExtractionResult
): AutoReelExtractionResult {
  return {
    ...result,
    clipResults: [...preflight.preflightClipResults, ...result.clipResults],
    frameSamples: [...preflight.preflightFrameSamples, ...result.frameSamples],
    audioExtractions: [...preflight.preflightAudioExtractions, ...result.audioExtractions],
    failures: [...preflight.preflightFailures, ...result.failures],
    warnings: [...preflight.warnings, ...result.warnings]
  };
}

function buildImmediateExtractionResult(
  preflight: ExtractionPreflight,
  job: AutoReelJob,
  request: AutoReelRequest,
  status: AutoReelExtractionResult["status"],
  reason: string
): AutoReelExtractionResult {
  const frameSamples = [
    ...preflight.preflightFrameSamples,
    ...preflight.request.frameTasks.flatMap((task) =>
      task.samplePlan.map((sample) =>
        unavailableFrameSample(
          {
            ...sample,
            clipId: task.clipId
          },
          reason,
          task.cacheKey
        )
      )
    )
  ];
  const audioExtractions = [
    ...preflight.preflightAudioExtractions,
    ...preflight.request.audioTasks.map((task) => unavailableAudioExtraction(task, reason))
  ];
  const failures = [
    ...preflight.preflightFailures,
    ...preflight.request.frameTasks.map<AutoReelExtractionFailure>((task) => ({
      taskId: `frames:${task.clipId}`,
      clipId: task.clipId,
      targetKind: "frames",
      status: status === "cancelled" ? "cancelled" : "failed",
      message: reason,
      attempts: 0,
      recordedAt: new Date().toISOString()
    })),
    ...preflight.request.audioTasks.map<AutoReelExtractionFailure>((task) => ({
      taskId: task.id,
      clipId: task.clipId,
      audioTaskId: task.id,
      targetKind: "audio",
      status: status === "cancelled" ? "cancelled" : "failed",
      message: reason,
      attempts: 0,
      recordedAt: new Date().toISOString()
    }))
  ];

  return {
    schemaVersion: 1,
    jobId: job.id,
    requestId: request.id,
    status,
    sidecar: {
      status: "unavailable",
      reason
    },
    progress: {
      completedClips: preflight.request.frameTasks.length,
      remainingClips: 0,
      totalClips: preflight.request.frameTasks.length,
      completedAudioTasks: preflight.request.audioTasks.length,
      totalAudioTasks: preflight.request.audioTasks.length,
      cacheHits: 0,
      cacheMisses: preflight.request.frameTasks.length + preflight.request.audioTasks.length
    },
    clipResults: [
      ...preflight.preflightClipResults,
      ...preflight.request.frameTasks.map((task) => ({
        clipId: task.clipId,
        clipName: task.clipName,
        frameSampleIds: task.samplePlan.map((sample) => sample.id),
        status: "failed" as const,
        cacheHits: 0,
        cacheMisses: task.samplePlan.length,
        attempts: 0,
        error: reason
      }))
    ],
    frameSamples,
    audioExtractions,
    failures,
    warnings: [...preflight.warnings, reason],
    startedAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  };
}

function toStageResult(extraction: AutoReelExtractionResult): AutoReelExtractionStageResult {
  return {
    extraction,
    frameSamples: extraction.frameSamples,
    audioExtractions: extraction.audioExtractions,
    failures: extraction.failures,
    warnings: extraction.warnings,
    planningText:
      extraction.status === "sidecar-unavailable"
        ? "Frame/audio extraction could not run because the local analysis sidecar is unavailable."
        : "Frame/audio extraction completed. Vision AI, Music AI, scoring, story building, and planning are still not started."
  };
}

function unavailableFrameSample(
  sample: { id: string; clipId: string; sampleKind: FrameSample["sampleKind"]; sourceTimeSeconds: number },
  reason: string,
  cacheKey?: string
): FrameSample {
  return {
    id: sample.id,
    clipId: sample.clipId,
    sourceTimeSeconds: sample.sourceTimeSeconds,
    sampleKind: sample.sampleKind,
    cacheKey,
    cacheStatus: "unavailable",
    extractionStatus: "unavailable",
    capabilityReason: reason,
    error: reason,
    capturedAt: new Date().toISOString()
  };
}

function unavailableAudioExtraction(
  task: Pick<AutoReelAudioExtractionTask, "id" | "sourceKind" | "clipId" | "label" | "cacheKey">,
  reason: string
): AutoReelAudioExtraction {
  return {
    id: task.id,
    taskId: task.id,
    sourceKind: task.sourceKind,
    clipId: task.clipId,
    cacheKey: task.cacheKey,
    cacheStatus: "unavailable",
    extractionStatus: "unavailable",
    waveform: [],
    extractedAt: new Date().toISOString(),
    capabilityReason: reason,
    error: reason
  };
}

function resolveSelectedSongAudioTask(
  request: AutoReelRequest,
  context: AutoReelSetupContext
): AutoReelAudioExtractionTask | null {
  const musicSource = request.setup?.musicSource;
  if (!musicSource || musicSource.mode === "none") {
    return null;
  }

  if (musicSource.mode === "local-file") {
    if (!musicSource.filePath) {
      return {
        id: buildExtractionCacheKey({
          category: "selected-song",
          mediaFingerprint: request.mediaSelection.mediaFingerprint,
          version: EXTRACTION_VERSION,
          parameters: { requestId: request.id, mode: musicSource.mode }
        }),
        sourceKind: "selected-song",
        label: "Selected song is missing a verified local filesystem path.",
        mediaPath: "",
        mediaFingerprint: request.mediaSelection.mediaFingerprint,
        cacheKey: buildExtractionCacheKey({
          category: "audio-proxy",
          mediaFingerprint: request.mediaSelection.mediaFingerprint,
          version: EXTRACTION_VERSION,
          parameters: { requestId: request.id, mode: musicSource.mode }
        })
      };
    }
    return {
      id: buildExtractionCacheKey({
        category: "selected-song",
        mediaFingerprint: request.mediaSelection.mediaFingerprint,
        version: EXTRACTION_VERSION,
        parameters: { requestId: request.id, mode: musicSource.mode, filePath: musicSource.filePath }
      }),
      sourceKind: "selected-song",
      label: musicSource.fileName || "Selected song",
      mediaPath: musicSource.filePath,
      mediaFingerprint: request.mediaSelection.mediaFingerprint,
      cacheKey: buildExtractionCacheKey({
        category: "audio-proxy",
        mediaFingerprint: request.mediaSelection.mediaFingerprint,
        version: EXTRACTION_VERSION,
        parameters: { requestId: request.id, sourcePath: musicSource.filePath }
      })
    };
  }

  if (musicSource.mode === "project-item") {
    const projectItem = context.projectItemOptions.find((item) => item.id === musicSource.projectItemId);
    const mediaPath = projectItem?.mediaPath || "";
    return {
      id: buildExtractionCacheKey({
        category: "selected-song",
        mediaFingerprint: request.mediaSelection.mediaFingerprint,
        version: EXTRACTION_VERSION,
        parameters: { requestId: request.id, mode: musicSource.mode, projectItemId: musicSource.projectItemId }
      }),
      sourceKind: "selected-song",
      label: projectItem?.label || "Selected song project item",
      mediaPath,
      mediaFingerprint: request.mediaSelection.mediaFingerprint,
      cacheKey: buildExtractionCacheKey({
        category: "audio-proxy",
        mediaFingerprint: request.mediaSelection.mediaFingerprint,
        version: EXTRACTION_VERSION,
        parameters: { requestId: request.id, projectItemId: musicSource.projectItemId }
      })
    };
  }

  return {
    id: buildExtractionCacheKey({
      category: "selected-song",
      mediaFingerprint: request.mediaSelection.mediaFingerprint,
      version: EXTRACTION_VERSION,
      parameters: { requestId: request.id, mode: musicSource.mode }
    }),
    sourceKind: "selected-song",
    label:
      musicSource.mode === "social-reference"
        ? "Social reference links are metadata-only and are not downloaded for extraction."
        : "Direct URLs are not extracted by the local-only sidecar. Use a local file or Premiere project item.",
    mediaPath: "",
    mediaFingerprint: request.mediaSelection.mediaFingerprint,
    cacheKey: buildExtractionCacheKey({
      category: "audio-proxy",
      mediaFingerprint: request.mediaSelection.mediaFingerprint,
      version: EXTRACTION_VERSION,
      parameters: { requestId: request.id, mode: musicSource.mode }
    })
  };
}

function directoryOfPath(value: string): string {
  const normalized = value.replaceAll("\\", "/");
  const index = normalized.lastIndexOf("/");
  return index <= 0 ? normalized : normalized.slice(0, index);
}
