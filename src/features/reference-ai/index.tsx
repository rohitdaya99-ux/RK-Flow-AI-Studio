import { useState } from "react";
import { AutoEditAssembler } from "../auto-edit/AutoEditAssembler";
import { ReferenceAnalyzer } from "./ReferenceAnalyzer";
import { Button, Card, StatusChip } from "../../ui/theme/primitives";
import { colors, spacing } from "../../ui/theme";

export default function ReferenceAIScreen() {
  const [inputSource, setInputSource] = useState("");
  const [analysisResult, setAnalysisResult] = useState<Record<string, unknown> | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [signalSourceUsed, setSignalSourceUsed] = useState("");

  async function handleAnalyze() {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setSignalSourceUsed("");

    try {
      const analyzer = new ReferenceAnalyzer();
      const result = await analyzer.analyze(inputSource);
      setAnalysisResult(result);

      if (!result.error) {
        setSignalSourceUsed(
          String(
            result.signalSource ||
              (inputSource.startsWith("http") ? `URL: ${inputSource}` : `Local File: ${inputSource}`)
          )
        );
      }
    } finally {
      setIsAnalyzing(false);
    }
  }

  async function handleRecreateStyle() {
    try {
      const assembler = new AutoEditAssembler();
      const result = await assembler.assemble("Reel", [], analysisResult ?? undefined);
      alert(result);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to recreate style.");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="Reference AI" subtitle="Analyze a reel or source clip and map its storytelling signature into RK Flow.">
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
          <label htmlFor="reference-ai-source" style={{ color: colors.maroonDeep, fontWeight: 700 }}>
            Source URL or media path
          </label>
          <input
            id="reference-ai-source"
            type="text"
            value={inputSource}
            onChange={(event) => setInputSource(event.target.value)}
            placeholder="Instagram Reel, YouTube URL, or local file path"
            style={{
              width: "100%",
              boxSizing: "border-box",
              borderRadius: 10,
              border: `1px solid ${colors.border}`,
              background: colors.white,
              color: colors.ink,
              padding: "10px 12px"
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.md, flexWrap: "wrap", marginTop: spacing.md }}>
          <StatusChip label={isAnalyzing ? "Analyzing" : "Ready"} tone={isAnalyzing ? "warning" : "success"} />
          <Button onClick={() => void handleAnalyze()} disabled={isAnalyzing || inputSource.trim().length === 0}>
            {isAnalyzing ? "Analyzing..." : "Analyze Reference"}
          </Button>
        </div>
        {signalSourceUsed && (
          <div style={{ marginTop: spacing.md, color: colors.inkMuted }}>
            Signal source used: <strong>{signalSourceUsed}</strong>
          </div>
        )}
      </Card>

      <Card title="Style Profile Card" subtitle="Structured output from the Phase 3 reference analysis path.">
        {!analysisResult ? (
          <div style={{ color: colors.inkMuted }}>
            Run an analysis to inspect the generated style profile and recreate it with Auto Edit.
          </div>
        ) : analysisResult.error ? (
          <div style={{ color: colors.danger }}>Error: {String(analysisResult.error)}</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {Object.entries(analysisResult).map(([key, value]) => (
              <div
                key={key}
                style={{
                  borderRadius: 10,
                  border: `1px solid ${colors.border}`,
                  background: colors.white,
                  padding: spacing.sm
                }}
              >
                <div style={{ color: colors.maroonDeep, fontWeight: 700 }}>
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase())}
                </div>
                <div style={{ color: colors.inkMuted, marginTop: spacing.xs, wordBreak: "break-word" }}>
                  {typeof value === "string" ? value : JSON.stringify(value)}
                </div>
              </div>
            ))}
            <div>
              <Button onClick={() => void handleRecreateStyle()}>
                Recreate This Style
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
