import { useMemo, useState } from "react";
import { MemoryEngine } from "../../core/brain";
import { FaceCluster } from "../../core/brain/types";
import { Button, Card, Input, ProgressBar, StatusChip } from "../../ui/theme/primitives";
import { colors, spacing } from "../../ui/theme";
import { analyzeFaceClusters } from "../perception/perceptionAnalyzers";
import { useSequenceAnalysis } from "../perception/useSequenceAnalysis";

const memory = new MemoryEngine();

export default function FaceAIScreen() {
  const [filter, setFilter] = useState("");
  const { context, result, loading, progress, error, reanalyze } = useSequenceAnalysis({
    moduleId: "face-ai",
    analyze: analyzeFaceClusters
  });
  const sequenceKey = context?.sequenceKey ?? "";

  const clusters = useMemo(() => {
    const list = result?.clusters ?? [];
    return list.filter((cluster) =>
      cluster.label.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, result?.clusters]);

  if (!context) {
    return <Card title="Face AI">Open a sequence to analyze.</Card>;
  }

  function renameCluster(cluster: FaceCluster) {
    const next = window.prompt("Rename cluster", cluster.label);

    if (!next || !result) {
      return;
    }

    const updated = result.clusters.map((item) =>
      item.id === cluster.id ? { ...item, label: next.trim() } : item
    );

    memory.setAnalysis(`face-ai:${sequenceKey}`, "result", {
      ...result,
      clusters: updated
    });

    window.location.reload();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="Face AI" subtitle={result?.source ?? "Metadata-only clustering fallback"}>
        <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", justifyContent: "space-between" }}>
          <Input
            placeholder="Search person"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            style={{ maxWidth: 280 }}
          />
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md }}>
        {clusters.map((cluster) => (
          <Card key={cluster.id} title={cluster.label} subtitle={`Role: ${cluster.role}`} style={{ flex: "1 1 240px" }}>
            <div style={{ display: "flex", gap: spacing.xs, flexWrap: "wrap" }}>
              <StatusChip label={cluster.source === "visual" ? "Visual" : "Metadata-only"} tone={cluster.source === "visual" ? "success" : "warning"} />
              <StatusChip label={`${(cluster.confidence * 100).toFixed(0)}%`} />
              {cluster.emotionTags.map((tag) => (
                <StatusChip key={tag} label={tag} />
              ))}
            </div>
            <div style={{ marginTop: spacing.md, color: colors.inkMuted }}>
              Appears in {cluster.clipIds.length} selected clips.
            </div>
            <div style={{ marginTop: spacing.md }}>
              <Button variant="ghost" onClick={() => renameCluster(cluster)}>
                Rename Cluster
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
