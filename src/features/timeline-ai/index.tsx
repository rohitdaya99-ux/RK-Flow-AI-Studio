import { useMemo, useState } from "react";
import { MemoryEngine } from "../../core/brain";
import { ClipTechnicalScore, TimelineIssue } from "../../core/brain/types";
import { Button, Card, ProgressBar, StatusChip } from "../../ui/theme/primitives";
import { colors, spacing } from "../../ui/theme";
import {
  analyzeClipIntelligence,
  analyzeTimelineHealth,
} from "../perception/perceptionAnalyzers";
import { useSequenceAnalysis } from "../perception/useSequenceAnalysis";
import { ConfirmActionModal } from "./ConfirmActionModal";
import { TimelineAIExecution } from "./TimelineAIExecution";

const memory = new MemoryEngine();
const timelineExecution = new TimelineAIExecution();

export default function TimelineAIScreen() {
  const [confirmingIssue, setConfirmingIssue] = useState<TimelineIssue | null>(null);

  const { context, result, loading, progress, error, reanalyze } =
    useSequenceAnalysis({
      moduleId: "timeline-ai",
      analyze: async (sequenceContext, onProgress) => {
        const cachedClipScores = memory.getAnalysis<{
          clips: ClipTechnicalScore[];
        }>(`clip-intelligence:${sequenceContext.sequenceKey}`, "result");

        const clipScores =
          cachedClipScores?.clips ??
          (await analyzeClipIntelligence(sequenceContext, onProgress)).clips;

        return analyzeTimelineHealth(sequenceContext, clipScores, onProgress);
      },
    });

  const healthTone = useMemo(() => {
    if (!result) {
      return "neutral";
    }

    return result.score >= 75
      ? "success"
      : result.score >= 45
      ? "warning"
      : "danger";
  }, [result]);

  const handlePreviewFix = (issue: TimelineIssue) => {
    // For now, we directly show the confirmation.
    // A future step could highlight the area on the timeline first.
    setConfirmingIssue(issue);
  };

  const handleCancelConfirm = () => {
    setConfirmingIssue(null);
  };

  const handleConfirmFix = async () => {
    if (!confirmingIssue) return;

    if (confirmingIssue.id === "gaps") {
      const gaps = confirmingIssue.payload as Array<{ start: number; end: number }>;
      await timelineExecution.gapRemove(gaps);
    }

    setConfirmingIssue(null);
    // In a real app, we'd show a toast here.
    // And ideally, re-run the analysis.
    reanalyze();
  };

  if (!context) {
    return <Card title="Timeline AI">Open a sequence to analyze.</Card>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      {confirmingIssue && (
        <ConfirmActionModal
          issue={confirmingIssue}
          onConfirm={handleConfirmFix}
          onCancel={handleCancelConfirm}
        />
      )}

      <Card title="Timeline AI" subtitle={result?.source ?? "Read-only analysis"}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: spacing.sm,
            flexWrap: "wrap",
          }}
        >
          <StatusChip
            label={result ? `Health ${result.score}` : "No score yet"}
            tone={healthTone as never}
          />
          <Button
            variant="secondary"
            onClick={() => void reanalyze()}
            disabled={loading}
          >
            Re-analyze
          </Button>
        </div>
        <div style={{ marginTop: spacing.md }}>
          <Button onClick={() => void timelineExecution.autoTrim()} style={{ marginRight: spacing.sm }}>Auto Trim</Button>
          <Button onClick={() => void timelineExecution.beatCut()} style={{ marginRight: spacing.sm }}>Beat Cut</Button>
          <Button onClick={() => void timelineExecution.silenceRemove()} style={{ marginRight: spacing.sm }}>Silence Remove</Button>
          <Button onClick={() => void timelineExecution.gapRemove()} style={{ marginRight: spacing.sm }}>Gap Remove</Button>
          <Button onClick={() => void timelineExecution.rippleDelete()} style={{ marginRight: spacing.sm }}>Ripple Delete</Button>
          <Button onClick={() => void timelineExecution.speedRamp()} style={{ marginRight: spacing.sm }}>Speed Ramp</Button>
          <Button onClick={() => void timelineExecution.autoZoom()} style={{ marginRight: spacing.sm }}>Auto Zoom</Button>
          <Button onClick={() => void timelineExecution.reframe()}>Reframe</Button>
        </div>
        <div
          style={{
            marginTop: spacing.md,
            color: error ? colors.danger : colors.inkMuted,
          }}
        >
          {loading && <ProgressBar value={progress.percent} label={`${progress.completed}/${progress.total} steps`} />}
          <div style={{ marginTop: loading ? spacing.xs : 0 }}>
            {error || progress.label}
          </div>
        </div>
        {result && (
          <div style={{ marginTop: spacing.md, color: colors.inkMuted }}>
            Formula: {result.formula}
          </div>
        )}
      </Card>

      <Card title="Issues Found">
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
          {(result?.issues ?? []).map((issue) => {
            const isFixable = issue.id === "gaps"; // Only gaps are fixable for now
            return (
              <div
                key={issue.id}
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: 10,
                  padding: spacing.sm,
                }}
              >
                <div style={{ color: colors.maroonDeep, fontWeight: 700 }}>
                  {issue.title}
                </div>
                <div style={{ color: colors.inkMuted, marginTop: spacing.xs }}>
                  {issue.detail}
                </div>
                <div style={{ marginTop: spacing.sm }}>
                  <Button
                    onClick={() => handlePreviewFix(issue)}
                    disabled={!isFixable || loading}
                    title={isFixable ? "Fix this issue" : "Auto-fix not available for this issue type"}
                  >
                    Preview Fix
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
