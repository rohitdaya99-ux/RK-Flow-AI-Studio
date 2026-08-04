import { Card, Button, ProgressBar, StatusChip } from "../../ui/theme/primitives";
import { colors, spacing } from "../../ui/theme";
import { WeddingSegment } from "../../core/brain/types";
import { analyzeWeddingSegments } from "../perception/perceptionAnalyzers";
import { useSequenceAnalysis } from "../perception/useSequenceAnalysis";

export default function WeddingAIScreen() {
  const { context, result, loading, progress, error, reanalyze } = useSequenceAnalysis({
    moduleId: "wedding-ai",
    analyze: analyzeWeddingSegments
  });
  const segments = (result?.segments ?? []).map((segment) => normalizeSegmentForRender(segment));

  if (!context) {
    return <Card title="Wedding AI">Open a sequence to analyze.</Card>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="Wedding AI" subtitle={result?.source ?? "Timeline metadata analysis"}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.md, flexWrap: "wrap" }}>
          <StatusChip label={loading ? "Analyzing..." : `${result?.segments.length ?? 0} segments`} tone={loading ? "warning" : "success"} />
          <Button variant="secondary" onClick={() => void reanalyze()} disabled={loading}>
            Re-analyze
          </Button>
        </div>
        <div style={{ marginTop: spacing.md, display: "flex", flexDirection: "column", gap: spacing.sm }}>
          {loading && <ProgressBar value={progress.percent} label={`${progress.completed}/${progress.total} steps`} />}
          <div style={{ color: error ? colors.danger : colors.inkMuted }}>
            {error || progress.label}
          </div>
        </div>
      </Card>

      <Card title="Event Timeline">
        <div style={{ display: "flex", gap: 2, minHeight: 52, overflow: "hidden", borderRadius: 10 }}>
          {segments.map((segment) => (
            <button
              key={segment.id}
              type="button"
              style={{
                flex: `${Math.max(segment.end - segment.start, 0.5)} 0 auto`,
                border: "none",
                background: segment.confidence >= 0.75 ? colors.maroon : colors.gold,
                color: colors.white,
                padding: spacing.sm,
                textAlign: "left",
                cursor: "pointer"
              }}
              title={`${segment.label} • ${(segment.confidence * 100).toFixed(0)}% • ${segment.start.toFixed(1)}s-${segment.end.toFixed(1)}s`}
            >
              <div>{segment.label}</div>
              <div style={{ fontSize: 12 }}>{(segment.confidence * 100).toFixed(0)}%</div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function normalizeSegmentForRender(segment: WeddingSegment): WeddingSegment {
  const start = normalizeTimingValue(segment.start, `${segment.id}:start`);
  const end = normalizeTimingValue(segment.end, `${segment.id}:end`);

  return {
    ...segment,
    start,
    end: end >= start ? end : start
  };
}

function normalizeTimingValue(
  value: WeddingSegment["start"],
  label: string
): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (value && typeof value === "object" && "seconds" in value) {
    const secondsValue = (value as { seconds?: unknown }).seconds;
    if (typeof secondsValue === "number" && Number.isFinite(secondsValue)) {
      console.warn("[RK Flow] WeddingAIScreen received TickTime-like segment timing.", {
        field: label,
        type: typeof value,
        value
      });
      return secondsValue;
    }
  }

  console.warn("[RK Flow] WeddingAIScreen received non-numeric segment timing.", {
    field: label,
    type: typeof value,
    value
  });
  return 0;
}
