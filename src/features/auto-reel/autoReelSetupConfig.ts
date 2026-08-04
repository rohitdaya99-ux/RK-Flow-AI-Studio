import {
  AutoReelAspectRatio,
  AutoReelBalanceTarget,
  AutoReelCutDensity,
  AutoReelEmotionPriority,
  AutoReelEnergyLevel,
  AutoReelReferencePerson,
  AutoReelRequest,
  AutoReelSetupConfig,
  AutoReelStoryMode,
  AutoReelTuningLevel,
  MediaSelection,
  MediaSelectionMode
} from "./models";
import { ValidationIssue, validateAutoReelSetupConfig } from "./validation";

export type AutoReelLayoutMode = "compact" | "medium" | "regular" | "wide";
export type AutoReelType =
  | "wedding-highlight"
  | "cinematic-reel"
  | "emotional-reel"
  | "couple-reel"
  | "dance-reel"
  | "reception-reel";
export type AutoReelStyle = "signature" | "luxury" | "documentary" | "viral" | "classic";
export type AutoReelMusicSourceMode =
  | "none"
  | "local-file"
  | "project-item"
  | "authorized-direct-url"
  | "social-reference";
export type AutoReelReferenceReelStatus = "idle" | "valid" | "invalid";

export interface AutoReelReferenceFileState {
  id: string;
  role: AutoReelReferencePerson["role"];
  label: string;
  fileName?: string;
  previewUrl?: string;
}

export interface AutoReelSetupState {
  sourceMode: MediaSelectionMode;
  includeLockedTracks: boolean;
  includeDisabledClips: boolean;
  includeAudioOnlyItems: boolean;
  includeStillItems: boolean;
  minimumClipCount: number;
  maximumClipCount: number;
  reelType: AutoReelType;
  targetDurationSeconds: number;
  aspectRatio: AutoReelAspectRatio;
  style: AutoReelStyle;
  storyMode: AutoReelStoryMode;
  emotionPriority: AutoReelEmotionPriority;
  balanceTarget: AutoReelBalanceTarget;
  energy: AutoReelEnergyLevel;
  cutDensity: AutoReelCutDensity;
  transitionIntensity: AutoReelTuningLevel;
  motionIntensity: AutoReelTuningLevel;
  sfxIntensity: AutoReelTuningLevel;
  colorIntensity: AutoReelTuningLevel;
  outputSequenceName: string;
  createNewSequence: true;
  selectedProjectItemIds: string[];
  manualClipIds: string[];
  musicSourceMode: AutoReelMusicSourceMode;
  musicLocalFileName: string;
  musicLocalFilePath: string;
  musicProjectItemId: string;
  musicDirectUrl: string;
  musicSocialReferenceUrl: string;
  cachedMusicId: string;
  extractClipAudio: boolean;
  copyrightNoticeAccepted: boolean;
  references: AutoReelReferenceFileState[];
  referenceReelUrl: string;
  referenceReelLocalFileName: string;
}

export interface AutoReelValidationContext {
  availableClipCount: number;
  selectedClipCount: number;
  availableProjectItemIds: string[];
  availableManualClipIds: string[];
}

export interface AutoReelFieldErrors {
  general: string[];
  fields: Partial<Record<keyof AutoReelSetupState | "referenceReel" | "musicSource" | "clipCountRange", string>>;
  issues: ValidationIssue[];
}

export function createDefaultAutoReelSetupState(overrides: Partial<AutoReelSetupState> = {}): AutoReelSetupState {
  return {
    sourceMode: "selected-clips",
    includeLockedTracks: false,
    includeDisabledClips: false,
    includeAudioOnlyItems: false,
    includeStillItems: false,
    minimumClipCount: 8,
    maximumClipCount: 60,
    reelType: "wedding-highlight",
    targetDurationSeconds: 60,
    aspectRatio: "9:16",
    style: "signature",
    storyMode: "story",
    emotionPriority: "balanced",
    balanceTarget: "balanced",
    energy: "balanced",
    cutDensity: "balanced",
    transitionIntensity: "balanced",
    motionIntensity: "balanced",
    sfxIntensity: "low",
    colorIntensity: "balanced",
    outputSequenceName: "Auto Reel",
    createNewSequence: true,
    selectedProjectItemIds: [],
    manualClipIds: [],
    musicSourceMode: "none",
    musicLocalFileName: "",
    musicLocalFilePath: "",
    musicProjectItemId: "",
    musicDirectUrl: "",
    musicSocialReferenceUrl: "",
    cachedMusicId: "",
    extractClipAudio: false,
    copyrightNoticeAccepted: false,
    references: [
      { id: "bride-reference", role: "bride", label: "Bride" },
      { id: "groom-reference", role: "groom", label: "Groom" }
    ],
    referenceReelUrl: "",
    referenceReelLocalFileName: "",
    ...overrides
  };
}

export function buildSetupConfig(state: AutoReelSetupState): AutoReelSetupConfig {
  return {
    sourceMode: state.sourceMode,
    clipFilter: {
      includeLockedTracks: state.includeLockedTracks,
      includeDisabledClips: state.includeDisabledClips,
      includeAudioOnlyItems: state.includeAudioOnlyItems,
      includeStillItems: state.includeStillItems,
      minimumClipCount: state.minimumClipCount,
      maximumClipCount: state.maximumClipCount
    },
    aspectRatio: state.aspectRatio,
    reelType: state.reelType,
    style: state.style,
    storyMode: state.storyMode,
    emotionPriority: state.emotionPriority,
    balanceTarget: state.balanceTarget,
    energy: state.energy,
    cutDensity: state.cutDensity,
    transitionIntensity: state.transitionIntensity,
    motionIntensity: state.motionIntensity,
    sfxIntensity: state.sfxIntensity,
    colorIntensity: state.colorIntensity,
    outputSequenceName: state.outputSequenceName.trim(),
    createNewSequence: true,
    musicSource: {
      mode: state.musicSourceMode,
      fileName: state.musicLocalFileName || undefined,
      filePath: state.musicLocalFilePath || undefined,
      projectItemId: state.musicProjectItemId || undefined,
      directUrl: normalizeOptionalText(state.musicDirectUrl),
      socialReferenceUrl: normalizeOptionalText(state.musicSocialReferenceUrl),
      cachedMusicId: state.cachedMusicId || undefined,
      extractClipAudio: state.extractClipAudio,
      copyrightNoticeAccepted: state.copyrightNoticeAccepted
    },
    references: state.references.map((reference) => ({
      id: reference.id,
      role: reference.role,
      label: reference.label,
      fileName: reference.fileName
    })),
    referenceReel:
      state.referenceReelUrl.trim() || state.referenceReelLocalFileName.trim()
        ? {
            mode: state.referenceReelLocalFileName.trim() ? "local-file" : "url",
            url: normalizeOptionalText(state.referenceReelUrl),
            localFileName: normalizeOptionalText(state.referenceReelLocalFileName)
          }
        : undefined,
    selectedProjectItemIds: state.selectedProjectItemIds,
    manualClipIds: state.manualClipIds
  };
}

export function validateAutoReelSetupState(
  state: AutoReelSetupState,
  context: AutoReelValidationContext
): AutoReelFieldErrors {
  const setupConfig = buildSetupConfig(state);
  const setupValidation = validateAutoReelSetupConfig(setupConfig);
  const fields: AutoReelFieldErrors["fields"] = {};
  const general: string[] = [];

  if (state.targetDurationSeconds < 15 || state.targetDurationSeconds > 300) {
    fields.targetDurationSeconds = "Target duration must be between 15 and 300 seconds.";
  }

  if (state.minimumClipCount > state.maximumClipCount) {
    fields.clipCountRange = "Minimum clip count cannot exceed the maximum.";
  } else if (state.maximumClipCount > Math.max(context.availableClipCount, state.maximumClipCount)) {
    fields.clipCountRange = "Maximum clip count is too large for the available source clips.";
  }

  if (state.sourceMode === "selected-clips" && context.selectedClipCount === 0) {
    fields.sourceMode = "No selected timeline clips are available in Premiere right now.";
  }

  if (state.sourceMode === "project-items" && state.selectedProjectItemIds.length === 0) {
    fields.selectedProjectItemIds = "Choose at least one Project panel item or bin.";
  }

  if (state.sourceMode === "manual-selection" && state.manualClipIds.length === 0) {
    fields.manualClipIds = "Choose at least one manual clip reference.";
  }

  if (state.musicSourceMode === "local-file" && !state.musicLocalFileName.trim()) {
    fields.musicSource = "Choose a local audio file or switch the music mode.";
  }

  if (state.musicSourceMode === "project-item" && !state.musicProjectItemId.trim()) {
    fields.musicSource = "Choose a Premiere project audio item or switch the music mode.";
  }

  if (state.musicSourceMode === "authorized-direct-url" && !isDirectMediaUrl(state.musicDirectUrl)) {
    fields.musicSource = "Enter a valid direct audio URL ending in a media file extension.";
  }

  if (state.musicSourceMode === "social-reference" && !isSocialReferenceUrl(state.musicSocialReferenceUrl)) {
    fields.musicSource = "Enter a valid Instagram or YouTube reference link.";
  }

  if (state.musicSourceMode !== "none" && !state.copyrightNoticeAccepted) {
    fields.musicSource = "Acknowledge the copyright notice before using a music source.";
  }

  if (state.referenceReelUrl.trim() && !isReferenceUrl(state.referenceReelUrl)) {
    fields.referenceReel = "Enter a valid Instagram or YouTube URL.";
  }

  if (!state.outputSequenceName.trim()) {
    fields.outputSequenceName = "Output sequence name is required.";
  }

  for (const issue of setupValidation.issues) {
    if (issue.path.startsWith("clipFilter")) {
      fields.clipCountRange = fields.clipCountRange ?? issue.message;
    } else if (issue.path.startsWith("musicSource")) {
      fields.musicSource = fields.musicSource ?? issue.message;
    } else if (issue.path.startsWith("referenceReel")) {
      fields.referenceReel = fields.referenceReel ?? issue.message;
    } else if (issue.path in state) {
      fields[issue.path as keyof AutoReelSetupState] = fields[issue.path as keyof AutoReelSetupState] ?? issue.message;
    } else {
      general.push(issue.message);
    }
  }

  return {
    general,
    fields,
    issues: setupValidation.issues
  };
}

export function serializeAutoReelSetupIntoRequest(
  state: AutoReelSetupState,
  base: {
    id: string;
    prompt: string;
    mediaSelection: MediaSelection;
    targetDurationSeconds: number;
    outputSequenceName: string;
    styleHints: string[];
    preferredEvents: string[];
    excludedClipIds: string[];
    submittedAt: string;
  }
): AutoReelRequest {
  return {
    id: base.id,
    prompt: base.prompt,
    mediaSelection: base.mediaSelection,
    targetDurationSeconds: base.targetDurationSeconds,
    aspectRatio: state.aspectRatio,
    outputSequenceName: base.outputSequenceName,
    createNewSequence: true,
    styleHints: base.styleHints,
    preferredEvents: base.preferredEvents,
    excludedClipIds: base.excludedClipIds,
    submittedAt: base.submittedAt,
    setup: buildSetupConfig(state)
  };
}

export function getAutoReelLayoutMode(width: number): AutoReelLayoutMode {
  if (width <= 320) {
    return "compact";
  }
  if (width <= 640) {
    return "medium";
  }
  if (width <= 1080) {
    return "regular";
  }
  return "wide";
}

export function getAutoReelEffectiveWidth(
  workspaceWidth: number | null | undefined,
  viewportWidth: number
): number {
  if (typeof workspaceWidth === "number" && Number.isFinite(workspaceWidth) && workspaceWidth > 0) {
    return workspaceWidth;
  }
  return Math.max(0, viewportWidth);
}

export function fieldFlex(layoutMode: AutoReelLayoutMode): string {
  switch (layoutMode) {
    case "compact":
      return "1 1 100%";
    case "medium":
      return "1 1 calc(50% - 12px)";
    case "regular":
      return "1 1 calc(33.333% - 16px)";
    default:
      return "1 1 calc(25% - 18px)";
  }
}

export function isReferenceUrl(value: string): boolean {
  return isSocialReferenceUrl(value);
}

export function isDirectMediaUrl(value: string): boolean {
  if (!isHttpUrl(value)) {
    return false;
  }

  return /\.(mp3|wav|aif|aiff|m4a|aac|flac|ogg)$/i.test(value.trim());
}

export function isSocialReferenceUrl(value: string): boolean {
  if (!isHttpUrl(value)) {
    return false;
  }

  return /(instagram\.com|youtu\.be|youtube\.com)/i.test(value.trim());
}

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function normalizeOptionalText(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}
