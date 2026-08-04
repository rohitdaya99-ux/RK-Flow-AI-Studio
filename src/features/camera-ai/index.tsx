import { useMemo, useState } from "react";
import ClipGrid from "../../ui/components/ClipGrid";
import { Button, Card, ProgressBar } from "../../ui/theme/primitives";
import { colors, spacing } from "../../ui/theme";
import { analyzeCamera } from "../perception/perceptionAnalyzers";
import { useSequenceAnalysis } from "../perception/useSequenceAnalysis";

export default function CameraAIScreen() {
  const [filter, setFilter] = useState("all");
  const { context, result, loading, progress, error, reanalyze } = useSequenceAnalysis({
    moduleId: "camera-ai",
    analyze: analyzeCamera
  });

  const shotTypes = useMemo(
    () => Array.from(new Set((result?.clips ?? []).map((clip) => clip.shotType))),
    [result?.clips]
  );

  const items = (result?.clips ?? [])
    .filter((clip) => filter === "all" || clip.shotType === filter)
    .map((clip) => ({
      id: clip.clipId,
      title: clip.clipName,
      subtitle: `${clip.shotType} • ${clip.movement}`,
      badges: [clip.source === "visual" ? "Visual" : "Metadata-only", clip.shotType, clip.movement],
      detail: `${(clip.confidence * 100).toFixed(0)}% confidence • ${clip.source}`
    }));

  if (!context) {
    return <Card title="Camera AI">Open a sequence to analyze.</Card>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="Camera AI" subtitle={result?.source ?? "Metadata-only classification"}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: spacing.xs, flexWrap: "wrap" }}>
            <button onClick={() => setFilter("all")} style={chipButton(filter === "all")}>All</button>
            {shotTypes.map((tag) => (
              <button key={tag} onClick={() => setFilter(tag)} style={chipButton(filter === tag)}>
                {tag}
              </button>
            ))}
          </div>
          <Button variant="secondary" onClick={() => void reanalyze()} disabled={loading}>
            Re-analyze
          </Button>
        </div>
        <div style={{ marginTop: spacing.md, display: "flex", flexDirection: "column", gap: spacing.sm }}>
          {loading && <ProgressBar value={progress.percent} label={`${progress.completed}/${progress.total} clips`} />}
          <div style={{ color: error ? colors.danger : colors.inkMuted }}>
            {error || progress.label}
          </div>
        </div>
      </Card>

      <ClipGrid items={items} emptyLabel="No clips matched the selected shot type." />
    </div>
  );
}

function chipButton(active: boolean) {
  return {
    borderRadius: 999,
    border: `1px solid ${active ? colors.gold : colors.border}`,
    background: active ? colors.panelMuted : colors.white,
    color: active ? colors.maroonDeep : colors.ink,
    padding: "6px 10px",
    cursor: "pointer"
  } as const;
}
