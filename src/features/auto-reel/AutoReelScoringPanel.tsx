import { CSSProperties } from "react";
import { Button, Card } from "../../ui/theme/primitives";
import { colors, spacing, typography } from "../../ui/theme";
import { ScoreCategory, SCORE_CATEGORIES, ScoringReport } from "./models";
import { glassCardStyle, helperTextStyle, sectionWrapStyle, selectableChipStyle } from "./AutoReelUi";
import {
  CATEGORY_LABELS,
  MAX_CATEGORY_WEIGHT,
  MIN_CATEGORY_WEIGHT,
  ScoringControlsState,
  ScoringRunStatus,
  describeScoringRun,
  hasCustomWeights,
  listScoringPresets,
  remainingClips
} from "./autoReelScoringControls";

const weightRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: spacing.sm,
  flexWrap: "wrap",
  minWidth: 0
};

const progressTrackStyle: CSSProperties = {
  flex: "1 1 160px",
  height: 6,
  borderRadius: 3,
  background: "rgba(0,0,0,0.08)",
  overflow: "hidden",
  minWidth: 0
};

export interface AutoReelScoringPanelProps {
  controls: ScoringControlsState;
  status: ScoringRunStatus;
  report: ScoringReport | undefined;
  savedProfileVersion: string | null;
  disabled: boolean;
  onSelectPreset: (presetId: string) => void;
  onCategoryWeight: (category: ScoreCategory, value: number) => void;
  onRestoreDefaults: () => void;
  onSaveProfile: () => void;
  onRescore: () => void;
  onCancel: () => void;
}

export function AutoReelScoringPanel({
  controls,
  status,
  report,
  savedProfileVersion,
  disabled,
  onSelectPreset,
  onCategoryWeight,
  onRestoreDefaults,
  onSaveProfile,
  onRescore,
  onCancel
}: AutoReelScoringPanelProps) {
  const presets = listScoringPresets();
  const running = status.phase === "running";
  const customised = hasCustomWeights(controls);
  const progressPct =
    status.totalClips > 0 ? Math.round((status.completedClips / status.totalClips) * 100) : 0;

  return (
    <div style={sectionWrapStyle}>
      <Card
        title="Scoring Engine"
        subtitle="Choose a scoring preset and tune category weights. Weights scale the preset's signals; they never invent a signal that was not measured."
        style={{ ...glassCardStyle, flex: "1 1 100%", minWidth: 0 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg, minWidth: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm, minWidth: 0 }}>
            <label style={{ color: colors.maroonDeep, fontWeight: 700, fontSize: typography.sizes.sm }}>
              Scoring preset
            </label>
            <div
              role="radiogroup"
              aria-label="Scoring preset"
              style={{ display: "flex", flexWrap: "wrap", gap: spacing.sm, minWidth: 0 }}
            >
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  role="radio"
                  aria-checked={controls.presetId === preset.id}
                  title={preset.description}
                  disabled={disabled || running}
                  onClick={() => onSelectPreset(preset.id)}
                  style={{
                    ...selectableChipStyle(controls.presetId === preset.id),
                    cursor: disabled || running ? "not-allowed" : "pointer",
                    opacity: disabled || running ? 0.6 : 1
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
            <div style={helperTextStyle}>
              {presets.find((preset) => preset.id === controls.presetId)?.description ??
                "Select a preset to begin."}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm, minWidth: 0 }}>
            <label style={{ color: colors.maroonDeep, fontWeight: 700, fontSize: typography.sizes.sm }}>
              Advanced weights
            </label>
            <div style={helperTextStyle}>
              Each multiplier scales every signal in that category. 1.00 uses the preset as authored.
            </div>
            {SCORE_CATEGORIES.map((category) => (
              <div key={category} style={weightRowStyle}>
                <span
                  style={{
                    fontSize: typography.sizes.xs,
                    color: colors.inkMuted,
                    minWidth: 84,
                    flexShrink: 0
                  }}
                >
                  {CATEGORY_LABELS[category]}
                </span>
                <input
                  type="range"
                  aria-label={`${CATEGORY_LABELS[category]} weight`}
                  min={MIN_CATEGORY_WEIGHT}
                  max={MAX_CATEGORY_WEIGHT}
                  step={0.05}
                  value={controls.categoryWeights[category]}
                  disabled={disabled || running}
                  onChange={(event) => onCategoryWeight(category, Number(event.target.value))}
                  style={{ flex: "1 1 140px", minWidth: 0 }}
                />
                <span
                  style={{
                    fontSize: typography.sizes.xs,
                    color: colors.ink,
                    minWidth: 40,
                    textAlign: "right"
                  }}
                >
                  {controls.categoryWeights[category].toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", minWidth: 0 }}>
            <Button onClick={onRescore} disabled={disabled || running}>
              {running ? "Scoring..." : "Rescore Clips"}
            </Button>
            {running && (
              <Button variant="secondary" onClick={onCancel}>
                Cancel Scoring
              </Button>
            )}
            <Button variant="secondary" onClick={onRestoreDefaults} disabled={disabled || running || !customised}>
              Restore Defaults
            </Button>
            <Button variant="secondary" onClick={onSaveProfile} disabled={disabled || running || !customised}>
              Save Custom Profile
            </Button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: spacing.xs, minWidth: 0 }}>
            <div style={weightRowStyle}>
              <span style={{ fontSize: typography.sizes.xs, color: colors.inkMuted, minWidth: 84 }}>
                Progress
              </span>
              <div style={progressTrackStyle}>
                <div
                  style={{
                    width: `${progressPct}%`,
                    height: "100%",
                    borderRadius: 3,
                    background: status.phase === "failed" ? "#C62828" : colors.maroon,
                    transition: "width 240ms ease"
                  }}
                />
              </div>
              <span style={{ fontSize: typography.sizes.xs, color: colors.ink, minWidth: 76, textAlign: "right" }}>
                {status.completedClips}/{status.totalClips || 0}
              </span>
            </div>
            <div style={helperTextStyle}>{describeScoringRun(status, report)}</div>
            {status.phase === "running" && (
              <div style={helperTextStyle}>Remaining clips: {remainingClips(status)}.</div>
            )}
            {status.phase === "failed" && status.failureReason && (
              <div style={{ ...helperTextStyle, color: "#C62828" }}>{status.failureReason}</div>
            )}
            {report?.partial && (
              <div style={{ ...helperTextStyle, color: "#F57F17" }}>
                Partial results: {report.completedClips} of {report.totalClips} clips were scored before the run stopped.
              </div>
            )}
            {report && (
              <div style={helperTextStyle}>
                Last scored {report.lastScoredAt} · profile {report.scoringProfileId} v
                {report.scoringProfileVersion} · engine {report.scoringEngineVersion}
              </div>
            )}
            <div style={helperTextStyle}>
              {savedProfileVersion
                ? `Custom profile saved to this job at version ${savedProfileVersion}. It restores with the job.`
                : "No custom profile saved to this job yet; the preset is used as authored."}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
