import { Card, Input, ScrollArea, StatusChip } from "../../ui/theme/primitives";
import { AutoReelLayoutMode, AutoReelSetupState, AutoReelType, isReferenceUrl } from "./autoReelSetupConfig";
import { AutoReelJob } from "./models";
import { AutoReelSetupContext } from "./autoReelSetupService";
import {
  Field,
  SelectionGrid,
  SelectableChip,
  checkboxRowStyle,
  codeBlockStyle,
  fieldStyle,
  formRowStyle,
  glassCardStyle,
  helperTextStyle,
  logEntryStyle,
  nestedCardStyle,
  phaseRowStyle,
  planningTextPanelStyle,
  previewImageStyle,
  referenceCardStyle,
  sectionWrapStyle,
  titleCase,
  uploadLabelStyle
} from "./AutoReelUi";
import { spacing } from "../../ui/theme";

export const REEL_TYPE_OPTIONS: Array<{ value: AutoReelType; label: string }> = [
  { value: "wedding-highlight", label: "Wedding Highlight" },
  { value: "cinematic-reel", label: "Cinematic Reel" },
  { value: "emotional-reel", label: "Emotional Reel" },
  { value: "couple-reel", label: "Couple Reel" },
  { value: "dance-reel", label: "Dance Reel" },
  { value: "reception-reel", label: "Reception Reel" }
];

export const DURATION_OPTIONS = [15, 30, 45, 60, 75, 90, 120, 180];
export const ASPECT_RATIO_OPTIONS = ["9:16", "16:9", "1:1", "4:5"] as const;
export const STYLE_OPTIONS = ["signature", "luxury", "documentary", "viral", "classic"] as const;
export const STORY_MODE_OPTIONS = ["story", "emotion", "music", "viral", "documentary", "cinematic"] as const;
export const LEVEL_OPTIONS = ["low", "balanced", "high"] as const;
export const ENERGY_OPTIONS = ["calm", "balanced", "high"] as const;
export const CUT_DENSITY_OPTIONS = ["sparse", "balanced", "rapid"] as const;
export const BALANCE_OPTIONS = ["bride", "groom", "family", "balanced"] as const;
export const SOURCE_MODE_OPTIONS = [
  { value: "selected-clips", label: "Selected timeline clips" },
  { value: "active-sequence", label: "Active sequence" },
  { value: "in-out-range", label: "Sequence In / Out" },
  { value: "project-items", label: "Selected Project panel items / bin" },
  { value: "manual-selection", label: "Manual selection" }
] as const;
export const MUSIC_MODE_OPTIONS = [
  { value: "none", label: "No-music planning mode" },
  { value: "local-file", label: "Local audio file" },
  { value: "project-item", label: "Premiere project item" },
  { value: "authorized-direct-url", label: "Authorized direct URL" },
  { value: "social-reference", label: "Social link reference-only" }
] as const;

export function AutoReelSourceSection({
  context,
  projectId,
  sequenceId,
  state,
  fieldBasis,
  loading,
  running,
  errors,
  onProjectId,
  onSequenceId,
  onPatchState,
  onToggleListValue
}: {
  context: AutoReelSetupContext | null;
  projectId: string;
  sequenceId: string;
  state: AutoReelSetupState;
  fieldBasis: string;
  loading: boolean;
  running: boolean;
  errors: { fields: Record<string, string | undefined> };
  onProjectId: (value: string) => void;
  onSequenceId: (value: string) => void;
  onPatchState: (patch: Partial<AutoReelSetupState>) => void;
  onToggleListValue: (key: "selectedProjectItemIds" | "manualClipIds", value: string) => void;
}) {
  return (
    <div style={sectionWrapStyle}>
      <Card title="Media Source Controls" subtitle="Choose the Premiere source set and clip-range rules. Phase 4 scanning applies these filters to real timeline metadata." style={{ ...glassCardStyle, flex: "1 1 100%", minWidth: 0 }}>
        <div style={formRowStyle}>
          <Field label="Project selection" flex={fieldBasis}>
            <select value={projectId} onChange={(event) => onProjectId(event.target.value)} style={fieldStyle} disabled={loading || running}>
              {context?.projectOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Sequence selection" flex={fieldBasis}>
            <select value={sequenceId} onChange={(event) => onSequenceId(event.target.value)} style={fieldStyle} disabled={loading || running}>
              {context?.sequenceOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Source mode" flex={fieldBasis} error={errors.fields.sourceMode}>
            <select value={state.sourceMode} onChange={(event) => onPatchState({ sourceMode: event.target.value as AutoReelSetupState["sourceMode"] })} style={fieldStyle} disabled={loading || running}>
              {SOURCE_MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Include locked tracks" flex={fieldBasis}>
            <label style={checkboxRowStyle}>
              <input type="checkbox" checked={state.includeLockedTracks} onChange={(event) => onPatchState({ includeLockedTracks: event.target.checked })} disabled={loading || running} />
              <span>Record locked-track preference</span>
            </label>
            <div style={helperTextStyle}>Current Premiere runtime does not expose locked-track state, so this remains a serialized preference only.</div>
          </Field>
          <Field label="Include disabled clips" flex={fieldBasis}>
            <label style={checkboxRowStyle}>
              <input type="checkbox" checked={state.includeDisabledClips} onChange={(event) => onPatchState({ includeDisabledClips: event.target.checked })} disabled={loading || running} />
              <span>Keep disabled track items in the scan result</span>
            </label>
          </Field>
          <Field label="Include audio-only items" flex={fieldBasis}>
            <label style={checkboxRowStyle}>
              <input type="checkbox" checked={state.includeAudioOnlyItems} onChange={(event) => onPatchState({ includeAudioOnlyItems: event.target.checked })} disabled={loading || running} />
              <span>Keep audio-only clips when the host exposes them</span>
            </label>
          </Field>
          <Field label="Include still items" flex={fieldBasis}>
            <label style={checkboxRowStyle}>
              <input type="checkbox" checked={state.includeStillItems} onChange={(event) => onPatchState({ includeStillItems: event.target.checked })} disabled={loading || running} />
              <span>Keep still-image items when identifiable</span>
            </label>
          </Field>
          <Field label="Minimum clip count" flex={fieldBasis} error={errors.fields.clipCountRange}>
            <Input type="number" min={1} value={state.minimumClipCount} onChange={(event) => onPatchState({ minimumClipCount: Number(event.target.value) || 0 })} disabled={loading || running} />
          </Field>
          <Field label="Maximum clip count" flex={fieldBasis} error={errors.fields.clipCountRange}>
            <Input type="number" min={1} value={state.maximumClipCount} onChange={(event) => onPatchState({ maximumClipCount: Number(event.target.value) || 0 })} disabled={loading || running} />
          </Field>
        </div>

        {state.sourceMode === "project-items" && (
          <div style={{ marginTop: spacing.md }}>
            <Field label="Project panel items / bin selection" error={errors.fields.selectedProjectItemIds}>
              <SelectionGrid>
                {context?.projectItemOptions.map((item) => (
                  <SelectableChip
                    key={item.id}
                    active={state.selectedProjectItemIds.includes(item.id)}
                    onClick={() => onToggleListValue("selectedProjectItemIds", item.id)}
                    label={`${item.label} (${item.type})`}
                  />
                ))}
              </SelectionGrid>
            </Field>
          </div>
        )}

        {state.sourceMode === "manual-selection" && (
          <div style={{ marginTop: spacing.md }}>
            <Field label="Manual clip selection" error={errors.fields.manualClipIds}>
              <SelectionGrid>
                {context?.manualClipOptions.map((clip) => (
                  <SelectableChip
                    key={clip.id}
                    active={state.manualClipIds.includes(clip.id)}
                    onClick={() => onToggleListValue("manualClipIds", clip.id)}
                    label={clip.label}
                  />
                ))}
              </SelectionGrid>
            </Field>
          </div>
        )}
      </Card>
    </div>
  );
}

export function AutoReelConfigurationSection({
  state,
  fieldBasis,
  loading,
  running,
  errors,
  onPatchState
}: {
  state: AutoReelSetupState;
  fieldBasis: string;
  loading: boolean;
  running: boolean;
  errors: { fields: Record<string, string | undefined> };
  onPatchState: (patch: Partial<AutoReelSetupState>) => void;
}) {
  return (
    <div style={sectionWrapStyle}>
      <Card title="Reel Configuration" subtitle="Set the structure, pacing, priorities, and new-sequence output metadata." style={{ ...glassCardStyle, flex: "1 1 100%", minWidth: 0 }}>
        <div style={formRowStyle}>
          <Field label="Reel type / mode" flex={fieldBasis}>
            <select value={state.reelType} onChange={(event) => onPatchState({ reelType: event.target.value as AutoReelType })} style={fieldStyle} disabled={loading || running}>
              {REEL_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Target duration" flex={fieldBasis} error={errors.fields.targetDurationSeconds}>
            <select value={String(state.targetDurationSeconds)} onChange={(event) => onPatchState({ targetDurationSeconds: Number(event.target.value) })} style={fieldStyle} disabled={loading || running}>
              {DURATION_OPTIONS.map((seconds) => (
                <option key={seconds} value={seconds}>{seconds} seconds</option>
              ))}
            </select>
          </Field>
          <Field label="Aspect ratio" flex={fieldBasis}>
            <select value={state.aspectRatio} onChange={(event) => onPatchState({ aspectRatio: event.target.value as AutoReelSetupState["aspectRatio"] })} style={fieldStyle} disabled={loading || running}>
              {ASPECT_RATIO_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </Field>
          <Field label="Style" flex={fieldBasis}>
            <select value={state.style} onChange={(event) => onPatchState({ style: event.target.value as AutoReelSetupState["style"] })} style={fieldStyle} disabled={loading || running}>
              {STYLE_OPTIONS.map((option) => (
                <option key={option} value={option}>{titleCase(option)}</option>
              ))}
            </select>
          </Field>
          <Field label="Story mode" flex={fieldBasis}>
            <select value={state.storyMode} onChange={(event) => onPatchState({ storyMode: event.target.value as AutoReelSetupState["storyMode"] })} style={fieldStyle} disabled={loading || running}>
              {STORY_MODE_OPTIONS.map((option) => (
                <option key={option} value={option}>{titleCase(option)}</option>
              ))}
            </select>
          </Field>
          <Field label="Emotion priority" flex={fieldBasis}>
            <select value={state.emotionPriority} onChange={(event) => onPatchState({ emotionPriority: event.target.value as AutoReelSetupState["emotionPriority"] })} style={fieldStyle} disabled={loading || running}>
              {LEVEL_OPTIONS.map((option) => (
                <option key={option} value={option}>{titleCase(option)}</option>
              ))}
            </select>
          </Field>
          <Field label="Bride / groom / family balance" flex={fieldBasis}>
            <select value={state.balanceTarget} onChange={(event) => onPatchState({ balanceTarget: event.target.value as AutoReelSetupState["balanceTarget"] })} style={fieldStyle} disabled={loading || running}>
              {BALANCE_OPTIONS.map((option) => (
                <option key={option} value={option}>{titleCase(option)}</option>
              ))}
            </select>
          </Field>
          <Field label="Energy" flex={fieldBasis}>
            <select value={state.energy} onChange={(event) => onPatchState({ energy: event.target.value as AutoReelSetupState["energy"] })} style={fieldStyle} disabled={loading || running}>
              {ENERGY_OPTIONS.map((option) => (
                <option key={option} value={option}>{titleCase(option)}</option>
              ))}
            </select>
          </Field>
          <Field label="Cut density" flex={fieldBasis}>
            <select value={state.cutDensity} onChange={(event) => onPatchState({ cutDensity: event.target.value as AutoReelSetupState["cutDensity"] })} style={fieldStyle} disabled={loading || running}>
              {CUT_DENSITY_OPTIONS.map((option) => (
                <option key={option} value={option}>{titleCase(option)}</option>
              ))}
            </select>
          </Field>
          <Field label="Transition intensity" flex={fieldBasis}>
            <select value={state.transitionIntensity} onChange={(event) => onPatchState({ transitionIntensity: event.target.value as AutoReelSetupState["transitionIntensity"] })} style={fieldStyle} disabled={loading || running}>
              {LEVEL_OPTIONS.map((option) => (
                <option key={option} value={option}>{titleCase(option)}</option>
              ))}
            </select>
          </Field>
          <Field label="Motion intensity" flex={fieldBasis}>
            <select value={state.motionIntensity} onChange={(event) => onPatchState({ motionIntensity: event.target.value as AutoReelSetupState["motionIntensity"] })} style={fieldStyle} disabled={loading || running}>
              {LEVEL_OPTIONS.map((option) => (
                <option key={option} value={option}>{titleCase(option)}</option>
              ))}
            </select>
          </Field>
          <Field label="SFX intensity" flex={fieldBasis}>
            <select value={state.sfxIntensity} onChange={(event) => onPatchState({ sfxIntensity: event.target.value as AutoReelSetupState["sfxIntensity"] })} style={fieldStyle} disabled={loading || running}>
              {LEVEL_OPTIONS.map((option) => (
                <option key={option} value={option}>{titleCase(option)}</option>
              ))}
            </select>
          </Field>
          <Field label="Color intensity" flex={fieldBasis}>
            <select value={state.colorIntensity} onChange={(event) => onPatchState({ colorIntensity: event.target.value as AutoReelSetupState["colorIntensity"] })} style={fieldStyle} disabled={loading || running}>
              {LEVEL_OPTIONS.map((option) => (
                <option key={option} value={option}>{titleCase(option)}</option>
              ))}
            </select>
          </Field>
          <Field label="Output sequence name" flex={fieldBasis} error={errors.fields.outputSequenceName}>
            <Input value={state.outputSequenceName} onChange={(event) => onPatchState({ outputSequenceName: event.target.value })} disabled={loading || running} />
          </Field>
          <Field label="Create new sequence" flex={fieldBasis}>
            <label style={checkboxRowStyle}>
              <input type="checkbox" checked readOnly />
              <span>Enabled by default and required</span>
            </label>
          </Field>
        </div>
      </Card>
    </div>
  );
}

export function MusicSourcePicker({
  context,
  state,
  fieldBasis,
  loading,
  running,
  errors,
  onPatchState
}: {
  context: AutoReelSetupContext | null;
  state: AutoReelSetupState;
  fieldBasis: string;
  loading: boolean;
  running: boolean;
  errors: { fields: Record<string, string | undefined> };
  onPatchState: (patch: Partial<AutoReelSetupState>) => void;
}) {
  return (
    <div style={sectionWrapStyle}>
      <Card title="MusicSourcePicker" subtitle="Configure a music input or reference mode. No copyrighted media is downloaded from social links." style={{ ...glassCardStyle, flex: "1 1 100%", minWidth: 0 }}>
        <div style={formRowStyle}>
          <Field label="Music source" flex={fieldBasis} error={errors.fields.musicSource}>
            <select value={state.musicSourceMode} onChange={(event) => onPatchState({ musicSourceMode: event.target.value as AutoReelSetupState["musicSourceMode"] })} style={fieldStyle} disabled={loading || running}>
              {MUSIC_MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </Field>
          {state.musicSourceMode === "local-file" && (
            <Field label="Local audio file" flex={fieldBasis} error={errors.fields.musicSource}>
              <label style={uploadLabelStyle}>
                <span>{state.musicLocalFileName || "Choose local audio file"}</span>
                <input
                  type="file"
                  accept="audio/*"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    const file = event.target.files?.[0] as (File & { path?: string }) | undefined;
                    onPatchState({
                      musicLocalFileName: file?.name ?? "",
                      musicLocalFilePath: file?.path ?? ""
                    });
                  }}
                  disabled={loading || running}
                />
              </label>
            </Field>
          )}
          {state.musicSourceMode === "project-item" && (
            <Field label="Premiere project item" flex={fieldBasis} error={errors.fields.musicSource}>
              <select value={state.musicProjectItemId} onChange={(event) => onPatchState({ musicProjectItemId: event.target.value })} style={fieldStyle} disabled={loading || running}>
                <option value="">Select audio project item</option>
                {context?.musicOptions.filter((option) => option.source === "project-item").map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </Field>
          )}
          {state.musicSourceMode === "authorized-direct-url" && (
            <Field label="Authorized direct URL" flex={fieldBasis} error={errors.fields.musicSource}>
              <Input value={state.musicDirectUrl} onChange={(event) => onPatchState({ musicDirectUrl: event.target.value })} placeholder="https://example.com/music-track.mp3" disabled={loading || running} />
            </Field>
          )}
          {state.musicSourceMode === "social-reference" && (
            <Field label="Social link reference-only" flex={fieldBasis} error={errors.fields.musicSource}>
              <Input value={state.musicSocialReferenceUrl} onChange={(event) => onPatchState({ musicSocialReferenceUrl: event.target.value })} placeholder="https://instagram.com/reel/... or https://youtube.com/shorts/..." disabled={loading || running} />
            </Field>
          )}
        </div>
        <div style={{ marginTop: spacing.md, display: "flex", flexWrap: "wrap", gap: spacing.sm, alignItems: "center" }}>
          <label style={checkboxRowStyle}>
            <input type="checkbox" checked={state.extractClipAudio} onChange={(event) => onPatchState({ extractClipAudio: event.target.checked })} disabled={loading || running} />
            <span>Also extract clip audio proxies for selected clips.</span>
          </label>
          <label style={checkboxRowStyle}>
            <input type="checkbox" checked={state.copyrightNoticeAccepted} onChange={(event) => onPatchState({ copyrightNoticeAccepted: event.target.checked })} disabled={loading || running} />
            <span>I confirm that any uploaded or linked music is licensed or reference-only.</span>
          </label>
        </div>
        <div style={helperTextStyle}>Direct URLs must point to authorized media files. Social links are stored as reference-only and are never treated as a licensed source track by this Phase 4 workflow. Clip-audio extraction runs only when explicitly requested.</div>
      </Card>
    </div>
  );
}

export function PersonReferenceManager({
  state,
  layoutMode,
  loading,
  running,
  onUpdateReference,
  onAddCustomReference,
  onRemoveReference
}: {
  state: AutoReelSetupState;
  layoutMode: AutoReelLayoutMode;
  loading: boolean;
  running: boolean;
  onUpdateReference: (referenceId: string, update: { fileName?: string; previewUrl?: string }) => void;
  onAddCustomReference: () => void;
  onRemoveReference: (referenceId: string) => void;
}) {
  return (
    <div style={sectionWrapStyle}>
      <Card title="PersonReferenceManager" subtitle="Select bride, groom, family, or custom reference images. No face processing is performed in Phase 4." style={{ ...glassCardStyle, flex: "1 1 100%", minWidth: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          {state.references.map((reference) => (
            <div key={reference.id} style={referenceCardStyle(layoutMode === "wide")}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.md, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: spacing.xs, minWidth: 0 }}>
                  <div style={{ color: "#4A1621", fontWeight: 700 }}>{reference.label}</div>
                  <div style={helperTextStyle}>{titleCase(reference.role)} reference</div>
                </div>
                <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
                  <label style={uploadLabelStyle}>
                    <span>{reference.fileName || "Select image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        onUpdateReference(reference.id, {
                          fileName: file?.name ?? "",
                          previewUrl: file ? URL.createObjectURL(file) : undefined
                        });
                      }}
                      disabled={loading || running}
                    />
                  </label>
                  {reference.role === "custom" && (
                    <button type="button" onClick={() => onRemoveReference(reference.id)} disabled={loading || running}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
              {reference.previewUrl ? (
                <div style={{ marginTop: spacing.sm, display: "flex", gap: spacing.md, alignItems: "center", flexWrap: "wrap" }}>
                  <img src={reference.previewUrl} alt={`${reference.label} preview`} style={previewImageStyle} />
                  <button type="button" onClick={() => onUpdateReference(reference.id, { fileName: "", previewUrl: undefined })} disabled={loading || running}>
                    Clear
                  </button>
                </div>
              ) : null}
            </div>
          ))}
          <div>
            <button type="button" onClick={onAddCustomReference} disabled={loading || running}>
              Add Family / Custom Person
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function ReferenceReelInput({
  state,
  fieldBasis,
  loading,
  running,
  error,
  onPatchState
}: {
  state: AutoReelSetupState;
  fieldBasis: string;
  loading: boolean;
  running: boolean;
  error?: string;
  onPatchState: (patch: Partial<AutoReelSetupState>) => void;
}) {
  const status = !state.referenceReelUrl.trim() && !state.referenceReelLocalFileName.trim()
    ? "idle"
    : !state.referenceReelUrl.trim() || isReferenceUrl(state.referenceReelUrl)
      ? "valid"
      : "invalid";

  return (
    <div style={sectionWrapStyle}>
      <Card title="ReferenceReelInput" subtitle="Attach a reference reel URL or local file. Both remain reference-only in Phase 4." style={{ ...glassCardStyle, flex: "1 1 100%", minWidth: 0 }}>
        <div style={formRowStyle}>
          <Field label="Instagram / YouTube URL" flex={fieldBasis} error={error}>
            <Input value={state.referenceReelUrl} onChange={(event) => onPatchState({ referenceReelUrl: event.target.value })} placeholder="https://instagram.com/reel/... or https://youtube.com/shorts/..." disabled={loading || running} />
          </Field>
          <Field label="Authorized local reference file" flex={fieldBasis}>
            <label style={uploadLabelStyle}>
              <span>{state.referenceReelLocalFileName || "Choose local reference reel"}</span>
              <input type="file" accept="video/*" style={{ display: "none" }} onChange={(event) => onPatchState({ referenceReelLocalFileName: event.target.files?.[0]?.name ?? "" })} disabled={loading || running} />
            </label>
          </Field>
          <Field label="Validation state" flex={fieldBasis}>
            <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", alignItems: "center" }}>
              <StatusChip label={status} tone={status === "valid" ? "success" : status === "invalid" ? "danger" : "neutral"} />
              <span style={helperTextStyle}>Reference-only. No media download or style cloning happens in Phase 4.</span>
            </div>
          </Field>
        </div>
      </Card>
    </div>
  );
}

export function AutoReelPlanningPanel({
  planningText,
  phases,
  error
}: {
  planningText: string;
  phases: Array<{ title: string; status: string; detail: string; tone: "neutral" | "success" | "warning" | "danger" }>;
  error: string;
}) {
  return (
    <div style={sectionWrapStyle}>
      <Card title="Planning Visibility" subtitle="Readable request summary and structured setup phases. No fake analysis results are shown here." style={{ ...glassCardStyle, flex: "1 1 100%", minWidth: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          <div style={planningTextPanelStyle}>{planningText}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {phases.map((phase) => (
              <div key={phase.title} style={phaseRowStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm, flexWrap: "wrap", alignItems: "center" }}>
                  <div style={{ color: "#4A1621", fontWeight: 700 }}>{phase.title}</div>
                  <StatusChip label={phase.status} tone={phase.tone} />
                </div>
                <div style={helperTextStyle}>{phase.detail}</div>
              </div>
            ))}
          </div>
          {error ? <div style={{ color: "#A23A35" }}>{error}</div> : null}
        </div>
      </Card>
    </div>
  );
}

export function AutoReelRequestPreview({
  job,
  panelWidth,
  requestPreview,
  log
}: {
  job: AutoReelJob | null;
  panelWidth: number;
  requestPreview: string;
  log: string[];
}) {
  const progressPercent = !job || job.progress.total <= 0 ? 0 : Math.round((job.progress.current / job.progress.total) * 100);
  const extraction = job?.extraction;
  const currentClip = extraction?.progress.currentClipName || extraction?.progress.currentClipId || "None";
  const remainingClips = extraction?.progress.remainingClips ?? 0;
  return (
    <div style={sectionWrapStyle}>
      <Card title="Progress Panel" subtitle="Real extraction progress, live log, warnings, and serialized AutoReelRequest preview." style={{ ...glassCardStyle, flex: "1 1 100%", minWidth: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.xs }}>
            <div style={helperTextStyle}>{job?.progress.message || "Setup has not started yet."}</div>
            <div style={{ height: 10, borderRadius: 999, overflow: "hidden", background: "#EFE4D2" }}>
              <div style={{ width: `${progressPercent}%`, height: "100%", background: "linear-gradient(90deg, #B28A4A, #6C2230)" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", alignItems: "center" }}>
            <StatusChip label={job ? `${job.progress.current}/${job.progress.total} steps` : "0/0 steps"} tone={job ? "success" : "neutral"} />
            <StatusChip label={job?.state || "idle"} tone={job ? "warning" : "neutral"} />
            <StatusChip label={`Current clip ${currentClip}`} tone={extraction?.progress.currentClipName ? "warning" : "neutral"} />
            <StatusChip label={extraction ? `${extraction.progress.completedClips}/${Math.max(1, extraction.progress.totalClips)} clips complete` : "0/0 clips"} tone={extraction ? "success" : "neutral"} />
            <StatusChip label={extraction ? `${remainingClips} clips remaining` : "0 remaining"} tone="neutral" />
            <StatusChip label={extraction ? `${extraction.progress.cacheHits} cache hits` : "0 cache hits"} tone={extraction?.progress.cacheHits ? "success" : "neutral"} />
            <StatusChip label={extraction ? `${extraction.progress.cacheMisses} cache misses` : "0 cache misses"} tone={extraction?.progress.cacheMisses ? "warning" : "neutral"} />
            <StatusChip label={extraction?.sidecar.status === "available" ? "Sidecar available" : "Sidecar unavailable"} tone={extraction?.sidecar.status === "available" ? "success" : "danger"} />
            <StatusChip label={`Panel width ${panelWidth}px`} tone="neutral" />
          </div>
          {job?.warnings.length ? (
            <Card title="Warnings / Errors" subtitle="Truthful extraction blockers and fallback reasons." style={nestedCardStyle}>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
                {job.warnings.slice(0, 8).map((entry, index) => (
                  <div key={`${index}-${entry}`} style={logEntryStyle(index !== Math.min(job.warnings.length, 8) - 1)}>
                    {entry}
                  </div>
                ))}
                {job.warnings.length > 8 ? <div style={helperTextStyle}>{job.warnings.length - 8} more warnings are retained in the job state.</div> : null}
              </div>
            </Card>
          ) : null}
          <div style={{ display: "flex", gap: spacing.md, flexWrap: "wrap", alignItems: "stretch" }}>
            <Card title="Live Planning Log" subtitle="Readable progress and fallback notes only." style={{ ...nestedCardStyle, flex: "1 1 22rem", minWidth: 0 }}>
              <ScrollArea style={{ minWidth: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
                  {log.map((entry, index) => (
                    <div key={`${index}-${entry}`} style={logEntryStyle(index !== log.length - 1)}>
                      {entry}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
            <Card title="Serialized AutoReelRequest" subtitle="Phase 4 request preview before later AI analysis phases." style={{ ...nestedCardStyle, flex: "1 1 22rem", minWidth: 0 }}>
              <ScrollArea style={{ minWidth: 0 }}>
                <pre style={codeBlockStyle}>{requestPreview}</pre>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
