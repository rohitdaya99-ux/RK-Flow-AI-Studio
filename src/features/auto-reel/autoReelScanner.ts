import type { TimelineClip, TimelineState, TimelineTrackType } from "../../types/Timeline";
import type { AutoReelSetupState } from "./autoReelSetupConfig";
import type {
  AutoReelCapabilityNote,
  AutoReelMetadataStatus,
  ClipDescriptor,
  ClipMediaType,
  MediaSelection
} from "./models";
import { hashStableText } from "./autoReelExtractionUtils";

export class AutoReelScanCancelledError extends Error {
  public constructor(message = "Auto Reel scan cancelled.") {
    super(message);
    this.name = "AutoReelScanCancelledError";
  }
}

export interface AutoReelScannerProjectItemOption {
  id: string;
  label: string;
  type: string;
  mediaPath?: string;
  projectItemId?: string | null;
  nodeId?: string | null;
  ancestorIds?: string[];
}

export interface AutoReelScannerProgress {
  phase: "resolving-source" | "scanning-clips" | "complete";
  current: number;
  total: number;
  percent: number;
  message: string;
  clipName?: string;
  included: number;
  excluded: number;
}

export interface AutoReelScannerResult {
  selection: MediaSelection;
  descriptors: ClipDescriptor[];
  warnings: string[];
  log: string[];
  planningText: string;
}

export interface AutoReelScannerInput {
  projectId: string;
  sequenceId: string;
  sequenceName: string;
  timeline: TimelineState;
  state: AutoReelSetupState;
  projectItemOptions: AutoReelScannerProjectItemOption[];
  signal?: AbortSignal;
  onProgress?: (progress: AutoReelScannerProgress) => void;
}

interface ScannerClipCandidate {
  clip: TimelineClip;
  trackType: TimelineTrackType;
}

interface ExclusionCounts {
  disabled: number;
  audio: number;
  still: number;
  overMax: number;
  sourceMismatch: number;
}

const SCAN_CACHE_VERSION = "phase-3-scan-v1";

export async function scanAutoReelTimeline(input: AutoReelScannerInput): Promise<AutoReelScannerResult> {
  throwIfCancelled(input.signal);

  const timelineCandidates = flattenTimelineCandidates(input.timeline);
  const sourceCandidates = resolveSourceCandidates(timelineCandidates, input.state, input.projectItemOptions, input.timeline);
  const sortedCandidates = sortCandidates(sourceCandidates);
  const exclusions = createExclusionCounts();
  const keptCandidates: ScannerClipCandidate[] = [];

  input.onProgress?.({
    phase: "resolving-source",
    current: 0,
    total: Math.max(1, sortedCandidates.length),
    percent: sortedCandidates.length === 0 ? 100 : 0,
    message: buildResolveMessage(input.state.sourceMode, sortedCandidates.length),
    included: 0,
    excluded: 0
  });

  for (let index = 0; index < sortedCandidates.length; index += 1) {
    throwIfCancelled(input.signal);
    const candidate = sortedCandidates[index];
    const shouldInclude = shouldIncludeClip(candidate.clip, input.state, exclusions);
    if (shouldInclude) {
      keptCandidates.push(candidate);
    }

    input.onProgress?.({
      phase: "scanning-clips",
      current: index + 1,
      total: sortedCandidates.length,
      percent: Math.round(((index + 1) / Math.max(1, sortedCandidates.length)) * 100),
      message: `Scanning ${index + 1}/${sortedCandidates.length}: ${candidate.clip.name}`,
      clipName: candidate.clip.name,
      included: keptCandidates.length,
      excluded:
        exclusions.disabled +
        exclusions.audio +
        exclusions.still +
        exclusions.overMax +
        exclusions.sourceMismatch
    });
  }

  const limitedCandidates = keptCandidates.slice(0, Math.max(1, input.state.maximumClipCount));
  exclusions.overMax = Math.max(0, keptCandidates.length - limitedCandidates.length);
  const selectionCapabilityNotes = buildSelectionCapabilityNotes(input.timeline, input.state);
  const selectionFingerprint = hashStableText(
    limitedCandidates.map((candidate) => buildClipFingerprint(candidate.clip)).join("|")
  );
  const selectionCacheKey = hashStableText(
    [
      SCAN_CACHE_VERSION,
      input.projectId,
      input.sequenceId,
      input.state.sourceMode,
      selectionFingerprint,
      String(input.state.includeDisabledClips),
      String(input.state.includeAudioOnlyItems),
      String(input.state.includeStillItems),
      String(input.state.minimumClipCount),
      String(input.state.maximumClipCount)
    ].join("::")
  );
  const descriptors = limitedCandidates.map((candidate) =>
    toClipDescriptor(candidate, input.timeline, selectionCacheKey)
  );

  const warnings = buildWarnings(input.state, exclusions, sortedCandidates.length, descriptors.length);
  const selection: MediaSelection = {
    mode: input.state.sourceMode,
    projectId: input.projectId,
    sequenceId: input.sequenceId,
    sequenceName: input.sequenceName,
    clipIds: descriptors.map((descriptor) => descriptor.id),
    projectItemIds: descriptors
      .map((descriptor) => descriptor.projectItemId)
      .filter((value): value is string => typeof value === "string" && value.length > 0),
    inPointSeconds: input.timeline.inPoint,
    outPointSeconds: input.timeline.outPoint,
    usedFallback: input.state.sourceMode === "project-items" && sortedCandidates.length === 0,
    sequenceResolution: input.timeline.frameSize,
    fps: input.timeline.fps || null,
    timebase: input.timeline.timebase,
    playheadSeconds: input.timeline.playhead,
    selectedClipCount: timelineCandidates.filter((candidate) => candidate.clip.selected).length,
    scannedClipCount: descriptors.length,
    mediaFingerprint: selectionFingerprint,
    cacheKey: selectionCacheKey,
    capabilityNotes: selectionCapabilityNotes
  };
  const log = buildLog(input.state.sourceMode, exclusions, sortedCandidates.length, descriptors.length, input.timeline);
  const planningText = buildPlanningText(
    input.state.sourceMode,
    descriptors.length,
    sortedCandidates.length,
    warnings,
    input.timeline
  );

  input.onProgress?.({
    phase: "complete",
    current: descriptors.length,
    total: descriptors.length,
    percent: 100,
    message: `Scanner captured ${descriptors.length} clip descriptors from ${describeSourceMode(input.state.sourceMode)}.`,
    included: descriptors.length,
    excluded:
      exclusions.disabled +
      exclusions.audio +
      exclusions.still +
      exclusions.overMax +
      exclusions.sourceMismatch
  });

  return {
    selection,
    descriptors,
    warnings,
    log,
    planningText
  };
}

export function isAutoReelScanCancelledError(error: unknown): error is AutoReelScanCancelledError {
  return error instanceof AutoReelScanCancelledError;
}

function flattenTimelineCandidates(timeline: TimelineState): ScannerClipCandidate[] {
  return [...timeline.videoTracks, ...timeline.audioTracks].flatMap((track) =>
    track.clips.map((clip) => ({ clip, trackType: track.type }))
  );
}

function resolveSourceCandidates(
  candidates: ScannerClipCandidate[],
  state: AutoReelSetupState,
  projectItemOptions: AutoReelScannerProjectItemOption[],
  timeline: TimelineState
): ScannerClipCandidate[] {
  switch (state.sourceMode) {
    case "selected-clips":
      return candidates.filter((candidate) => candidate.clip.selected);
    case "in-out-range":
      return candidates.filter((candidate) => overlapsRange(candidate.clip, timeline.inPoint, timeline.outPoint));
    case "manual-selection":
      return candidates.filter((candidate) => state.manualClipIds.includes(candidate.clip.id));
    case "project-items":
      return resolveProjectItemCandidates(candidates, state.selectedProjectItemIds, projectItemOptions);
    default:
      return candidates;
  }
}

function resolveProjectItemCandidates(
  candidates: ScannerClipCandidate[],
  selectedIds: string[],
  projectItemOptions: AutoReelScannerProjectItemOption[]
): ScannerClipCandidate[] {
  const selected = projectItemOptions.filter((option) => selectedIds.includes(option.id));
  const matchedProjectItemIds = new Set<string>();
  const matchedNodeIds = new Set<string>();
  const matchedMediaPaths = new Set<string>();

  for (const option of selected) {
    collectProjectItemTargets(option, projectItemOptions).forEach((target) => {
      if (target.projectItemId) {
        matchedProjectItemIds.add(target.projectItemId);
      }
      if (target.nodeId) {
        matchedNodeIds.add(target.nodeId);
      }
      if (target.mediaPath) {
        matchedMediaPaths.add(target.mediaPath);
      }
    });
  }

  return candidates.filter((candidate) => {
    const projectItemId = candidate.clip.projectItemId;
    const projectItemNodeId = candidate.clip.projectItemNodeId;
    const mediaPath = candidate.clip.mediaPath;

    return (
      (projectItemId !== null && matchedProjectItemIds.has(projectItemId)) ||
      (projectItemNodeId !== null && matchedNodeIds.has(projectItemNodeId)) ||
      (mediaPath !== null && matchedMediaPaths.has(mediaPath))
    );
  });
}

function collectProjectItemTargets(
  selected: AutoReelScannerProjectItemOption,
  projectItemOptions: AutoReelScannerProjectItemOption[]
): AutoReelScannerProjectItemOption[] {
  const descendants = projectItemOptions.filter((candidate) => candidate.ancestorIds?.includes(selected.id));
  return [selected, ...descendants];
}

function shouldIncludeClip(
  clip: TimelineClip,
  state: AutoReelSetupState,
  exclusions: ExclusionCounts
): boolean {
  if (!state.includeDisabledClips && clip.disabled === true) {
    exclusions.disabled += 1;
    return false;
  }

  if (!state.includeAudioOnlyItems && clip.mediaType === "audio") {
    exclusions.audio += 1;
    return false;
  }

  if (!state.includeStillItems && clip.mediaType === "still") {
    exclusions.still += 1;
    return false;
  }

  return true;
}

function overlapsRange(clip: TimelineClip, inPoint: number, outPoint: number): boolean {
  if (!(outPoint > inPoint)) {
    return true;
  }

  return clip.end >= inPoint && clip.start <= outPoint;
}

function sortCandidates(candidates: ScannerClipCandidate[]): ScannerClipCandidate[] {
  return [...candidates].sort((left, right) => {
    if (left.clip.start !== right.clip.start) {
      return left.clip.start - right.clip.start;
    }
    if (left.clip.trackIndex !== right.clip.trackIndex) {
      return left.clip.trackIndex - right.clip.trackIndex;
    }
    if (left.trackType !== right.trackType) {
      return left.trackType === "video" ? -1 : 1;
    }
    return left.clip.name.localeCompare(right.clip.name);
  });
}

function toClipDescriptor(
  candidate: ScannerClipCandidate,
  timeline: TimelineState,
  selectionCacheKey: string
): ClipDescriptor {
  const capabilityNotes = candidate.clip.capabilityNotes.map(toCapabilityNote);

  if (candidate.clip.mediaPath === null) {
    capabilityNotes.push({
      field: "mediaPath",
      source: "unavailable",
      reason: "Media path remains null because the active host session did not expose getMediaFilePath() for this clip."
    });
  }

  if (candidate.clip.linkedClipIds === null) {
    capabilityNotes.push({
      field: "linkedClipIds",
      source: "unavailable",
      reason: "Linked audio/video relationship remains null because no verified relationship reader is exposed by the active Premiere runtime."
    });
  }

  if (candidate.clip.proxyState === null) {
    capabilityNotes.push({
      field: "proxyState",
      source: "unavailable",
      reason: "Proxy state remains null because no verified proxy-state reader is exposed by the active Premiere runtime."
    });
  }

  const mediaFingerprint = buildClipFingerprint(candidate.clip);
  const metadataStatus = deriveMetadataStatus(capabilityNotes);

  return {
    id: candidate.clip.id,
    projectItemId: candidate.clip.projectItemId,
    projectItemNodeId: candidate.clip.projectItemNodeId,
    name: candidate.clip.name,
    mediaType: candidate.clip.mediaType as ClipMediaType,
    mediaPath: candidate.clip.mediaPath,
    sourceInSeconds: candidate.clip.sourceIn,
    sourceOutSeconds: candidate.clip.sourceOut,
    timelineStartSeconds: candidate.clip.start,
    timelineEndSeconds: candidate.clip.end,
    trackIndex: candidate.clip.trackIndex,
    trackType: candidate.trackType,
    speed: candidate.clip.speed,
    disabled: candidate.clip.disabled,
    selected: candidate.clip.selected,
    linkedClipIds: candidate.clip.linkedClipIds,
    frameRate: timeline.fps || null,
    width: candidate.clip.sourceFrameSize?.width ?? null,
    height: candidate.clip.sourceFrameSize?.height ?? null,
    proxyState: candidate.clip.proxyState,
    lockedTrackState: null,
    mediaFingerprint,
    cacheKey: hashStableText(`${selectionCacheKey}::${mediaFingerprint}`),
    metadataStatus,
    capabilityNotes: [
      ...capabilityNotes,
      {
        field: "lockedTrackState",
        source: "unavailable",
        reason: "Track locked-state remains null because no verified reader is exposed by the active Premiere runtime."
      }
    ]
  };
}

function buildWarnings(
  state: AutoReelSetupState,
  exclusions: ExclusionCounts,
  matchedCount: number,
  descriptorCount: number
): string[] {
  const warnings: string[] = [];

  if (descriptorCount < state.minimumClipCount) {
    warnings.push(
      `Scanner matched ${descriptorCount} clips after filtering, below the requested minimum of ${state.minimumClipCount}.`
    );
  }
  if (exclusions.disabled > 0) {
    warnings.push(`${exclusions.disabled} disabled clips were excluded by filter.`);
  }
  if (exclusions.audio > 0) {
    warnings.push(`${exclusions.audio} audio-only items were excluded by filter.`);
  }
  if (exclusions.still > 0) {
    warnings.push(`${exclusions.still} still items were excluded by filter.`);
  }
  if (exclusions.overMax > 0) {
    warnings.push(
      `${exclusions.overMax} clips were trimmed after scan because the maximum clip count is ${state.maximumClipCount}.`
    );
  }
  if (state.sourceMode === "project-items" && matchedCount === 0) {
    warnings.push(
      "No timeline clips matched the selected project items/bin. This workspace does not expose verified live Project-panel selection APIs, so Auto Reel only resolves explicit item/bin picks from the readable project tree."
    );
  }

  return warnings;
}

function buildLog(
  mode: AutoReelSetupState["sourceMode"],
  exclusions: ExclusionCounts,
  matchedCount: number,
  descriptorCount: number,
  timeline: TimelineState
): string[] {
  const lines = [
    `Resolved ${matchedCount} source candidates from ${describeSourceMode(mode)}.`,
    `Captured ${descriptorCount} truthful clip descriptors from the active sequence.`,
    `Sequence metadata: ${describeFrameSize(timeline.frameSize)} at ${timeline.fps || 0} fps${timeline.timebase !== null ? ` / timebase ${timeline.timebase}` : ""}.`,
    `Unavailable host reads remain null for linked audio/video relationships, proxy state, and locked-track state.`
  ];

  if (exclusions.disabled > 0) {
    lines.push(`Excluded disabled clips: ${exclusions.disabled}.`);
  }
  if (exclusions.audio > 0) {
    lines.push(`Excluded audio-only items: ${exclusions.audio}.`);
  }
  if (exclusions.still > 0) {
    lines.push(`Excluded still items: ${exclusions.still}.`);
  }
  if (exclusions.overMax > 0) {
    lines.push(`Trimmed after max clip-count filter: ${exclusions.overMax}.`);
  }

  return lines;
}

function buildPlanningText(
  mode: AutoReelSetupState["sourceMode"],
  descriptorCount: number,
  matchedCount: number,
  warnings: string[],
  timeline: TimelineState
): string {
  const summary = [
    `Scanner resolved ${matchedCount} source candidates from ${describeSourceMode(mode)} and kept ${descriptorCount} clip descriptors.`,
    `Sequence ${timeline.sequenceName || "Active Sequence"} is ${describeFrameSize(timeline.frameSize)} at ${timeline.fps || 0} fps.`,
    `Playhead ${formatSeconds(timeline.playhead)}, In ${formatSeconds(timeline.inPoint)}, Out ${formatSeconds(timeline.outPoint)}.`
  ];

  if (warnings.length > 0) {
    summary.push(`Warnings: ${warnings.join(" ")}`);
  } else {
    summary.push("No frame extraction, scoring, planning, or Premiere execution has run in this phase.");
  }

  return summary.join(" ");
}

function buildSelectionCapabilityNotes(
  timeline: TimelineState,
  state: AutoReelSetupState
): AutoReelCapabilityNote[] {
  const notes = timeline.capabilityNotes.map(toCapabilityNote);
  notes.push({
    field: "lockedTrackFilter",
    source: "unavailable",
    reason: state.includeLockedTracks
      ? "Locked-track inclusion was requested, but the active Premiere runtime does not expose a verified locked-track state reader."
      : "Locked-track exclusion remains unavailable because the active Premiere runtime does not expose a verified locked-track state reader."
  });
  return notes;
}

function buildClipFingerprint(clip: TimelineClip): string {
  return hashStableText(
    [
      clip.projectItemId ?? "project-item:unknown",
      clip.projectItemNodeId ?? "node:unknown",
      clip.mediaPath ?? "path:unknown",
      clip.name,
      formatStableNumber(clip.start),
      formatStableNumber(clip.end),
      formatStableNumber(clip.sourceIn),
      formatStableNumber(clip.sourceOut),
      clip.mediaType
    ].join("::")
  );
}

function deriveMetadataStatus(notes: AutoReelCapabilityNote[]): AutoReelMetadataStatus {
  if (notes.some((note) => note.source === "metadata-fallback")) {
    return "metadata-fallback";
  }
  if (notes.some((note) => note.source === "unavailable")) {
    return "unavailable";
  }
  return "host-verified";
}

function buildResolveMessage(mode: AutoReelSetupState["sourceMode"], count: number): string {
  return `Resolved ${count} source candidates from ${describeSourceMode(mode)}.`;
}

function describeSourceMode(mode: AutoReelSetupState["sourceMode"]): string {
  return mode.replaceAll("-", " ");
}

function describeFrameSize(frameSize: TimelineState["frameSize"]): string {
  if (!frameSize) {
    return "unknown resolution";
  }
  return `${frameSize.width}x${frameSize.height}`;
}

function formatSeconds(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

function toCapabilityNote(note: { field: string; source: AutoReelMetadataStatus; reason: string }): AutoReelCapabilityNote {
  return { field: note.field, source: note.source, reason: note.reason };
}

function createExclusionCounts(): ExclusionCounts {
  return {
    disabled: 0,
    audio: 0,
    still: 0,
    overMax: 0,
    sourceMismatch: 0
  };
}

function throwIfCancelled(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new AutoReelScanCancelledError();
  }
}

function formatStableNumber(value: number | null): string {
  return typeof value === "number" && Number.isFinite(value) ? value.toFixed(3) : "unknown";
}
