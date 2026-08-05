import { useState } from "react";
import { ScoringReport, RankedClipCandidate, ClipScoreBreakdown, ClipScoreReason } from "./models";
import { Card } from "../../ui/theme/primitives";
import { glassCardStyle, sectionWrapStyle, helperTextStyle } from "./AutoReelUi";
import { colors, spacing, typography } from "../../ui/theme";

function ScoreBar({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const barColor =
    pct >= 70 ? "#2E7D32" : pct >= 40 ? "#F9A825" : "#C62828";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: spacing.sm, minWidth: 0 }}>
      <span style={{ fontSize: typography.sizes.xs, color: colors.inkMuted, minWidth: 80, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(0,0,0,0.08)", overflow: "hidden", minWidth: 0 }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 3, background: barColor, transition: "width 300ms ease" }} />
      </div>
      <span style={{ fontSize: typography.sizes.xs, color: colors.ink, minWidth: 32, textAlign: "right" }}>{value.toFixed(1)}</span>
    </div>
  );
}

function ReasonChip({ reason, tone }: { reason: ClipScoreReason; tone: "positive" | "negative" }) {
  return (
    <span style={{
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
      whiteSpace: "nowrap",
    }}>
      {tone === "positive" ? "+" : ""}{reason.scoreEffect.toFixed(1)} {reason.description}
    </span>
  );
}

function StateBadge({ state }: { state: ClipScoreBreakdown["state"] }) {
  const config = {
    selected: { bg: "rgba(46,125,50,0.15)", color: "#2E7D32", label: "Selected" },
    rejected: { bg: "rgba(198,40,40,0.15)", color: "#C62828", label: "Rejected" },
    uncertain: { bg: "rgba(249,168,37,0.15)", color: "#F57F17", label: "Uncertain" },
  }[state];
  return (
    <span style={{
      padding: `2px ${spacing.sm}px`, borderRadius: 999, fontSize: typography.sizes.xs,
      background: config.bg, color: config.color, fontWeight: 600,
    }}>
      {config.label}
    </span>
  );
}

function ConfidenceBar({ confidence }: { confidence: number }) {
  const pct = Math.max(0, Math.min(100, confidence * 100));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
      <span style={{ fontSize: typography.sizes.xs, color: colors.inkMuted }}>Confidence</span>
      <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(0,0,0,0.06)", overflow: "hidden", maxWidth: 80 }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 2, background: pct > 70 ? "#2E7D32" : pct > 40 ? "#F9A825" : "#C62828" }} />
      </div>
      <span style={{ fontSize: typography.sizes.xs, color: colors.ink }}>{pct.toFixed(0)}%</span>
    </div>
  );
}

function ClipCard({ clip }: { clip: RankedClipCandidate }) {
  const [expanded, setExpanded] = useState(false);
  const b = clip.breakdown;
  const positiveReasons = b.positiveReasons.slice(0, 3);
  const negativeReasons = b.negativeReasons.slice(0, 3);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        padding: spacing.md,
        borderRadius: 12,
        background: b.state === "rejected" ? "rgba(198,40,40,0.04)" : "rgba(255,255,255,0.64)",
        boxShadow: `0 4px 12px rgba(0,0,0,0.06)`,
        cursor: "pointer",
        transition: "box-shadow 160ms ease, transform 160ms ease",
        display: "flex",
        flexDirection: "column",
        gap: spacing.sm,
      }}
    >
      {/* Header Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: spacing.sm }}>
        <div style={{ display: "flex", alignItems: "center", gap: spacing.sm, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 700, color: colors.ink, fontSize: typography.sizes.md }}>#{clip.rank}</span>
          <span style={{ color: colors.inkMuted, fontSize: typography.sizes.sm, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>{clip.clipId}</span>
          <StateBadge state={b.state} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
          <span style={{ fontWeight: 700, fontSize: typography.sizes.lg, color: clip.score >= 70 ? "#2E7D32" : clip.score >= 40 ? "#F57F17" : "#C62828" }}>
            {clip.score.toFixed(1)}
          </span>
          <span style={{ fontSize: typography.sizes.xs, color: colors.inkMuted }}>
            raw: {b.rawScore.toFixed(1)}
          </span>
          <ConfidenceBar confidence={b.confidence} />
        </div>
      </div>

      {/* Reason Chips */}
      {(positiveReasons.length > 0 || negativeReasons.length > 0) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {positiveReasons.map((r, i) => <ReasonChip key={`p-${i}`} reason={r} tone="positive" />)}
          {negativeReasons.map((r, i) => <ReasonChip key={`n-${i}`} reason={r} tone="negative" />)}
        </div>
      )}

      {/* Expanded Breakdown */}
      {expanded && (
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm, paddingTop: spacing.sm, borderTop: `1px solid rgba(0,0,0,0.06)` }}>
          <ScoreBar label="Technical" value={b.technicalScore} />
          <ScoreBar label="Vision" value={b.visionScore} />
          <ScoreBar label="Face" value={b.faceScore} />
          <ScoreBar label="Wedding" value={b.weddingScore} />
          <ScoreBar label="Emotion" value={b.emotionScore} />
          <ScoreBar label="Music" value={b.musicCompatibilityScore} />
          <ScoreBar label="Preference" value={b.preferenceScore} />

          {b.penalties > 0 && (
            <div style={{ ...helperTextStyle, color: "#C62828" }}>
              Penalties: −{b.penalties.toFixed(1)} points
            </div>
          )}
          {b.diversityAdjustment < 0 && (
            <div style={{ ...helperTextStyle, color: "#F57F17" }}>
              Diversity: {b.diversityAdjustment.toFixed(1)} adjustment
            </div>
          )}

          {b.unavailableSignals.length > 0 && (
            <div style={helperTextStyle}>
              Unavailable: {b.unavailableSignals.join(", ")}
            </div>
          )}

          {Object.keys(b.trustSummary).length > 0 && (
            <div style={helperTextStyle}>
              Trust: {Object.entries(b.trustSummary).map(([k, v]) => `${k}: ${v}`).join(", ")}
            </div>
          )}

          {Object.keys(b.providerVersions).length > 0 && (
            <div style={helperTextStyle}>
              Providers: {Object.entries(b.providerVersions).map(([k, v]) => `${k}=${v}`).join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function AutoReelRankedList({ report }: { report: ScoringReport | undefined }) {
  if (!report || report.rankedClips.length === 0) {
    return null;
  }

  const selectedCount = report.rankedClips.filter((c) => c.breakdown.state === "selected").length;
  const rejectedCount = report.rankedClips.filter((c) => c.breakdown.state === "rejected").length;

  return (
    <div style={sectionWrapStyle}>
      <Card
        title="Ranked Clips"
        subtitle={`${report.rankedClips.length} clips scored with ${report.scoringProfileId} profile. ${selectedCount} selected, ${rejectedCount} rejected. Engine v${report.scoringEngineVersion}.`}
        style={{ ...glassCardStyle, flex: "1 1 100%", minWidth: 0 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
          {report.rankedClips.map((clip) => (
            <ClipCard key={clip.clipId} clip={clip} />
          ))}
        </div>
        {report.warnings.length > 0 && (
          <div style={{ marginTop: spacing.md, ...helperTextStyle, color: "#F57F17" }}>
            {report.warnings.map((w, i) => <div key={i}>⚠ {w}</div>)}
          </div>
        )}
      </Card>
    </div>
  );
}
