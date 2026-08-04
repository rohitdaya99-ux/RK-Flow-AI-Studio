import {
  AutoReelConfigurationSection,
  AutoReelPlanningPanel,
  AutoReelRequestPreview,
  AutoReelSourceSection,
  MusicSourcePicker,
  PersonReferenceManager,
  ReferenceReelInput
} from "./AutoReelSections";
import {
  AutoReelSetupState,
  createDefaultAutoReelSetupState,
  fieldFlex,
  getAutoReelLayoutMode
} from "./autoReelSetupConfig";
import { AutoReelSetupContext } from "./autoReelSetupService";
import { spacing } from "../../ui/theme";

export const AUTO_REEL_LAYOUT_FIXTURE_WIDTHS = [280, 500, 900, 1146, 1440] as const;

const FIXTURE_CONTEXT: AutoReelSetupContext = {
  connected: true,
  activeProjectId: "project-1",
  activeSequenceId: "sequence-1",
  projectName: "RK Flow Wedding Project With Long Client Name",
  sequenceName: "Main Wedding Sequence With Long Title",
  clipCount: 142,
  selectedClipCount: 18,
  inPointSeconds: 12,
  outPointSeconds: 86,
  durationSeconds: 74,
  fps: 25,
  timebase: 25,
  frameSize: { width: 1920, height: 1080 },
  projectOptions: [{ id: "project-1", name: "RK Flow Wedding Project With Long Client Name", active: true }],
  sequenceOptions: [{ id: "sequence-1", name: "Main Wedding Sequence With Long Title", active: true }],
  projectItemOptions: [
    { id: "item-1", label: "Bride Prep Bin", type: "bin", ancestorIds: [] },
    { id: "item-2", label: "Varmala Hero Shot", type: "clip", ancestorIds: ["item-1"] }
  ],
  manualClipOptions: [
    { id: "clip-1", label: "Bride Entry Close Up", startSeconds: 0, endSeconds: 4.8, mediaType: "video" },
    { id: "clip-2", label: "Family Reaction Long Lens", startSeconds: 5, endSeconds: 9.2, mediaType: "video" }
  ],
  musicOptions: [{ id: "song-1", label: "Wedding Theme Track", source: "project-item" }],
  selectedClips: [],
  sequenceClips: [],
  timeline: null,
  lockedTrackSupport: "unavailable"
};

const FIXTURE_STATE: AutoReelSetupState = createDefaultAutoReelSetupState({
  sourceMode: "manual-selection",
  manualClipIds: ["clip-1", "clip-2"],
  musicSourceMode: "project-item",
  musicProjectItemId: "song-1",
  copyrightNoticeAccepted: true,
  referenceReelUrl: "https://youtube.com/shorts/example"
});

const FIXTURE_ERRORS = {
  general: [],
  fields: {},
  issues: []
};

const FIXTURE_LOG = [
  "Loaded Premiere context for RK Flow Wedding Project With Long Client Name / Main Wedding Sequence With Long Title.",
  "Prepared AutoReelRequest preview."
];

export function AutoReelLayoutFixture() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.xl, minWidth: 0 }}>
      {AUTO_REEL_LAYOUT_FIXTURE_WIDTHS.map((width) => {
        const layoutMode = getAutoReelLayoutMode(width);
        const fieldBasis = fieldFlex(layoutMode);

        return (
          <div key={width} style={{ width: "100%", maxWidth: width, minWidth: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg, minWidth: 0 }}>
              <AutoReelSourceSection
                context={FIXTURE_CONTEXT}
                projectId={FIXTURE_CONTEXT.activeProjectId}
                sequenceId={FIXTURE_CONTEXT.activeSequenceId}
                state={FIXTURE_STATE}
                fieldBasis={fieldBasis}
                loading={false}
                running={false}
                errors={FIXTURE_ERRORS}
                onProjectId={() => undefined}
                onSequenceId={() => undefined}
                onPatchState={() => undefined}
                onToggleListValue={() => undefined}
              />
              <AutoReelConfigurationSection
                state={FIXTURE_STATE}
                fieldBasis={fieldBasis}
                loading={false}
                running={false}
                errors={FIXTURE_ERRORS}
                onPatchState={() => undefined}
              />
              <MusicSourcePicker
                context={FIXTURE_CONTEXT}
                state={FIXTURE_STATE}
                fieldBasis={fieldBasis}
                loading={false}
                running={false}
                errors={FIXTURE_ERRORS}
                onPatchState={() => undefined}
              />
              <PersonReferenceManager
                state={FIXTURE_STATE}
                layoutMode={layoutMode}
                loading={false}
                running={false}
                onUpdateReference={() => undefined}
                onAddCustomReference={() => undefined}
                onRemoveReference={() => undefined}
              />
              <ReferenceReelInput
                state={FIXTURE_STATE}
                fieldBasis={fieldBasis}
                loading={false}
                running={false}
                onPatchState={() => undefined}
              />
              <AutoReelPlanningPanel
                planningText={`Fixture width ${width}px in ${layoutMode} mode.`}
                phases={[
                  { title: "Source validation", status: "ready", detail: "Source controls remain readable.", tone: "success" },
                  { title: "Configuration", status: "ready", detail: "Fields wrap without overlap.", tone: "success" }
                ]}
                error=""
              />
              <AutoReelRequestPreview
                job={null}
                panelWidth={width}
                requestPreview={JSON.stringify({ fixture: true, width }, null, 2)}
                log={FIXTURE_LOG}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
