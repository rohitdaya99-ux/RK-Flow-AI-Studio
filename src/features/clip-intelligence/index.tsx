import { useState } from "react";
import ClipGrid from "../../ui/components/ClipGrid";
import { Button, Card, ProgressBar } from "../../ui/theme/primitives";
import { colors, spacing } from "../../ui/theme";
import { analyzeClipIntelligence } from "../perception/perceptionAnalyzers";
import { useSequenceAnalysis } from "../perception/useSequenceAnalysis";

export default function ClipIntelligenceScreen() {
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);
  const { context, result, loading, progress, error, reanalyze } = useSequenceAnalysis({
    moduleId: "clip-intelligence",
    analyze: analyzeClipIntelligence
  });

  if (!context) {
    return <Card title="Clip Intelligence">Open a sequence to analyze.</Card>;
  }

  const selectedClip = result?.clips.find((clip) => clip.clipId === selectedClipId) ?? null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="Clip Intelligence" subtitle={result?.formula ?? "Metadata fallback scoring"}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm, flexWrap: "wrap" }}>
          <div style={{ color: colors.inkMuted, minWidth: 220 }}>
            {loading && <ProgressBar value={progress.percent} label={`${progress.completed}/${progress.total} clips`} />}
            <div style={{ marginTop: loading ? spacing.xs : 0 }}>{error || progress.label}</div>
          </div>
          <Button variant="secondary" onClick={() => void reanalyze()} disabled={loading}>
            Re-analyze
          </Button>
        </div>
      </Card>

      <ClipGrid
        items={(result?.clips ?? []).map((clip) => ({
          id: clip.clipId,
          title: clip.clipName,
          subtitle: clip.source,
          badges: [
            clip.source === "visual" ? "Visual" : "Metadata-only",
            clip.duplicateGroup ? `Duplicate: ${clip.duplicateGroup}` : "Unique"
          ],
          score: clip.aiRating,
          detail: (
            <button
              type="button"
              onClick={() => setSelectedClipId(clip.clipId)}
              style={{ border: "none", background: "transparent", color: colors.maroon, cursor: "pointer", padding: 0 }}
            >
              View sub-score breakdown
            </button>
          )
        }))}
        emptyLabel="No selected clips available for clip intelligence."
      />

      {selectedClip && (
        <Card title={selectedClip.clipName} subtitle="Technical breakdown">
          <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}>
            <Metric label="Blur" value={selectedClip.blur} />
            <Metric label="Focus" value={selectedClip.focus} />
            <Metric label="Noise" value={selectedClip.noise} />
            <Metric label="Exposure" value={selectedClip.exposure} />
            <Metric label="White Balance" value={selectedClip.whiteBalance} />
          </div>
        </Card>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ border: `1px solid ${colors.border}`, borderRadius: 10, padding: spacing.sm, flex: "1 1 160px" }}>
      <div style={{ color: colors.inkMuted, fontSize: 12 }}>{label}</div>
      <div style={{ color: colors.maroonDeep, fontSize: 20, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
