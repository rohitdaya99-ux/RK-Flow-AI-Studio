import { useMemo, useState } from "react";
import ClipGrid from "../../ui/components/ClipGrid";
import { Button, Card, ProgressBar } from "../../ui/theme/primitives";
import { colors, spacing } from "../../ui/theme";
import { analyzeEmotions } from "../perception/perceptionAnalyzers";
import { useSequenceAnalysis } from "../perception/useSequenceAnalysis";

export default function EmotionAIScreen() {
  const [filter, setFilter] = useState<string>("all");
  const { context, result, loading, progress, error, reanalyze } = useSequenceAnalysis({
    moduleId: "emotion-ai",
    analyze: analyzeEmotions
  });

  const tags = useMemo(
    () => Array.from(new Set((result?.clips ?? []).flatMap((clip) => clip.emotions))),
    [result?.clips]
  );

  const items = (result?.clips ?? [])
    .filter((clip) => filter === "all" || clip.emotions.includes(filter))
    .map((clip) => ({
      id: clip.clipId,
      title: clip.clipName,
      subtitle: clip.source,
      badges: [clip.source === "visual" ? "Visual" : "Metadata-only", ...clip.emotions],
      detail: `${(clip.confidence * 100).toFixed(0)}% confidence`
    }));

  if (!context) {
    return <Card title="Emotion AI">Open a sequence to analyze.</Card>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="Emotion AI" subtitle={result?.source ?? "Metadata-only emotion inference"}>
        <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: spacing.xs, flexWrap: "wrap" }}>
            <button onClick={() => setFilter("all")} style={chipButton(filter === "all")}>All</button>
            {tags.map((tag) => (
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

      <ClipGrid items={items} emptyLabel="No clips matched the selected emotion filter." />
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
