import { useMemo, useState } from "react";
import { MusicAnalysisResult } from "../../core/brain/types";
import { Card, ProgressBar, StatusChip } from "../../ui/theme/primitives";
import { colors, spacing } from "../../ui/theme";
import { analyzeAndCacheMusicFile } from "./musicAnalysisCache";

export default function MusicAIScreen() {
  const [analysis, setAnalysis] = useState<MusicAnalysisResult | null>(null);
  const [progress, setProgress] = useState("Select a song file to analyze.");
  const [progressPercent, setProgressPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const chartPoints = useMemo(() => {
    if (!analysis || analysis.energyCurve.length === 0) {
      return "";
    }

    return analysis.energyCurve
      .map((value, index) => {
        const x = (index / Math.max(analysis.energyCurve.length - 1, 1)) * 100;
        const y = 40 - value * 34;
        return `${x},${Math.max(4, y)}`;
      })
      .join(" ");
  }, [analysis]);

  async function onFileChange(file: File | null) {
    if (!file) {
      return;
    }

    setLoading(true);
    setProgress("Reading audio file...");
    setProgressPercent(10);

    try {
      const result = await analyzeAndCacheMusicFile(file, (next) => {
        setProgress(next.label);
        if (next.percent !== undefined) {
          setProgressPercent(next.percent);
        }
      });
      setAnalysis(result);
      setProgress("Music analysis complete.");
      setProgressPercent(100);
    } catch (error) {
      setProgress(error instanceof Error ? error.message : "Could not analyze the song.");
      setProgressPercent(0);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="Music AI" subtitle={analysis?.source ?? "Audio-signal analysis"}>
        <div style={{ display: "flex", gap: spacing.md, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="file"
            accept="audio/*"
            onChange={(event) => void onFileChange(event.target.files?.[0] ?? null)}
          />
          {analysis && <StatusChip label={`${analysis.bpm} BPM`} tone="success" />}
        </div>
        {loading && (
          <div style={{ marginTop: spacing.md }}>
            <ProgressBar value={progressPercent} label={`${progressPercent}%`} />
          </div>
        )}
        <div style={{ marginTop: spacing.md, color: colors.inkMuted }}>
          {loading ? "Analyzing..." : progress}
        </div>
      </Card>

      {analysis && (
        <>
          <Card title={analysis.fileName} subtitle={`${analysis.genre} • ${analysis.mood}`}>
            <svg viewBox="0 0 100 40" style={{ width: "100%", height: 120, background: colors.white, borderRadius: 10 }}>
              <polyline
                fill="none"
                stroke={colors.maroon}
                strokeWidth="1.4"
                points={chartPoints}
              />
              {analysis.beatPositions.map((beat, index) => (
                <line
                  key={`${beat}-${index}`}
                  x1={(beat / Math.max(analysis.sections[analysis.sections.length - 1]?.end || 1, 1)) * 100}
                  x2={(beat / Math.max(analysis.sections[analysis.sections.length - 1]?.end || 1, 1)) * 100}
                  y1="0"
                  y2="40"
                  stroke={colors.gold}
                  strokeWidth="0.5"
                />
              ))}
            </svg>
          </Card>

          <Card title="Sections">
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
              {analysis.sections.map((section) => (
                <div key={section.id} style={{ padding: spacing.sm, borderRadius: 10, border: `1px solid ${colors.border}` }}>
                  {section.label}: {section.start.toFixed(1)}s - {section.end.toFixed(1)}s
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
