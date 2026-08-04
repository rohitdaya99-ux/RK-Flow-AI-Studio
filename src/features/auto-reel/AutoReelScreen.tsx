import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, StatusChip } from "../../ui/theme/primitives";
import { spacing } from "../../ui/theme";
import { AutoReelJob } from "./models";
import { isAutoReelExtractionCancelledError } from "./autoReelExtractionService";
import { isAutoReelScanCancelledError } from "./autoReelScanner";
import { VisionPipelineCancelledError } from "./visionPipeline";
import {
  AutoReelReferenceFileState,
  AutoReelSetupState,
  createDefaultAutoReelSetupState,
  fieldFlex,
  getAutoReelEffectiveWidth,
  getAutoReelLayoutMode,
  serializeAutoReelSetupIntoRequest,
  validateAutoReelSetupState
} from "./autoReelSetupConfig";
import {
  AutoReelSetupContext,
  createSetupStateFromDraft,
  loadAutoReelSetupContext,
  loadAutoReelSetupDraft,
  runAutoReelSetup
} from "./autoReelSetupService";
import {
  AutoReelConfigurationSection,
  AutoReelPlanningPanel,
  AutoReelRequestPreview,
  AutoReelSourceSection,
  MusicSourcePicker,
  PersonReferenceManager,
  ReferenceReelInput
} from "./AutoReelSections";
import { glassCardStyle, sectionWrapStyle, titleCase } from "./AutoReelUi";

export default function AutoReelScreen() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const runAbortRef = useRef<AbortController | null>(null);
  const [context, setContext] = useState<AutoReelSetupContext | null>(null);
  const [projectId, setProjectId] = useState("");
  const [sequenceId, setSequenceId] = useState("");
  const [state, setState] = useState<AutoReelSetupState>(() => createDefaultAutoReelSetupState());
  const [job, setJob] = useState<AutoReelJob | null>(null);
  const [requestPreview, setRequestPreview] = useState<string>("");
  const [planningText, setPlanningText] = useState("Idle. Configure Auto Reel setup to run extraction followed by local Vision analysis of extracted frames.");
  const [log, setLog] = useState<string[]>(["Waiting for Premiere context..."]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [panelWidth, setPanelWidth] = useState<number | null>(null);

  useEffect(() => {
    void refreshContext();
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }

    const syncWidth = () => {
      const nextWidth = Math.round(node.getBoundingClientRect().width);
      if (nextWidth > 0) {
        setPanelWidth((current) => (current === nextWidth ? current : nextWidth));
      }
    };

    syncWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", syncWidth);
      return () => window.removeEventListener("resize", syncWidth);
    }

    const resizeObserver = new ResizeObserver(() => syncWidth());
    resizeObserver.observe(node);
    return () => resizeObserver.disconnect();
  }, []);

  const workspaceWidth = useMemo(
    () => getAutoReelEffectiveWidth(panelWidth, window.innerWidth),
    [panelWidth]
  );
  const layoutMode = useMemo(() => getAutoReelLayoutMode(workspaceWidth), [workspaceWidth]);
  const fieldBasis = fieldFlex(layoutMode);
  const errors = useMemo(
    () =>
      validateAutoReelSetupState(state, {
        availableClipCount: context?.clipCount ?? 0,
        selectedClipCount: context?.selectedClipCount ?? 0,
        availableProjectItemIds: context?.projectItemOptions.map((item) => item.id) ?? [],
        availableManualClipIds: context?.manualClipOptions.map((clip) => clip.id) ?? []
      }),
    [context, state]
  );
  async function refreshContext() {
    setLoading(true);
    setError("");

    try {
      const nextContext = await loadAutoReelSetupContext();
      const draft = loadAutoReelSetupDraft();
      const nextState = createSetupStateFromDraft(draft, nextContext);
      setContext(nextContext);
      setProjectId(draft?.projectId || nextContext.activeProjectId);
      setSequenceId(draft?.sequenceId || nextContext.activeSequenceId);
      setState(nextState);
      setPlanningText(buildPlanningText(nextState, nextContext, "idle"));
      setLog([`Loaded Premiere context for ${nextContext.projectName || "Unknown Project"} / ${nextContext.sequenceName || "No active sequence"}.`]);
      setRequestPreview(
        JSON.stringify(
          serializeAutoReelSetupIntoRequest(nextState, buildRequestBase(nextState, nextContext)),
          null,
          2
        )
      );
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not read Premiere context.");
      setLog(["Could not load Premiere context."]);
    } finally {
      setLoading(false);
    }
  }

  function patchState(patch: Partial<AutoReelSetupState>) {
    setState((current) => {
      const next = { ...current, ...patch };
      if (context) {
        setPlanningText(buildPlanningText(next, context, running ? "loading" : "idle"));
        setRequestPreview(
          JSON.stringify(
            serializeAutoReelSetupIntoRequest(next, buildRequestBase(next, context)),
            null,
            2
          )
        );
      }
      return next;
    });
  }

  function toggleListValue(key: "selectedProjectItemIds" | "manualClipIds", value: string) {
    setState((current) => {
      const list = current[key];
      const nextList = list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];
      const next = { ...current, [key]: nextList };
      if (context) {
        setPlanningText(buildPlanningText(next, context, running ? "loading" : "idle"));
        setRequestPreview(JSON.stringify(serializeAutoReelSetupIntoRequest(next, buildRequestBase(next, context)), null, 2));
      }
      return next;
    });
  }

  function updateReference(referenceId: string, update: Partial<AutoReelReferenceFileState>) {
    setState((current) => {
      const next = {
        ...current,
        references: current.references.map((reference) =>
          reference.id === referenceId ? { ...reference, ...update } : reference
        )
      };
      if (context) {
        setPlanningText(buildPlanningText(next, context, running ? "loading" : "idle"));
        setRequestPreview(JSON.stringify(serializeAutoReelSetupIntoRequest(next, buildRequestBase(next, context)), null, 2));
      }
      return next;
    });
  }

  function addCustomReference() {
    setState((current) => ({
      ...current,
      references: [
        ...current.references,
        {
          id: `custom-reference-${Date.now()}`,
          role: "custom",
          label: `Custom Person ${current.references.filter((reference) => reference.role === "custom").length + 1}`
        }
      ]
    }));
  }

  function removeReference(referenceId: string) {
    setState((current) => ({
      ...current,
      references: current.references.filter((reference) => reference.id !== referenceId)
    }));
  }

  async function handleRunSetup() {
    if (!context) {
      setError("Premiere context is not ready yet.");
      return;
    }

    if (errors.general.length > 0 || Object.keys(errors.fields).length > 0) {
      setError("Fix the inline setup errors before starting Auto Reel.");
      setPlanningText(buildPlanningText(state, context, "error"));
      return;
    }

    setRunning(true);
    setError("");
    setPlanningText("Preparing real timeline/media scan, extraction, and local Vision analysis of extracted frames.");
    setLog(["Starting real timeline/media scan..."]);

    const controller = new AbortController();
    runAbortRef.current = controller;

    try {
      const result = await runAutoReelSetup({
        projectId,
        sequenceId,
        state,
        signal: controller.signal,
        onProgress: (update) => {
          setJob(update.job);
          setLog(update.log);
          setPlanningText(update.planningText);
          setRequestPreview(JSON.stringify(update.job.request, null, 2));
        }
      });
      setContext(result.context);
      setJob(result.job);
      setLog(result.log);
      setRequestPreview(JSON.stringify(result.request, null, 2));
      setPlanningText(result.planningText);
    } catch (cause) {
      if (isAutoReelScanCancelledError(cause) || isAutoReelExtractionCancelledError(cause) || cause instanceof VisionPipelineCancelledError) {
        setError("");
        setPlanningText("Auto Reel analysis cancelled. No later AI phase ran.");
      } else {
        const message = cause instanceof Error ? cause.message : "Auto Reel setup failed.";
        setError(message);
        setLog((current) => [...current, message]);
        setPlanningText(buildPlanningText(state, context, "error"));
      }
    } finally {
      runAbortRef.current = null;
      setRunning(false);
    }
  }

  function handleCancelRun() {
    runAbortRef.current?.abort();
  }

  return (
    <div ref={rootRef} style={{ display: "flex", flexDirection: "column", gap: spacing.lg, minWidth: 0, width: "100%" }}>
      <Card
        title="Auto Reel"
        subtitle="Extraction and Phase 5 local Vision analysis inside the existing workstation. Vision reads extracted frames only and stops before Face, Wedding, Emotion, Music, Story, planning, or execution."
        style={glassCardStyle}
      >
        <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", alignItems: "center" }}>
          <StatusChip label={loading ? "Loading context" : context?.connected ? "Premiere connected" : "Premiere not ready"} tone={loading ? "warning" : context?.connected ? "success" : "danger"} />
          <StatusChip label={context?.projectName || "No active project"} tone={context?.projectName ? "neutral" : "warning"} />
          <StatusChip label={context?.sequenceName || "No active sequence"} tone={context?.sequenceName ? "neutral" : "warning"} />
          <StatusChip label={`Layout ${layoutMode}`} tone="neutral" />
          <StatusChip label={job ? `Setup ${job.state}` : "Setup idle"} tone={job ? "success" : "neutral"} />
          <StatusChip label={job?.extraction?.sidecar.status === "available" ? "Sidecar available" : "Sidecar unavailable"} tone={job?.extraction?.sidecar.status === "available" ? "success" : "danger"} />
        </div>
      </Card>

      <div style={sectionWrapStyle}>
        <AutoReelSourceSection
          context={context}
          projectId={projectId}
          sequenceId={sequenceId}
          state={state}
          fieldBasis={fieldBasis}
          loading={loading}
          running={running}
          errors={errors}
          onProjectId={setProjectId}
          onSequenceId={setSequenceId}
          onPatchState={patchState}
          onToggleListValue={toggleListValue}
        />
      </div>

      <AutoReelConfigurationSection state={state} fieldBasis={fieldBasis} loading={loading} running={running} errors={errors} onPatchState={patchState} />

      <MusicSourcePicker context={context} state={state} fieldBasis={fieldBasis} loading={loading} running={running} errors={errors} onPatchState={patchState} />

      <PersonReferenceManager
        state={state}
        layoutMode={layoutMode}
        loading={loading}
        running={running}
        onUpdateReference={updateReference}
        onAddCustomReference={addCustomReference}
        onRemoveReference={removeReference}
      />

      <ReferenceReelInput state={state} fieldBasis={fieldBasis} loading={loading} running={running} error={errors.fields.referenceReel} onPatchState={patchState} />

      <AutoReelPlanningPanel planningText={planningText} phases={buildPhaseRows(job, running, error)} error={error} />

      <AutoReelRequestPreview job={job} panelWidth={workspaceWidth} requestPreview={requestPreview} log={log} />

      <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
        <Button onClick={() => void handleRunSetup()} disabled={loading || running || !context?.connected}>
          {running ? "Running Vision Pipeline..." : "Start Auto Reel Vision Pipeline"}
        </Button>
        {running && (
          <Button variant="secondary" onClick={handleCancelRun}>
            Cancel Analysis
          </Button>
        )}
        <Button variant="secondary" onClick={() => void refreshContext()} disabled={loading || running}>
          Refresh Premiere Context
        </Button>
      </div>
    </div>
  );
}

function buildRequestBase(state: AutoReelSetupState, context: AutoReelSetupContext) {
  return {
    id: "preview-request",
    prompt: `Prepare ${state.reelType} setup for ${context.sequenceName || "Auto Reel"}.`,
    mediaSelection: {
      mode: state.sourceMode,
      projectId: context.activeProjectId,
      sequenceId: context.activeSequenceId,
      sequenceName: context.sequenceName,
      clipIds: [],
      projectItemIds: state.selectedProjectItemIds,
      inPointSeconds: context.inPointSeconds,
      outPointSeconds: context.outPointSeconds,
      usedFallback: false,
      sequenceResolution: context.frameSize,
      fps: context.fps || null,
      timebase: context.timebase,
      playheadSeconds: context.timeline?.playhead ?? null,
      selectedClipCount: context.selectedClipCount,
      scannedClipCount: 0,
      mediaFingerprint: "preview-request",
      cacheKey: "preview-request",
      capabilityNotes: []
    },
    targetDurationSeconds: state.targetDurationSeconds,
    outputSequenceName: state.outputSequenceName.trim() || "Auto Reel",
    styleHints: [state.style, state.storyMode, state.energy],
    preferredEvents: [],
    excludedClipIds: [],
    submittedAt: new Date("2026-08-04T00:00:00.000Z").toISOString()
  };
}

function buildPlanningText(
  state: AutoReelSetupState,
  context: AutoReelSetupContext,
  status: "idle" | "loading" | "success" | "error"
): string {
  const base = [
    `${titleCase(state.reelType)} scanner for ${context.sequenceName || "no active sequence"}.`,
    `Source mode: ${state.sourceMode.replaceAll("-", " ")}.`,
    `Target duration: ${state.targetDurationSeconds}s at ${state.aspectRatio}.`,
    `Style: ${state.style}. Story mode: ${state.storyMode}. Energy: ${state.energy}.`,
    `Music mode: ${state.musicSourceMode}. Clip audio extraction: ${state.extractClipAudio ? "requested" : "disabled"}. Output sequence: ${state.outputSequenceName || "Auto Reel"}.`
  ].join(" ");

  if (status === "loading") {
    return `${base} Real timeline/media scanning and approved-path extraction are running with truthful host metadata only.`;
  }
  if (status === "success") {
    return `${base} Real scanning, extraction, and generic local Vision analysis completed. Face, Wedding, Emotion, Music, Story, planning, and execution remain disabled.`;
  }
  if (status === "error") {
    return `${base} Scanning, extraction, or Vision analysis is blocked by validation or runtime errors. No later analysis results were generated.`;
  }
  return `${base} No real scan has run yet. This panel prepares the existing extraction request and Phase 5 Vision stage.`;
}

function buildPhaseRows(job: AutoReelJob | null, running: boolean, error: string) {
  const state = job?.state ?? "idle";
  return [
    phaseRow("Setup Validation", running || state !== "idle" ? (error ? "error" : state === "idle" ? "idle" : "success") : "idle", "Validates durations, URLs, clip-count rules, and source choices."),
    phaseRow("Timeline Scan", state === "scanning" ? "loading" : state === "extracting" || state === "analyzing_vision" || state === "awaiting_review" ? "success" : "idle", "Reads selected clips, sequence clips, In/Out overlaps, and project-item matches from the active Premiere host."),
    phaseRow("Descriptor Capture", state === "extracting" || state === "analyzing_vision" || state === "awaiting_review" ? "success" : running ? "loading" : "idle", "Serializes truthful ClipDescriptor and MediaSelection output with capability notes and cache keys."),
    phaseRow("Frame / Audio Extraction", state === "extracting" ? "loading" : state === "analyzing_vision" || state === "awaiting_review" ? "success" : "idle", "Extracts sampled frames and audio proxies only from approved verified local paths, with truthful cache and fallback reporting."),
    phaseRow("Reference Capture", job ? "success" : "idle", "Stores music, people, and reference-reel metadata only. No face, emotion, wedding, music, scoring, or planning analysis runs yet."),
    phaseRow("Vision Analysis", state === "analyzing_vision" ? "loading" : job?.vision?.status === "completed" ? "success" : job?.vision ? "error" : "idle", "Measures generic visual quality and scene cues from extracted frames only, with per-metric confidence and cache reporting."),
    phaseRow("Face / Wedding / Emotion / Music / Story", "idle", "Not started in Phase 5.")
  ];
}

function phaseRow(title: string, status: "idle" | "loading" | "success" | "error", detail: string) {
  return {
    title,
    status,
    detail,
    tone:
      status === "success"
        ? "success"
        : status === "loading"
          ? "warning"
          : status === "error"
            ? "danger"
            : "neutral" as "neutral" | "success" | "warning" | "danger"
  };
}
