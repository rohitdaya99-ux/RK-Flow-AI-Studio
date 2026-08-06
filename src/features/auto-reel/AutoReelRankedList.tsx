import { CSSProperties } from "react";
import {
  AutoReelUserClipChoices,
  ClipDescriptor,
  ClipScoreBreakdown,
  ClipScoreReason,
  ScoringReport,
  SignalTrustLevel
} from "./models";
import { Card } from "../../ui/theme/primitives";
import { glassCardStyle, sectionWrapStyle, helperTextStyle } from "./AutoReelUi";
import { colors, spacing, typography } from "../../ui/theme";
import { AutoReelLayoutMode } from "./autoReelSetupConfig";
import {
  CategoryDisplay,
  ClipChoiceKind,
  ClipListRow,
  ClipListViewState,
  TRUST_LABELS,
  applyClipListView,
  buildCategoryDisplays,
  buildClipListRows,
  buildScoreExplanation,
  countClipStates,
  hasClipChoice
} from "./autoReelScoringControls";

const UNAVAILABLE_LABEL = "Unavailable";

function scoreTone(value: number): string {
  return value >= 70 ? "#2E7D32" : value >= 40 ? "#F57F17" : "#C62828";
}

const controlRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: spacing.sm,
  alignItems: "center",
  minWidth: 0
};

const smallControlStyle: CSSProperties = {
  minWidth: 0,
  boxSizing: "border-box",
  borderRadius: 10,
  border: `1px solid ${colors.border}`,
  background: "rgba(255,255,255,0.78)",
  color: colors.ink,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontSize: typography.sizes.xs
};

function toggleButtonStyle(active: boolean, tone: string): CSSProperties {
  return {
    borderRadius: 999,
    border: `1px solid ${active ? tone : colors.border}`,
    background: active ? tone : "rgba(255,255,255,0.7)",
    color: active ? colors.white : colors.ink,
    padding: `${spacing.xs}px ${spacing.sm}px`,
    fontSize: typography.sizes.xs,
    fontWeight: 600,
    cursor: "pointer",
    minWidth: 0
  };
}

function CategoryRow({ display }: { display: CategoryDisplay }) {
  if (!display.available) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: spacing.sm, minWidth: 0, flexWrap: "wrap" }}>
        <span style={{ fontSize: typography.sizes.xs, color: colors.inkMuted, minWidth: 84, flexShrink: 0 }}>
          {display.label}
        </span>
        <span style={{ fontSize: typography.sizes.xs, color: "#F57F17", fontStyle: "italic" }}>
          {UNAVAILABLE_LABEL}
          {display.weightedSignalCount > 0
            ? ` — ${display.weightedSignalCount} weighted signal${display.weightedSignalCount === 1 ? "" : "s"} could not be read`
            : ""}
        </span>
      </div>
    );
  }

  const value = display.value ?? 0;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: spacing.sm, minWidth: 0, flexWrap: "wrap" }}>
      <span style={{ fontSize: typography.sizes.xs, color: colors.inkMuted, minWidth: 84, flexShrink: 0 }}>
        {display.label}
      </span>
      <div
        style={{
          flex: "1 1 100px",
          height: 6,
          borderRadius: 3,
          background: "rgba(0,0,0,0.08)",
          overflow: "hidden",
          minWidth: 0
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 3,
            background: scoreTone(value),
            // Heuristic evidence gets a striped fill so it never reads as measured.
            backgroundImage: display.heuristic
              ? "repeating-linear-gradient(45deg, rgba(255,255,255,0.55) 0 4px, transparent 4px 8px)"
              : undefined,
            transition: "width 300ms ease"
          }}
        />
      </div>
      <span style={{ fontSize: typography.sizes.xs, color: colors.ink, minWidth: 32, textAlign: "right" }}>
        {value.toFixed(1)}
      </span>
      <span
        title={
          display.heuristic
            ? "Heuristic estimate derived from local cues — not a measured value."
            : `Dominant signal trust: ${display.trustLabel}.`
        }
        style={{
          fontSize: typography.sizes.xs,
          padding: `1px ${spacing.xs}px`,
          borderRadius: 999,
          border: `1px ${display.heuristic ? "dashed" : "solid"} ${display.heuristic ? "#F57F17" : colors.border}`,
          color: display.heuristic ? "#F57F17" : colors.inkMuted,
          whiteSpace: "nowrap"
        }}
      >
        {display.trustLabel}
      </span>
    </div>
  );
}

function ReasonChip({ reason, tone }: { reason: ClipScoreReason; tone: "positive" | "negative" }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: `2px ${spacing.sm}px`,
        borderRadius: 999,
        fontSize: typography.sizes.xs,
        lineHeight: 1.4,
        background: tone === "positive" ? "rgba(46,125,50,0.12)" : "rgba(198,40,40,0.12)",
        color: tone === "positive" ? "#2E7D32" : "#C62828",
        border: `1px solid ${tone === "positive" ? "rgba(46,125,50,0.25)" : "rgba(198,40,40,0.25)"}`,
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }}
    >
      {tone === "positive" ? "+" : ""}
      {reason.scoreEffect.toFixed(1)} {reason.description}
    </span>
  );
}

function StateBadge({ state }: { state: ClipScoreBreakdown["state"] }) {
  const config = {
    selected: { bg: "rgba(46,125,50,0.15)", color: "#2E7D32", label: "Selected" },
    rejected: { bg: "rgba(198,40,40,0.15)", color: "#C62828", label: "Rejected" },
    uncertain: { bg: "rgba(249,168,37,0.15)", color: "#F57F17", label: "Uncertain" }
  }[state];
  return (
    <span
      style={{
        padding: `2px ${spacing.sm}px`,
        borderRadius: 999,
        fontSize: typography.sizes.xs,
        background: config.bg,
        color: config.color,
        fontWeight: 600,
        whiteSpace: "nowrap"
      }}
    >
      {config.label}
    </span>
  );
}

function TrustSummary({ summary }: { summary: Partial<Record<SignalTrustLevel, number>> }) {
  const entries = (Object.entries(summary) as Array<[SignalTrustLevel, number]>).filter(
    ([, count]) => (count ?? 0) > 0
  );
  if (entries.length === 0) {
    return <div style={helperTextStyle}>Trust summary: no signals were evaluated.</div>;
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.xs, alignItems: "center", minWidth: 0 }}>
      <span style={{ fontSize: typography.sizes.xs, color: colors.inkMuted }}>Trust</span>
      {entries.map(([trust, count]) => (
        <span
          key={trust}
          style={{
            fontSize: typography.sizes.xs,
            padding: `1px ${spacing.xs}px`,
            borderRadius: 999,
            border: `1px ${trust === "heuristic" ? "dashed" : "solid"} ${
              trust === "unavailable" ? "#C62828" : trust === "heuristic" ? "#F57F17" : colors.border
            }`,
            color: trust === "unavailable" ? "#C62828" : trust === "heuristic" ? "#F57F17" : colors.inkMuted,
            whiteSpace: "nowrap"
          }}
        >
          {TRUST_LABELS[trust]}: {count}
        </span>
      ))}
    </div>
  );
}

interface ClipCardProps {
  row: ClipListRow;
  rawMode: boolean;
  expanded: boolean;
  compact: boolean;
  choices: AutoReelUserClipChoices | undefined;
  disabled: boolean;
  onInspect: (clipId: string) => void;
  onChoice: (clipId: string, kind: ClipChoiceKind) => void;
}

function ClipCard({
  row,
  rawMode,
  expanded,
  compact,
  choices,
  disabled,
  onInspect,
  onChoice
}: ClipCardProps) {
  const b = row.candidate.breakdown;
  const headlineScore = rawMode ? b.rawScore : b.finalScore;
  const secondaryLabel = rawMode ? "adjusted" : "raw";
  const secondaryScore = rawMode ? b.finalScore : b.rawScore;
  const categories = buildCategoryDisplays(b);
  const locked = hasClipChoice(choices, row.candidate.clipId, "lock");
  const required = hasClipChoice(choices, row.candidate.clipId, "require");
  const excluded = hasClipChoice(choices, row.candidate.clipId, "exclude");

  return (
    <div
      style={{
        padding: spacing.md,
        borderRadius: 12,
        background: b.state === "rejected" ? "rgba(198,40,40,0.04)" : "rgba(255,255,255,0.64)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: spacing.sm,
        minWidth: 0
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: spacing.sm,
          minWidth: 0
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: spacing.sm, flexWrap: "wrap", minWidth: 0 }}>
          <span style={{ fontWeight: 700, color: colors.ink, fontSize: typography.sizes.md }}>
            #{row.candidate.rank}
          </span>
          <span
            title={row.clipName}
            style={{
              color: colors.ink,
              fontSize: typography.sizes.sm,
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: compact ? 150 : 260,
              minWidth: 0
            }}
          >
            {row.clipName}
          </span>
          <StateBadge state={b.state} />
          {locked && <span style={{ fontSize: typography.sizes.xs, color: colors.inkMuted }}>Locked</span>}
          {required && <span style={{ fontSize: typography.sizes.xs, color: "#2E7D32" }}>Required</span>}
          {excluded && <span style={{ fontSize: typography.sizes.xs, color: "#C62828" }}>Excluded</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: spacing.md, flexWrap: "wrap", minWidth: 0 }}>
          <span style={{ fontWeight: 700, fontSize: typography.sizes.lg, color: scoreTone(headlineScore) }}>
            {headlineScore.toFixed(1)}
          </span>
          <span style={{ fontSize: typography.sizes.xs, color: colors.inkMuted, whiteSpace: "nowrap" }}>
            {secondaryLabel}: {secondaryScore.toFixed(1)}
          </span>
          <span style={{ fontSize: typography.sizes.xs, color: colors.inkMuted, whiteSpace: "nowrap" }}>
            confidence {(b.confidence * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {(b.positiveReasons.length > 0 || b.negativeReasons.length > 0) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, minWidth: 0 }}>
          {b.positiveReasons.slice(0, 3).map((reason, index) => (
            <ReasonChip key={`p-${index}`} reason={reason} tone="positive" />
          ))}
          {b.negativeReasons.slice(0, 3).map((reason, index) => (
            <ReasonChip key={`n-${index}`} reason={reason} tone="negative" />
          ))}
        </div>
      )}

      <div style={controlRowStyle}>
        <button
          type="button"
          disabled={disabled}
          aria-pressed={locked}
          onClick={() => onChoice(row.candidate.clipId, "lock")}
          style={toggleButtonStyle(locked, colors.maroon)}
        >
          Lock
        </button>
        <button
          type="button"
          disabled={disabled}
          aria-pressed={required}
          onClick={() => onChoice(row.candidate.clipId, "require")}
          style={toggleButtonStyle(required, "#2E7D32")}
        >
          Require
        </button>
        <button
          type="button"
          disabled={disabled}
          aria-pressed={excluded}
          onClick={() => onChoice(row.candidate.clipId, "exclude")}
          style={toggleButtonStyle(excluded, "#C62828")}
        >
          Exclude
        </button>
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => onInspect(row.candidate.clipId)}
          style={toggleButtonStyle(expanded, colors.maroonDeep)}
        >
          {expanded ? "Hide" : "Inspect"}
        </button>
      </div>

      {expanded && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.sm,
            paddingTop: spacing.sm,
            borderTop: "1px solid rgba(0,0,0,0.06)",
            minWidth: 0
          }}
        >
          <div
            style={{
              padding: spacing.md,
              borderRadius: 10,
              background: "rgba(239,228,210,0.42)",
              color: colors.ink,
              fontSize: typography.sizes.sm,
              lineHeight: 1.7
            }}
          >
            {buildScoreExplanation(b, row.clipName)}
          </div>

          {categories.map((display) => (
            <CategoryRow key={display.category} display={display} />
          ))}

          <div style={helperTextStyle}>
            Raw {b.rawScore.toFixed(1)} · adjusted {b.finalScore.toFixed(1)} · penalties{" "}
            {b.penalties > 0 ? `−${b.penalties.toFixed(1)}` : "none"} · diversity{" "}
            {b.diversityAdjustment < 0 ? b.diversityAdjustment.toFixed(1) : "none"}
            {row.durationSeconds !== null ? ` · duration ${row.durationSeconds.toFixed(1)}s` : " · duration unavailable"}
          </div>

          <TrustSummary summary={b.trustSummary} />

          {b.unavailableSignals.length > 0 && (
            <div style={{ ...helperTextStyle, color: "#F57F17" }}>
              Unavailable signals ({b.unavailableSignals.length}): {b.unavailableSignals.join(", ")}
            </div>
          )}

          {Object.keys(b.providerVersions).length > 0 && (
            <div style={helperTextStyle}>
              Providers:{" "}
              {Object.entries(b.providerVersions)
                .map(([key, value]) => `${key}=${value}`)
                .join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export interface AutoReelRankedListProps {
  report: ScoringReport | undefined;
  clips: ClipDescriptor[];
  view: ClipListViewState;
  choices: AutoReelUserClipChoices | undefined;
  layoutMode: AutoReelLayoutMode;
  disabled: boolean;
  onViewChange: (patch: Partial<ClipListViewState>) => void;
  onChoice: (clipId: string, kind: ClipChoiceKind) => void;
}

export function AutoReelRankedList({
  report,
  clips,
  view,
  choices,
  layoutMode,
  disabled,
  onViewChange,
  onChoice
}: AutoReelRankedListProps) {
  if (!report || report.rankedClips.length === 0) {
    return null;
  }

  const compact = layoutMode === "compact";
  const allRows = buildClipListRows(report, clips);
  const rows = applyClipListView(allRows, view);
  const counts = countClipStates(allRows);

  return (
    <div style={sectionWrapStyle}>
      <Card
        title="Ranked Clips"
        subtitle={`${report.rankedClips.length} clips scored with the ${report.scoringProfileId} profile. ${counts.selected} selected, ${counts.rejected} rejected, ${counts.uncertain} uncertain. Engine ${report.scoringEngineVersion}.`}
        style={{ ...glassCardStyle, flex: "1 1 100%", minWidth: 0 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md, minWidth: 0 }}>
          <div style={controlRowStyle}>
            <input
              type="search"
              aria-label="Search clip name"
              placeholder="Search clip name"
              value={view.search}
              onChange={(event) => onViewChange({ search: event.target.value })}
              style={{ ...smallControlStyle, flex: compact ? "1 1 100%" : "1 1 180px" }}
            />
            <select
              aria-label="Filter by state"
              value={view.filter}
              onChange={(event) => onViewChange({ filter: event.target.value as ClipListViewState["filter"] })}
              style={{ ...smallControlStyle, flex: compact ? "1 1 100%" : "0 1 150px" }}
            >
              <option value="all">All states</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
              <option value="uncertain">Uncertain</option>
            </select>
            <select
              aria-label="Sort clips"
              value={view.sort}
              onChange={(event) => onViewChange({ sort: event.target.value as ClipListViewState["sort"] })}
              style={{ ...smallControlStyle, flex: compact ? "1 1 100%" : "0 1 150px" }}
            >
              <option value="score">Sort by score</option>
              <option value="name">Sort by name</option>
              <option value="duration">Sort by duration</option>
              <option value="confidence">Sort by confidence</option>
            </select>
            <button
              type="button"
              aria-pressed={view.rawMode}
              onClick={() => onViewChange({ rawMode: !view.rawMode })}
              style={{
                ...toggleButtonStyle(view.rawMode, colors.maroon),
                flex: compact ? "1 1 100%" : "0 0 auto"
              }}
            >
              {view.rawMode ? "Showing raw" : "Showing adjusted"}
            </button>
          </div>

          {rows.length === 0 ? (
            <div style={helperTextStyle}>
              No clips match the current filter or search. Clear the filters to see all {allRows.length} scored clips.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm, minWidth: 0 }}>
              {rows.map((row) => (
                <ClipCard
                  key={row.candidate.clipId}
                  row={row}
                  rawMode={view.rawMode}
                  expanded={view.expandedClipId === row.candidate.clipId}
                  compact={compact}
                  choices={choices}
                  disabled={disabled}
                  onInspect={(clipId) =>
                    onViewChange({ expandedClipId: view.expandedClipId === clipId ? null : clipId })
                  }
                  onChoice={onChoice}
                />
              ))}
            </div>
          )}

          {report.warnings.length > 0 && (
            <div style={{ ...helperTextStyle, color: "#F57F17" }}>
              {report.warnings.map((warning, index) => (
                <div key={index}>⚠ {warning}</div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
