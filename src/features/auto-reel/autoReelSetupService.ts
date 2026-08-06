
import { MemoryEngine } from "../../core/brain";
import { BrainClip } from "../../core/brain/types";
import { PremiereBridge } from "../../premiere/PremiereBridge";
import { premiereAPI } from "../../services/PremiereAPI";
import { TimelineState } from "../../types/Timeline";
import { getPromptReelMusicOptions } from "../prompt-reel/promptReelService";
import { AutoReelJobMemory } from "./AutoReelJobMemory";
import {
  buildExtractionProgressMessage,
  runAutoReelExtractionStage,
} from "./autoReelExtractionService";
import {
  scanAutoReelTimeline,
} from "./autoReelScanner";
import {
  runVisionPipeline,
} from "./visionPipeline";
import { runFacePipeline } from "./facePipeline";
import {
  runEmotionPipeline,
} from "./emotionPipeline";
import { runMusicAnalysisPipeline } from "./autoReelMusicService";
import { runScoringPipeline } from "./autoReelScoringService";
import {
  AutoReelJob,
  AutoReelRequest,
  createAutoReelJob,
  transitionAutoReelJob,
} from "./models";
import {
  AutoReelSetupState,
  createDefaultAutoReelSetupState,
  serializeAutoReelSetupIntoRequest,
} from "./autoReelSetupConfig";
// Removed unused validateAutoReelRequest

const memory = new MemoryEngine();
const jobMemory = new AutoReelJobMemory(memory);

export interface AutoReelSetupContext {
  connected: boolean;
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
  timebase: number;
  frameSize: { width: number; height: number };
  projectOptions: Array<{ id: string; name: string; active: boolean }>;
  sequenceOptions: Array<{ id: string; name: string; active: boolean }>;
  projectItemOptions: Array<{
    id: string;
    label: string;
    type: "bin" | "clip";
    ancestorIds: string[];
    mediaPath?: string;
  }>;
  manualClipOptions: Array<{
    id: string;
    label: string;
    startSeconds: number;
    endSeconds: number;
    mediaType: "video" | "audio";
  }>;
  musicOptions: Array<{ id: string; label: string; source: "project-item" }>;
  selectedClips: BrainClip[];
  sequenceClips: BrainClip[];
  timeline: TimelineState | null;
  lockedTrackSupport: "unavailable" | "available";
}

export function loadAutoReelSetupDraft(): Partial<AutoReelSetupState> | null {
  try {
    const draft = localStorage.getItem("autoReelSetupDraft");
    return draft ? JSON.parse(draft) : null;
  } catch {
    return null;
  }
}

export function saveAutoReelSetupDraft(state: AutoReelSetupState) {
  localStorage.setItem("autoReelSetupDraft", JSON.stringify(state));
}

export function createSetupStateFromDraft(
  draft: Partial<AutoReelSetupState> | null
): AutoReelSetupState {
  const defaultState = createDefaultAutoReelSetupState();
  return {
    ...defaultState,
    ...draft,
  };
}

export async function loadAutoReelSetupContext(): Promise<AutoReelSetupContext> {
  const api = premiereAPI;
  const bridge = new PremiereBridge();

  const activeProject = await api.getCurrentProject();
  const activeSequence = await api.getActiveSequence();
  const timeline = await bridge.readTimeline();
  const promptReelMusic = await getPromptReelMusicOptions();

  // In Premiere UXP, we often only have access to the active project easily.
  // We mock a list of 1 if active, else empty.
  const projects = activeProject ? [{ id: activeProject.id || activeProject.name || "proj-1", name: activeProject.name }] : [];
  
  // Try to get all sequences if supported, else just list the active one
  let sequences = [];
  try {
    if (activeProject && typeof activeProject.getSequences === "function") {
      sequences = await activeProject.getSequences();
    } else if (activeSequence) {
      sequences = [activeSequence];
    }
  } catch (err) {
    if (activeSequence) sequences = [activeSequence];
  }

  const context: AutoReelSetupContext = {
    connected: bridge.isConnected(),
    activeProjectId: activeProject?.guid || activeProject?.id || activeProject?.name || "proj-1",
    activeSequenceId: activeSequence?.guid || activeSequence?.id || activeSequence?.name || "seq-1",
    projectName: activeProject?.name || "No active project",
    sequenceName: activeSequence?.name || "No active sequence",
    clipCount: timeline?.videoTracks.reduce((acc, t) => acc + t.clips.length, 0) || 0,
    selectedClipCount: timeline?.videoTracks.reduce((acc, t) => acc + t.clips.filter(c => c.selected).length, 0) || 0,
    inPointSeconds: activeSequence?.inPointSeconds || 0,
    outPointSeconds: activeSequence?.outPointSeconds || 0,
    durationSeconds: activeSequence?.durationSeconds || 0,
    fps: activeSequence?.fps || 25,
    timebase: activeSequence?.timebase || 25,
    frameSize: activeSequence?.frameSize || { width: 1920, height: 1080 },
    projectOptions: projects.map((p: any) => ({
      id: p.guid || p.id || p.name || "proj-1",
      name: p.name,
      active: (p.guid || p.id || p.name) === (activeProject?.guid || activeProject?.id || activeProject?.name)
    })),
    sequenceOptions: sequences.map((s: any) => ({
      id: s.guid || s.id || s.name || "seq-1",
      name: s.name,
      active: (s.guid || s.id || s.name) === (activeSequence?.guid || activeSequence?.id || activeSequence?.name)
    })),
    projectItemOptions: [], // Placeholder
    manualClipOptions: [], // Placeholder
    musicOptions: promptReelMusic.map((m: any) => ({
      id: m.projectItemId,
      label: m.name,
      source: "project-item",
    })),
    selectedClips: [], // Placeholder for BrainClip[]
    sequenceClips: [], // Placeholder for BrainClip[]
    timeline: timeline as any,
    lockedTrackSupport: "unavailable",
  };
  return context;
}

export async function runAutoReelSetup(args: {
  projectId: string;
  sequenceId: string;
  state: AutoReelSetupState;
  signal: AbortSignal;
  onProgress: (update: {
    job: AutoReelJob;
    log: string[];
    planningText: string;
  }) => void;
}): Promise<{
  job: AutoReelJob;
  request: AutoReelRequest;
  context: AutoReelSetupContext;
  log: string[];
  planningText: string;
}> {
  const { projectId, sequenceId, state, signal, onProgress } = args;

  const context = await loadAutoReelSetupContext();

  const request = serializeAutoReelSetupIntoRequest(
    state,
    {
      id: "placeholder-id",
      prompt: "placeholder-prompt",
      mediaSelection: {
        mode: state.sourceMode,
        projectId: projectId,
        sequenceId: sequenceId,
        sequenceName: context.sequenceName,
        clipIds: [],
        projectItemIds: state.selectedProjectItemIds,
        inPointSeconds: context.inPointSeconds,
        outPointSeconds: context.outPointSeconds,
        usedFallback: false,
        sequenceResolution: context.frameSize,
        fps: context.fps,
        timebase: context.timebase,
        playheadSeconds: context.timeline?.playhead ?? 0,
        selectedClipCount: context.selectedClipCount,
        scannedClipCount: 0,
        mediaFingerprint: "placeholder-fingerprint",
        cacheKey: "placeholder-cache-key",
        capabilityNotes: [],
      },
      targetDurationSeconds: state.targetDurationSeconds,
      outputSequenceName: state.outputSequenceName,
      styleHints: [],
      preferredEvents: [],
      excludedClipIds: [],
      submittedAt: new Date().toISOString(),
    }
  );

  let job = createAutoReelJob(request, `job-${Date.now()}`);
  jobMemory.save(job);

  const updateProgress = (
    updatedJob: AutoReelJob,
    logMessage: string,
    planningText: string
  ) => {
    job = updatedJob;
    jobMemory.save(job);
    onProgress({ job, log: [logMessage], planningText });
  };

  try {
    // 1. Scanning
    job = transitionAutoReelJob(job, "scanning");
    updateProgress(job, "Scanning timeline...", "Phase 1: Scanning timeline for clips.");
    const scanResult = await scanAutoReelTimeline({
      projectId: context.activeProjectId,
      sequenceId: context.activeSequenceId,
      sequenceName: context.sequenceName,
      timeline: context.timeline!,
      state: { ...createDefaultAutoReelSetupState(), ...job.request.setup } as AutoReelSetupState,
      projectItemOptions: [],
      signal,
      onProgress: (progress) => {
        updateProgress(job, `Scanning: ${progress.message}`, `Phase 1: ${progress.message}`);
      }
    });
    job = { ...job, clips: scanResult.descriptors };
    updateProgress(job, "Scan complete.", "Phase 1: Scan complete.");

    // 2. Extraction
    job = transitionAutoReelJob(job, "extracting");
    updateProgress(job, "Extracting frames...", "Phase 2: Extracting frames from clips.");
    const extractionResult = await runAutoReelExtractionStage({
      job,
      request: job.request,
      clips: job.clips,
      context,
      onProgress: (progress) => {
        const progressMsg = buildExtractionProgressMessage(progress);
        updateProgress(job, progressMsg, `Phase 2: ${progressMsg}`);
      },
      signal,
    });

    job = {
      ...job,
      extraction: extractionResult.extraction,
      frameSamples: extractionResult.frameSamples,
      audioExtractions: extractionResult.audioExtractions,
      extractionFailures: [...job.extractionFailures, ...extractionResult.failures],
      warnings: [...job.warnings, ...extractionResult.warnings]
    };
    updateProgress(job, "Extraction complete.", "Phase 2: Extraction complete.");

    const skipDeepAnalysis = job.request.setup?.scoringPresetId === "technical" || job.customScoringProfile?.id === "technical-v1";

    if (!skipDeepAnalysis) {
      // 3. Vision Analysis
      job = transitionAutoReelJob(job, "analyzing_vision");
      updateProgress(job, "Analyzing vision...", "Phase 3: Analyzing vision.");
      const visionResult = await runVisionPipeline({ job, signal });
      job = { ...job, vision: visionResult };
      updateProgress(job, "Vision analysis complete.", "Phase 3: Vision analysis complete.");

      // 4. Face Analysis
      job = transitionAutoReelJob(job, "analyzing_faces");
      updateProgress(job, "Analyzing faces...", "Phase 4: Analyzing faces.");
      const faceResult = await runFacePipeline({ job, signal });
      job = { ...job, face: faceResult };
      updateProgress(job, "Face analysis complete.", "Phase 4: Face analysis complete.");

      // 5. Emotion Analysis
      job = transitionAutoReelJob(job, "analyzing_emotion");
      updateProgress(job, "Analyzing emotions...", "Phase 5: Analyzing emotions.");
      const emotionResult = await runEmotionPipeline({ job, signal });
      job = { ...job, emotion: emotionResult };
      updateProgress(job, "Emotion analysis complete.", "Phase 5: Emotion analysis complete.");

      // 6. Music Analysis
      job = transitionAutoReelJob(job, "analyzing_music");
      updateProgress(job, "Analyzing music...", "Phase 6: Analyzing music.");
      job = await runMusicAnalysisPipeline(job);
      updateProgress(job, "Music analysis complete.", "Phase 6: Music analysis complete.");
    } else {
      updateProgress(job, "Skipping deep analysis (Technical Only).", "Phases 3-6 skipped due to Technical Only scoring profile.");
    }

    // 7. Scoring
    job = transitionAutoReelJob(job, "scoring");
    updateProgress(job, "Scoring clips...", "Phase 7: Scoring clips.");
    job = await runScoringPipeline(job);
    updateProgress(job, "Scoring complete.", "Phase 7: Scoring complete.");
    
    job = transitionAutoReelJob(job, "awaiting_review");
    updateProgress(job, "Pipeline complete.", "All analysis phases are complete. Awaiting review.");

    return {
      job,
      request,
      context,
      log: ["Pipeline complete."],
      planningText: "All analysis phases are complete. Awaiting review.",
    };
  } catch (error) {
    const message = (error as Error).message;
    job = transitionAutoReelJob(job, "failed", { reason: message });
    updateProgress(job, `Pipeline failed: ${message}`, `Error: ${message}`);
    throw error;
  }
}
