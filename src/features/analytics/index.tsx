import { useEffect, useState } from "react";
import { getGeminiUsageStats, getRecentGeminiCalls } from "../../ai/GeminiService";
import { measureTimelineRead, TimelineReadMetrics } from "./metrics";
import { getSystemStats } from "../../services/systemStats";
import { Card, StatusChip } from "../../ui/theme/primitives";
import { colors, spacing, typography } from "../../ui/theme";

export default function AnalyticsScreen() {
  const [timelineMetrics, setTimelineMetrics] = useState<TimelineReadMetrics | null>(null);

  useEffect(() => {
    let cancelled = false;

    void measureTimelineRead().then((metrics) => {
      if (!cancelled) {
        setTimelineMetrics(metrics);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const systemStats = getSystemStats();
  const usageStats = getGeminiUsageStats();
  const recentCalls = getRecentGeminiCalls();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md }}>
        <Card title="System Signals" subtitle="Shared with the Phase 1 status bar." style={{ flex: "1 1 240px" }}>
          <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
            <StatusChip label={`GPU ${systemStats.gpu}`} />
            <StatusChip label={`RAM ${systemStats.ram}`} />
            <StatusChip label={`Timeline ${timelineMetrics ? `${timelineMetrics.latencyMs} ms` : "—"}`} tone={timelineMetrics?.error ? "warning" : "success"} />
          </div>
          <div style={{ marginTop: spacing.md, color: colors.inkMuted, lineHeight: 1.6 }}>
            GPU and RAM remain unavailable from the current host/runtime, so this screen intentionally mirrors the same honest `—` values shown in the footer.
          </div>
        </Card>

        <Card title="Timeline Performance" subtitle="Measured from a real PremiereBridge timeline read." style={{ flex: "1 1 320px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            <StatusChip label={timelineMetrics?.timeline?.sequenceName || "No active sequence"} tone={timelineMetrics?.timeline ? "success" : "warning"} />
            <div style={{ color: colors.inkMuted }}>
              Read latency: {timelineMetrics ? `${timelineMetrics.latencyMs} ms` : "—"}
            </div>
            <div style={{ color: colors.inkMuted }}>
              Clips scanned: {timelineMetrics?.clipCount ?? 0}
            </div>
            <div style={{ color: colors.inkMuted }}>
              Tracks: {timelineMetrics?.timeline ? `${timelineMetrics.timeline.videoTracks.length} video / ${timelineMetrics.timeline.audioTracks.length} audio` : "—"}
            </div>
            {timelineMetrics?.error && (
              <div style={{ color: colors.danger }}>
                {timelineMetrics.error}
              </div>
            )}
          </div>
        </Card>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md }}>
        <Card title="Gemini Usage" subtitle="Tracked inside GeminiService for real panel calls." style={{ flex: "1 1 280px" }}>
          <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
            <StatusChip label={`${usageStats.totalCalls} calls`} tone="success" />
            <StatusChip label={`${usageStats.successfulCalls} success`} />
            <StatusChip label={`${usageStats.failedCalls} failed`} tone={usageStats.failedCalls > 0 ? "warning" : "neutral"} />
            <StatusChip label={`Avg ${usageStats.averageDurationMs} ms`} />
          </div>
          <div style={{ marginTop: spacing.md, color: colors.inkMuted, lineHeight: 1.6 }}>
            Estimated API cost is not exposed by the current browser Gemini SDK response shape in this panel, so cost remains intentionally unavailable here.
          </div>
        </Card>

        <Card title="Recent Calls" subtitle="Bounded in-memory history of the latest Gemini requests." style={{ flex: "1 1 420px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {recentCalls.length === 0 ? (
              <div style={{ color: colors.inkMuted }}>
                No Gemini calls recorded in this session yet.
              </div>
            ) : (
              recentCalls.map((call) => (
                <div
                  key={call.id}
                  style={{
                    border: `1px solid ${colors.border}`,
                    borderRadius: 10,
                    background: colors.white,
                    padding: spacing.sm,
                    display: "flex",
                    flexDirection: "column",
                    gap: spacing.xs
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm, flexWrap: "wrap" }}>
                    <div style={{ fontWeight: 700, color: colors.maroonDeep }}>
                      {call.kind === "vision" ? "Vision" : "Text"} request
                    </div>
                    <StatusChip label={call.success ? "Success" : "Failed"} tone={call.success ? "success" : "danger"} />
                  </div>
                  <div style={{ color: colors.inkMuted, fontSize: typography.sizes.xs }}>
                    {call.model} • {call.durationMs} ms • {new Date(call.startedAt).toLocaleTimeString()}
                  </div>
                  <div style={{ color: colors.ink, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {call.promptPreview}
                  </div>
                  {call.errorMessage && (
                    <div style={{ color: colors.danger }}>
                      {call.errorMessage}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
