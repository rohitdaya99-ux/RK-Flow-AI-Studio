import { ContextEngine, MemoryEngine } from "../../core/brain";
import { BrainClip } from "../../core/brain/types";
import { PremiereBridge } from "../../premiere/PremiereBridge";
import { premiereAPI } from "../../services/PremiereAPI";
import { TimelineState } from "../../types/Timeline";
import { readAssetRecords } from "../asset-ai/assetService";
import { getPromptReelMusicOptions } from "../prompt-reel/promptReelService";
import { AutoReelJobMemory } from "./AutoReelJobMemory";
import {
  buildExtractionProgressMessage,
  isAutoReelExtractionCancelledError,
  runAutoReelExtractionStage
} from "./autoReelExtractionService";
import { isAutoReelScanCancelledError, scanAutoReelTimeline } from "./autoReelScanner";
import { runVisionPipeline, VisionPipelineCancelledError } from "./visionPipeline";
import {
  AutoReelJob,
  AutoReelJobProgress,
  AutoReelRequest,
  MediaSelection,
  VisionBatchAnalysis,
  VisionSignals
} from "./models";
import {
  AutoReelSetupState,
  AutoReelType,
  createDefaultAutoReelSetupState,
  serializeAutoReelSetupIntoRequest,
  validateAutoReelSetupState
} from "./autoReelSetupConfig";
import { validateAutoReelRequest } from "./validation";
import { createAutoReelJob, transitionAutoReelJob } from "./models";

const memory = new MemoryEngine();
const contextEngine = new ContextEngine();
const jobMemory = new AutoReelJobMemory(memory);

export interface AutoReelProjectOption {
  id: string;
  name: string;
  active: boolean;
}

export interface AutoReelSequenceOption {
  id: string;
  name: string;
  active: boolean;
}

export interface AutoReelClipOption {
  id: string;
  label: string;
  projectItemId?: string;
  startSeconds: number;
  endSeconds: number;
  mediaType: string;
}

export interface AutoReelProjectItemOption {
  id: string;
  label: string;
  mediaPath?: string;
  projectItemId?: string | null;
  nodeId?: string | null;
  ancestorIds: string[];
  type: string;
}

export interface AutoReelMusicOption {
  id: string;
  label: string;
  bpm?: number;
  source: "cached-music-ai" | "project-item";
}

export interface AutoReelSetupContext {
  connected: boolean;
  projectOptions: AutoReelProjectOption[];
  sequenceOptions: AutoReelSequenceOption[];
  activeProjectId: string;
  activeSequenceId: string;
  projectName: string;
  sequenceName: string;
  clipCount: number;
  selectedClipCount: number;
  inPointSeconds: number;
  outPointSeconds: number;
  durationSeconds: number;
  fps: number;
  timebase: number | null;
  frameSize: { width: number; height: number } | null;
  projectItemOptions: AutoReelProjectItemOption[];
  manualClipOptions: AutoReelClipOption[];
  musicOptions: AutoReelMusicOption[];
  selectedClips: BrainClip[];
  sequenceClips: BrainClip[];
  timeline: TimelineState | null;
  lockedTrackSupport: "unavailable";
}

export interface AutoReelSetupDraft {
  projectId: string;
  sequenceId: string;
  state: AutoReelSetupState;
}

export interface AutoReelSetupRunResult {
  job: AutoReelJob;
  context: AutoReelSetupContext;
  log: string[];
  request: AutoReelRequest;
  planningText: string;
}

export async function loadAutoReelSetupContext(): Promise<AutoReelSetupContext> {
  const bridge = new PremiereBridge();
  const [sequenceContext, timeline, project, activeSequence] = await Promise.all([
    contextEngine.readSequenceContext(),
    bridge.readTimeline(),
    premiereAPI.getCurrentProject().catch(() => null),
    premiereAPI.getActiveSequence().catch(() => null)
  ]);

  const connected = timeline !== null && sequenceContext !== null;
  const projectName = normalizeText(project?.name, sequenceContext?.projectName ?? "");
  const sequenceName = normalizeText(activeSequence?.name, sequenceContext?.sequenceName ?? "");
  const activeProjectId = createProjectId(projectName);
  const activeSequenceId = createSequenceId(activeSequence, sequenceName);
  const sequenceOptions = await readSequenceOptions(project, activeSequenceId, sequenceName);
  const sequenceClips = flattenTimelineClips(timeline, sequenceContext?.selectedClips ?? []);
  const selectedClips = buildSelectedClips(timeline, sequenceContext?.selectedClips ?? []);
  const assetRecords = await readAssetRecords(sequenceContext);
  const projectItemOptions = assetRecords.assets
    .filter((asset) => asset.source === "project")
    .map((asset) => ({
      id: asset.id,
      label: asset.name,
      mediaPath: asset.mediaPath ?? undefined,
      projectItemId: asset.projectItemId,
      nodeId: asset.nodeId,
      ancestorIds: asset.ancestorIds,
      type: asset.type
    }));
  const projectAudioOptions = projectItemOptions.filter((item) => /audio|sound|music/i.test(item.type) || /\.(mp3|wav|aac|m4a|aif|aiff|flac|ogg)$/i.test(item.mediaPath ?? ""));
  const cachedMusicOptions = getPromptReelMusicOptions().map((entry) => ({
    id: entry.fileHash,
    label: entry.fileName,
    bpm: entry.bpm,
    source: "cached-music-ai" as const
  }));
  const musicOptions: AutoReelMusicOption[] = [
    ...cachedMusicOptions,
    ...projectAudioOptions.map((item) => ({
      id: item.id,
      label: item.label,
      source: "project-item" as const
    }))
  ];

  return {
    connected,
    projectOptions: projectName ? [{ id: activeProjectId, name: projectName, active: true }] : [],
    sequenceOptions,
    activeProjectId,
    activeSequenceId,
    projectName,
    sequenceName,
    clipCount: sequenceClips.length,
    selectedClipCount: selectedClips.length,
    inPointSeconds: timeline?.inPoint ?? sequenceContext?.inPoint ?? 0,
    outPointSeconds: timeline?.outPoint ?? sequenceContext?.outPoint ?? 0,
    durationSeconds: timeline?.duration ?? sequenceContext?.duration ?? 0,
    fps: timeline?.fps ?? sequenceContext?.fps ?? 0,
    timebase: timeline?.timebase ?? null,
    frameSize: timeline?.frameSize ?? null,
    projectItemOptions,
    manualClipOptions: sequenceClips.map((clip) => ({
      id: clip.id,
      label: `${clip.name} • ${formatSeconds(clip.start)}-${formatSeconds(clip.end)}`,
      projectItemId: clip.projectItemId,
      startSeconds: clip.start,
      endSeconds: clip.end,
      mediaType: clip.mediaType
    })),
    musicOptions,
    selectedClips,
    sequenceClips,
    timeline,
    lockedTrackSupport: "unavailable"
  };
}

export function createSetupStateFromDraft(
  draft: Partial<AutoReelSetupDraft> | null,
  context: AutoReelSetupContext | null
): AutoReelSetupState {
  const base = createDefaultAutoReelSetupState();
  const sequenceName = context?.sequenceName || "Auto Reel";

  return createDefaultAutoReelSetupState({
    ...base,
    ...(draft?.state ?? {}),
    outputSequenceName:
      draft?.state?.outputSequenceName?.trim() ||
      `${labelForReelType((draft?.state?.reelType as AutoReelType | undefined) ?? base.reelType)} - ${sequenceName}`
  });
}

export async function runAutoReelSetup(args: {
  projectId: string;
  sequenceId: string;
  state: AutoReelSetupState;
  signal?: AbortSignal;
  onProgress?: (update: {
    job: AutoReelJob;
    log: string[];
    planningText: string;
  }) => void;
}): Promise<AutoReelSetupRunResult> {
  const context = await loadAutoReelSetupContext();
  const log: string[] = [];

  if (!context.connected || !context.sequenceName || !context.timeline) {
    throw new Error("Open an active Premiere project and sequence before starting Auto Reel.");
  }

  const validation = validateAutoReelSetupState(args.state, {
    availableClipCount: context.clipCount,
    selectedClipCount: context.selectedClipCount,
    availableProjectItemIds: context.projectItemOptions.map((item) => item.id),
    availableManualClipIds: context.manualClipOptions.map((clip) => clip.id)
  });

  if (validation.general.length > 0 || Object.keys(validation.fields).length > 0) {
    throw new Error([
      ...validation.general,
      ...Object.values(validation.fields).filter((value): value is string => typeof value === "string" && value.length > 0)
    ].join(" "));
  }

  const pendingSelection = buildPendingSelection(context, args.state);
  const baseRequest = serializeAutoReelSetupIntoRequest(args.state, {
    id: `auto-reel-request-${Date.now()}`,
    prompt: buildPrompt(args.state, context, pendingSelection),
    mediaSelection: pendingSelection,
    targetDurationSeconds: args.state.targetDurationSeconds,
    outputSequenceName: args.state.outputSequenceName.trim(),
    styleHints: buildStyleHints(args.state),
    preferredEvents: preferredEventsForType(args.state.reelType),
    excludedClipIds: [],
    submittedAt: new Date().toISOString()
  });
  const baseRequestValidation = validateAutoReelRequest(baseRequest);

  if (!baseRequestValidation.valid || !baseRequestValidation.value) {
    throw new Error(`Auto Reel setup is invalid: ${baseRequestValidation.issues.map((issue) => `${issue.path} ${issue.message}`).join("; ")}`);
  }

  let job = createAutoReelJob(baseRequestValidation.value, `auto-reel-job-${Date.now()}`);
  jobMemory.save(job);

  log.push(`Loaded project "${context.projectName || "Unknown Project"}".`);
  log.push(`Using sequence "${context.sequenceName}" at ${formatSeconds(context.durationSeconds)} total duration.`);
  log.push(`Configured ${labelForReelType(args.state.reelType)} in ${args.state.storyMode} story mode with ${args.state.targetDurationSeconds}s target duration.`);

  job = updateJob(job, "validating", progress(1, 3, "Validating Auto Reel setup"), log, "Validated Phase 4 Auto Reel setup fields.");
  emitProgress(args.onProgress, job, log, "Validation complete. Preparing real timeline scan.");
  job = updateJob(job, "scanning", progress(0, Math.max(1, context.clipCount), "Starting real timeline/media scan"), log, "Starting real Phase 4 timeline/media scan.");
  emitProgress(args.onProgress, job, log, "Starting real timeline/media scan.");

  try {
    const scanResult = await scanAutoReelTimeline({
      projectId: args.projectId,
      sequenceId: args.sequenceId,
      sequenceName: context.sequenceName,
      timeline: context.timeline,
      state: args.state,
      projectItemOptions: context.projectItemOptions,
      signal: args.signal,
      onProgress: (scannerProgress) => {
        job = saveJob(job, {
          progress: progress(
            scannerProgress.current,
            scannerProgress.total,
            scannerProgress.message
          )
        });
        emitProgress(args.onProgress, job, log, scannerProgress.message);
      }
    });

    const request = serializeAutoReelSetupIntoRequest(args.state, {
      id: baseRequest.id,
      prompt: buildPrompt(args.state, context, scanResult.selection),
      mediaSelection: scanResult.selection,
      targetDurationSeconds: args.state.targetDurationSeconds,
      outputSequenceName: args.state.outputSequenceName.trim(),
      styleHints: buildStyleHints(args.state),
      preferredEvents: preferredEventsForType(args.state.reelType),
      excludedClipIds: [],
      submittedAt: baseRequest.submittedAt
    });
    const requestValidation = validateAutoReelRequest(request);

    if (!requestValidation.valid || !requestValidation.value) {
      throw new Error(`Auto Reel setup is invalid: ${requestValidation.issues.map((issue) => `${issue.path} ${issue.message}`).join("; ")}`);
    }

    const setupWarnings = buildSetupWarnings(args.state, context, scanResult.selection);
    const combinedWarnings = [...scanResult.warnings, ...setupWarnings];

    log.push(...scanResult.log);
    log.push(`Captured ${scanResult.descriptors.length} clip descriptors for extraction and later planning.`);
    log.push(describeSelection(scanResult.selection));
    log.push(describeMusicSource(args.state));
    log.push(describeReferences(args.state));
    log.push(describeReferenceReel(args.state));

    job = saveJob(job, {
      request: requestValidation.value,
      clips: scanResult.descriptors,
      warnings: combinedWarnings,
      progress: progress(scanResult.descriptors.length, Math.max(1, scanResult.descriptors.length), "Scanner complete. Ready for planning review")
    });
    emitProgress(args.onProgress, job, log, scanResult.planningText);

    job = updateJob(
      job,
      "extracting",
      progress(0, Math.max(1, scanResult.descriptors.length), "Starting frame and audio extraction"),
      log,
      "Starting Phase 4 frame/audio extraction with the local-only sidecar when available."
    );
    emitProgress(args.onProgress, job, log, "Starting Phase 4 frame/audio extraction.");

    const extractionStage = await runAutoReelExtractionStage({
      job,
      request: requestValidation.value,
      clips: scanResult.descriptors,
      context,
      signal: args.signal,
      onProgress: (extraction) => {
        const totalUnits = Math.max(
          1,
          extraction.progress.totalClips + extraction.progress.totalAudioTasks
        );
        const completedUnits =
          extraction.progress.completedClips + extraction.progress.completedAudioTasks;
        job = saveJob(job, {
          frameSamples: extraction.frameSamples,
          audioExtractions: extraction.audioExtractions,
          extraction,
          extractionFailures: extraction.failures,
          warnings: dedupeStrings([...combinedWarnings, ...extraction.warnings]),
          progress: progress(completedUnits, totalUnits, buildExtractionProgressMessage(extraction))
        });
        emitProgress(args.onProgress, job, log, extraction.status === "sidecar-unavailable" ? extraction.sidecar.reason || extractionStagePlanningText(extraction) : extractionStagePlanningText(extraction));
      }
    });

    log.push(...extractionStage.warnings.map((warning) => `Extraction warning: ${warning}`));
    job = saveJob(job, {
      frameSamples: extractionStage.frameSamples,
      audioExtractions: extractionStage.audioExtractions,
      extraction: extractionStage.extraction,
      extractionFailures: extractionStage.failures,
      warnings: dedupeStrings([...combinedWarnings, ...extractionStage.warnings]),
      progress: progress(
        extractionStage.extraction.progress.completedClips + extractionStage.extraction.progress.completedAudioTasks,
        Math.max(1, extractionStage.extraction.progress.totalClips + extractionStage.extraction.progress.totalAudioTasks),
        buildExtractionProgressMessage(extractionStage.extraction)
      )
    });
    emitProgress(args.onProgress, job, log, extractionStage.planningText);

    job = updateJob(job, "analyzing_vision", progress(0, Math.max(1, extractionStage.frameSamples.filter((frame) => frame.extractionStatus === "available").length), "Starting local Vision analysis"), log, "Starting Phase 5 Vision analysis using extracted frames only.");
    emitProgress(args.onProgress, job, log, "Vision analysis is local-only and uses extracted frames only. Face, wedding, emotion, Music AI, and story building are not included.");
    const vision = await runVisionPipeline({
      job,
      signal: args.signal,
      onProgress: (analysis) => {
        job = saveJob(job, {
          vision: analysis,
          visionSignals: toVisionSignals(analysis),
          warnings: dedupeStrings([...combinedWarnings, ...extractionStage.warnings, ...analysis.warnings]),
          progress: progress(analysis.progress.completedFrames, Math.max(1, analysis.progress.totalFrames), `Vision: ${analysis.progress.currentClipName || analysis.progress.currentFrameSampleId || "preparing"}. Cache ${analysis.progress.cacheHits} hit / ${analysis.progress.cacheMisses} miss.`)
        });
        emitProgress(args.onProgress, job, log, "Vision analysis is measuring extracted frames locally.");
      }
    });
    job = saveJob(job, { vision, visionSignals: toVisionSignals(vision), warnings: dedupeStrings([...combinedWarnings, ...extractionStage.warnings, ...vision.warnings]), progress: progress(vision.progress.completedFrames, Math.max(1, vision.progress.totalFrames), vision.status === "completed" ? "Vision analysis complete" : vision.warnings[0] || "Vision analysis unavailable") });
    log.push(...vision.warnings.map((warning) => `Vision warning: ${warning}`));
    job = updateJob(job, "awaiting_review", job.progress, log, vision.status === "completed" ? "Phase 5 Vision analysis complete. Face AI, Wedding AI, Emotion AI, Music AI, scoring, story building, planning, execution, and export remain not started." : "Phase 5 Vision analysis is unavailable; its truthful capability reason is retained. Later phases remain not started.");
    emitProgress(args.onProgress, job, log, vision.status === "completed" ? "Vision frame analysis complete. No Face, Wedding, Emotion, Music, or Story AI has run." : vision.warnings[0] || "Vision analysis is unavailable.");

    persistSetupDraft({
      projectId: args.projectId,
      sequenceId: args.sequenceId,
      state: args.state
    });
    persistSetupAssets(job.id, args.state);
    memory.setAnalysis(`auto-reel:request:${job.id}`, "request", requestValidation.value);
    memory.setAnalysis(`auto-reel:scan:${scanResult.selection.cacheKey}`, "result", {
      scannedAt: new Date().toISOString(),
      selection: scanResult.selection,
      descriptors: scanResult.descriptors,
      warnings: combinedWarnings
    });
    memory.setAnalysis(`auto-reel:extraction:${job.id}`, "result", extractionStage.extraction);
    memory.setAnalysis(`auto-reel:vision:${job.id}`, "result", vision);

    return {
      job,
      context,
      log,
      request: requestValidation.value,
      planningText: extractionStage.planningText
    };
  } catch (error: unknown) {
    if (isAutoReelScanCancelledError(error) || isAutoReelExtractionCancelledError(error) || error instanceof VisionPipelineCancelledError) {
      log.push("Auto Reel scan, extraction, or Vision analysis was cancelled before later phases.");
      job = updateJob(job, "cancelled", progress(job.progress.current, Math.max(1, job.progress.total), "Analysis cancelled"), log, "Auto Reel analysis cancelled before Face, Wedding, Emotion, Music, scoring, story building, or planning.");
      emitProgress(args.onProgress, job, log, "Auto Reel Vision analysis cancelled. No later AI phase ran.");
    }
    throw error;
  }
}

export function loadAutoReelSetupDraft(): AutoReelSetupDraft | null {
  const stored = memory.getAnalysis<unknown>("auto-reel:setup", "draft");
  if (!isRecord(stored) || !isRecord(stored.state)) {
    return null;
  }

  return {
    projectId: normalizeText(stored.projectId, ""),
    sequenceId: normalizeText(stored.sequenceId, ""),
    state: createDefaultAutoReelSetupState(stored.state as Partial<AutoReelSetupState>)
  };
}

function persistSetupDraft(draft: AutoReelSetupDraft): void {
  memory.setAnalysis("auto-reel:setup", "draft", draft);
}

function persistSetupAssets(jobId: string, state: AutoReelSetupState): void {
  memory.setAnalysis(`auto-reel:setup:${jobId}`, "assets", {
    references: state.references.map((reference) => ({
      id: reference.id,
      role: reference.role,
      label: reference.label,
      fileName: reference.fileName ?? ""
    })),
    referenceReelUrl: state.referenceReelUrl.trim(),
    referenceReelLocalFileName: state.referenceReelLocalFileName.trim()
  });
}

function updateJob(
  job: AutoReelJob,
  nextState: AutoReelJob["state"],
  nextProgress: AutoReelJobProgress,
  log: string[],
  line: string
): AutoReelJob {
  log.push(line);
  const updated = transitionAutoReelJob(job, nextState, { progress: nextProgress, reason: line });
  jobMemory.save(updated);
  return updated;
}

function progress(current: number, total: number, message: string): AutoReelJobProgress {
  return { current, total, message };
}

function toVisionSignals(analysis: VisionBatchAnalysis): VisionSignals[] {
  return analysis.clips.map((clip) => ({
    clipId: clip.clipId,
    source: "measured",
    confidence: clip.confidence,
    sharpness: average(clip.frames.map((frame) => frame.sharpness)),
    blur: average(clip.frames.map((frame) => frame.blurScore)),
    exposure: average(clip.frames.map((frame) => frame.exposure)),
    noise: average(clip.frames.map((frame) => frame.noiseScore)),
    cameraShake: average(clip.frames.map((frame) => frame.cameraShake)),
    motion: average(clip.frames.map((frame) => frame.motionEstimate)),
    framing: average(clip.frames.map((frame) => frame.compositionEstimate)),
    shotType: clip.frames[0]?.sceneEstimate.shotType,
    compositionNotes: clip.frames.flatMap((frame) => frame.sceneEstimate.notes),
    frameSampleIds: clip.frames.map((frame) => frame.frameSampleId)
  }));
}

function average(values: number[]): number | undefined {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : undefined;
}

async function readSequenceOptions(
  project: unknown,
  activeSequenceId: string,
  activeSequenceName: string
): Promise<AutoReelSequenceOption[]> {
  if (!isRecord(project) || typeof project.getSequences !== "function") {
    return activeSequenceName ? [{ id: activeSequenceId, name: activeSequenceName, active: true }] : [];
  }

  try {
    const raw = await project.getSequences();
    if (!Array.isArray(raw) || raw.length === 0) {
      return activeSequenceName ? [{ id: activeSequenceId, name: activeSequenceName, active: true }] : [];
    }

    return raw.map((sequence, index) => {
      const name = normalizeText(isRecord(sequence) ? sequence.name : "", `Sequence ${index + 1}`);
      const id = createSequenceId(sequence, name);
      return { id, name, active: id === activeSequenceId };
    });
  } catch {
    return activeSequenceName ? [{ id: activeSequenceId, name: activeSequenceName, active: true }] : [];
  }
}

function flattenTimelineClips(
  timeline: Awaited<ReturnType<PremiereBridge["readTimeline"]>>,
  selectedClips: BrainClip[]
): BrainClip[] {
  if (!timeline) {
    return selectedClips;
  }

  return [...timeline.videoTracks, ...timeline.audioTracks].flatMap((track) =>
    track.clips.map((clip) => ({
      id: clip.id,
      name: clip.name,
      start: clip.start,
      end: clip.end,
      duration: clip.duration,
      track: clip.trackIndex,
      mediaType: clip.mediaType,
      type: track.type,
      projectItemId: clip.projectItemId ?? undefined
    }))
  );
}

function buildSelectedClips(timeline: TimelineState | null, fallbackSelectedClips: BrainClip[]): BrainClip[] {
  if (!timeline) {
    return fallbackSelectedClips;
  }

  return [...timeline.videoTracks, ...timeline.audioTracks]
    .flatMap((track) =>
      track.clips
        .filter((clip) => clip.selected)
        .map((clip) => ({
          id: clip.id,
          name: clip.name,
          start: clip.start,
          end: clip.end,
          duration: clip.duration,
          track: clip.trackIndex,
          mediaType: clip.mediaType,
          type: track.type,
          projectItemId: clip.projectItemId ?? undefined
        }))
    );
}

function buildPendingSelection(
  context: AutoReelSetupContext,
  state: AutoReelSetupState
): MediaSelection {
  return {
    mode: state.sourceMode,
    projectId: context.activeProjectId,
    sequenceId: context.activeSequenceId,
    sequenceName: context.sequenceName,
    clipIds: [],
    projectItemIds: [],
    inPointSeconds: context.inPointSeconds,
    outPointSeconds: context.outPointSeconds,
    usedFallback: false,
    sequenceResolution: context.frameSize,
    fps: context.fps || null,
    timebase: context.timebase,
    playheadSeconds: context.timeline?.playhead ?? null,
    selectedClipCount: context.selectedClipCount,
    scannedClipCount: 0,
    mediaFingerprint: "pending-scan",
    cacheKey: "pending-scan",
    capabilityNotes: []
  };
}

function buildSetupWarnings(
  state: AutoReelSetupState,
  context: AutoReelSetupContext,
  selection: MediaSelection
): string[] {
  const warnings: string[] = [];

  if (selection.usedFallback) {
    warnings.push("The requested source mode did not resolve a full clip set, so Auto Reel recorded a fallback state.");
  }
  if (context.lockedTrackSupport === "unavailable") {
    warnings.push("This host session does not expose locked-track state yet. The include/exclude locked tracks toggle is recorded but not enforced.");
  }
  if (state.musicSourceMode === "project-item" && !state.musicProjectItemId) {
    warnings.push("No Premiere project audio item is selected yet.");
  }
  if (state.musicSourceMode === "social-reference") {
    warnings.push("Social music links remain reference-only and will not be downloaded or analyzed as source audio.");
  }
  if (!state.references.some((reference) => Boolean(reference.fileName))) {
    warnings.push("No person reference images are attached yet.");
  }
  if (!state.referenceReelUrl.trim() && !state.referenceReelLocalFileName.trim()) {
    warnings.push("No reference reel is attached yet.");
  }

  return warnings;
}

function saveJob(job: AutoReelJob, patch: Partial<AutoReelJob>): AutoReelJob {
  const updated: AutoReelJob = {
    ...job,
    ...patch,
    updatedAt: new Date().toISOString()
  };
  jobMemory.save(updated);
  return updated;
}

function emitProgress(
  onProgress: ((update: { job: AutoReelJob; log: string[]; planningText: string }) => void) | undefined,
  job: AutoReelJob,
  log: string[],
  planningText: string
): void {
  onProgress?.({
    job,
    log: [...log],
    planningText
  });
}

function extractionStagePlanningText(extraction: { status: string; sidecar: { reason?: string } }): string {
  if (extraction.status === "sidecar-unavailable") {
    return extraction.sidecar.reason || "Frame/audio extraction is unavailable because the local sidecar is not reachable.";
  }
  return "Frame/audio extraction is running. Later Vision AI, Music AI, scoring, story building, and planning phases remain disabled.";
}

function dedupeStrings(values: string[]): string[] {
  return values.filter((value, index) => values.indexOf(value) === index);
}

function buildPrompt(state: AutoReelSetupState, context: AutoReelSetupContext, selection: MediaSelection): string {
  return [
    `Create a ${labelForReelType(state.reelType)} for ${context.sequenceName}.`,
    `Use ${selection.mode.replaceAll("-", " ")} as the source mode.`,
    `Target duration ${state.targetDurationSeconds} seconds.`,
    `Story mode ${state.storyMode}, style ${state.style}, balance ${state.balanceTarget}, energy ${state.energy}.`,
    `Output sequence ${state.outputSequenceName.trim()}.`
  ].join(" ");
}

function buildStyleHints(state: AutoReelSetupState): string[] {
  return [
    labelForReelType(state.reelType),
    `style:${state.style}`,
    `story:${state.storyMode}`,
    `emotion:${state.emotionPriority}`,
    `balance:${state.balanceTarget}`,
    `energy:${state.energy}`,
    `cuts:${state.cutDensity}`,
    `transition:${state.transitionIntensity}`,
    `motion:${state.motionIntensity}`,
    `sfx:${state.sfxIntensity}`,
    `color:${state.colorIntensity}`,
    `music:${state.musicSourceMode}`
  ];
}

function preferredEventsForType(reelType: AutoReelType): string[] {
  switch (reelType) {
    case "cinematic-reel":
      return ["Bride Entry", "Varmala", "Pheras", "Decor", "Drone"];
    case "emotional-reel":
      return ["Bride Entry", "Varmala", "Pheras", "Reception"];
    case "couple-reel":
      return ["Couple Portrait", "Bride Entry", "Varmala"];
    case "dance-reel":
      return ["Sangeet", "Baraat", "Reception", "Dance"];
    case "reception-reel":
      return ["Reception", "Cake", "Dance"];
    default:
      return ["Bride Entry", "Varmala", "Pheras", "Reception"];
  }
}

function describeSelection(selection: MediaSelection): string {
  return `Resolved ${selection.clipIds.length} clips from ${selection.mode.replaceAll("-", " ")}${selection.usedFallback ? " with fallback" : ""}.`;
}

function describeMusicSource(state: AutoReelSetupState): string {
  switch (state.musicSourceMode) {
    case "local-file":
      return state.musicLocalFileName
        ? `Music source set to local file "${state.musicLocalFileName}".`
        : "Music source is configured for a local file, but no file is selected yet.";
    case "project-item":
      return state.musicProjectItemId
        ? `Music source set to Premiere project item "${state.musicProjectItemId}".`
        : "Music source is configured for a Premiere project item, but no item is selected yet.";
    case "authorized-direct-url":
      return `Music source set to authorized direct URL ${state.musicDirectUrl.trim() || "(missing URL)"}.`;
    case "social-reference":
      return `Music source uses social reference-only link ${state.musicSocialReferenceUrl.trim() || "(missing URL)"} with no download or licensed use implied.`;
    default:
      return "Music source is disabled. Auto Reel will plan without music-driven timing.";
  }
}

function describeReferences(state: AutoReelSetupState): string {
  const attached = state.references.filter((reference) => reference.fileName);
  return attached.length > 0
    ? `Reference images attached: ${attached.map((reference) => `${reference.label} (${reference.fileName})`).join(", ")}.`
    : "No bride, groom, family, or custom reference image is attached yet.";
}

function describeReferenceReel(state: AutoReelSetupState): string {
  if (state.referenceReelLocalFileName.trim()) {
    return `Reference reel file attached: ${state.referenceReelLocalFileName.trim()} (reference only).`;
  }

  if (state.referenceReelUrl.trim()) {
    return `Reference reel URL attached: ${state.referenceReelUrl.trim()} (reference only).`;
  }

  return "No reference reel attached yet.";
}

function createProjectId(name: string): string {
  return name ? `project:${name}` : "project:active";
}

function createSequenceId(sequence: unknown, fallbackName: string): string {
  if (isRecord(sequence)) {
    const guid = normalizeText(sequence.guid, "");
    if (guid) {
      return `sequence:${guid}`;
    }
    const id = normalizeText(sequence.id, "");
    if (id) {
      return `sequence:${id}`;
    }
  }

  return `sequence:${fallbackName || "active"}`;
}

function labelForReelType(reelType: AutoReelType): string {
  switch (reelType) {
    case "cinematic-reel":
      return "Cinematic Reel";
    case "emotional-reel":
      return "Emotional Reel";
    case "couple-reel":
      return "Couple Reel";
    case "dance-reel":
      return "Dance Reel";
    case "reception-reel":
      return "Reception Reel";
    default:
      return "Wedding Highlight";
  }
}

function formatSeconds(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  return [hours, minutes, remainder].map((value) => String(value).padStart(2, "0")).join(":");
}

function normalizeText(value: unknown, fallback: string): string {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
