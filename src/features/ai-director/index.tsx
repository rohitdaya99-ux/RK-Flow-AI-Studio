import { useEffect, useState } from "react";
import { ContextEngine } from "./ContextEngine";
import { DecisionEngine } from "./DecisionEngine";
import { AIDirectorPlanningResult, PlanningEngine } from "./PlanningEngine";
import { AIDirectorReasoningResult, ReasoningEngine } from "./ReasoningEngine";
import { AIDirectorContext } from "./types";
import { LearnStyleEngine } from "../learn-style/LearnStyleEngine";
import { appendDirectorTrace, clearDirectorTrace, getDirectorTrace, subscribeDirectorTrace } from "./traceStore";
import { loggerService } from "../../services/loggerService";
import { Button, Card, ProgressBar, StatusChip } from "../../ui/theme/primitives";
import { colors, spacing } from "../../ui/theme";

export default function AIDirectorScreen() {
  const baseSteps = 3;
  const decisionLoopBudget = 8;
  const [logs, setLogs] = useState<string[]>(getDirectorTrace());
  const [isProcessing, setIsProcessing] = useState(false);
  const [styleProfiles, setStyleProfiles] = useState<Record<string, unknown>>({});
  const [selectedStyle, setSelectedStyle] = useState("");
  const [completedSteps, setCompletedSteps] = useState(0);
  const [totalSteps, setTotalSteps] = useState(baseSteps + decisionLoopBudget);
  const [progressLabel, setProgressLabel] = useState("Idle");

  useEffect(() => {
    const learnStyleEngine = new LearnStyleEngine();
    setStyleProfiles(learnStyleEngine.getStyleProfiles());

    return subscribeDirectorTrace((entries) => {
      setLogs(entries);
    });
  }, []);

  async function runEngine<T>(
    engineInstance: { run: (args?: any) => T | Promise<T> },
    logLabel: string,
    args?: unknown
  ): Promise<T> {
    const result = await engineInstance.run(args);
    appendDirectorTrace(`${logLabel}: ${JSON.stringify(result, null, 2)}`);
    setCompletedSteps((current) => Math.min(baseSteps, current + 1));
    setProgressLabel(`${logLabel} complete`);
    return result;
  }

  async function handleCreateCinematicFilm() {
    setIsProcessing(true);
    setCompletedSteps(0);
    setTotalSteps(baseSteps + decisionLoopBudget);
    setProgressLabel("Starting AI Director");
    clearDirectorTrace();
    loggerService.log("AI Director run started.", "info");

    if (selectedStyle) {
      console.log(`[RK Flow] AI Director style profile: ${selectedStyle}`);
      appendDirectorTrace(`Using style profile: ${selectedStyle}`);
    }

    try {
      const context = await runEngine<AIDirectorContext>(
        new ContextEngine(),
        "Gathering context"
      );
      const reasoningResult = await runEngine<AIDirectorReasoningResult>(
        new ReasoningEngine(),
        "Reasoning",
        context
      );
      const planningResult = await runEngine<AIDirectorPlanningResult>(
        new PlanningEngine(),
        "Planning",
        { context, reasoningResult }
      );
      const decisionResult = await new DecisionEngine().run({
        context,
        reasoningResult,
        planningResult,
        selectedStyle,
        onProgress: (progress) => {
          setCompletedSteps(baseSteps + progress.completed);
          setProgressLabel(progress.label);
        }
      });

      appendDirectorTrace(`Decision: ${JSON.stringify(decisionResult, null, 2)}`);
      appendDirectorTrace(`Final Output: ${JSON.stringify(decisionResult, null, 2)}`);
      loggerService.log("AI Director run completed.", "success");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("[RK Flow] AI Director failed:", error);
      appendDirectorTrace(`Error: ${message}`);
      loggerService.log(`AI Director run failed: ${message}`, "error");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="AI Director" subtitle="Context, planning, and auto-assembly for cinematic wedding edits.">
        <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.md, flexWrap: "wrap" }}>
          <StatusChip label={isProcessing ? "Generating" : "Ready"} tone={isProcessing ? "warning" : "success"} />
          <div style={{ color: colors.inkMuted }}>
            {Object.keys(styleProfiles).length} learned style profile{Object.keys(styleProfiles).length === 1 ? "" : "s"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm, marginTop: spacing.md }}>
          <label htmlFor="ai-director-style" style={{ color: colors.maroonDeep, fontWeight: 700 }}>
            Style profile
          </label>
          <select
            id="ai-director-style"
            value={selectedStyle}
            onChange={(event) => setSelectedStyle(event.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              borderRadius: 10,
              border: `1px solid ${colors.border}`,
              background: colors.white,
              color: colors.ink,
              padding: "10px 12px"
            }}
          >
            <option value="">Default Style</option>
            {Object.keys(styleProfiles).map((profileName) => (
              <option key={profileName} value={profileName}>
                {profileName}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: spacing.md }}>
          {isProcessing && (
            <div style={{ marginBottom: spacing.md }}>
              <ProgressBar
                value={(completedSteps / totalSteps) * 100}
                label={`${completedSteps}/${totalSteps} steps • ${progressLabel}`}
              />
            </div>
          )}
          <Button onClick={() => void handleCreateCinematicFilm()} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Create Cinematic Wedding Film"}
          </Button>
        </div>
      </Card>

      <Card title="Execution Log" subtitle="Direct output from the Phase 3 orchestration engines.">
        <div
          style={{
            minHeight: 220,
            maxHeight: 320,
            overflow: "auto",
            borderRadius: 10,
            border: `1px solid ${colors.border}`,
            background: colors.white,
            padding: spacing.sm
          }}
        >
          {logs.length === 0 ? (
            <div style={{ color: colors.inkMuted }}>Run AI Director to collect context, plan the film, and submit Premiere actions.</div>
          ) : (
            logs.map((log, index) => (
              <pre
                key={`${index}-${log.slice(0, 16)}`}
                style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", color: colors.ink }}
              >
                {log}
              </pre>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
