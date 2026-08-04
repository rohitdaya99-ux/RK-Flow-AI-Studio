import { useEffect, useMemo, useState } from "react";
import { GEMINI_MODEL, getGeminiUsageStats, getRecentGeminiCalls, runGemini } from "../../ai/GeminiService";
import { APP_VERSION } from "../../config/appInfo";
import { AIRouter } from "../../ai/router/AIRouter";
import { measureTimelineRead, TimelineReadMetrics } from "../analytics/metrics";
import { getDirectorTrace, subscribeDirectorTrace } from "../ai-director/traceStore";
import { loggerService } from "../../services/loggerService";
import { getSystemStats } from "../../services/systemStats";
import { LogEntry, LogSeverity } from "../../types";
import { Button, Card, Input, StatusChip, Tabs } from "../../ui/theme/primitives";
import { colors, spacing, typography } from "../../ui/theme";

const router = new AIRouter();
const LOG_FILTERS: Array<LogSeverity | "all"> = ["all", "info", "warn", "error", "success"];

export default function DeveloperCenterScreen() {
  const [activeTab, setActiveTab] = useState("diagnostics");
  const [timelineMetrics, setTimelineMetrics] = useState<TimelineReadMetrics | null>(null);
  const [logEntries, setLogEntries] = useState<LogEntry[]>(loggerService.getEntries());
  const [logFilter, setLogFilter] = useState<LogSeverity | "all">("all");
  const [selectedCallId, setSelectedCallId] = useState("");
  const [directorTrace, setDirectorTrace] = useState<string[]>(getDirectorTrace());
  const [apiPrompt, setApiPrompt] = useState("Reply with exactly: RK Flow dev test");
  const [systemInstruction, setSystemInstruction] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [apiStatus, setApiStatus] = useState("Developer tool only. Sends a live request through GeminiService.");
  const [apiPending, setApiPending] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void measureTimelineRead().then((metrics) => {
      if (!cancelled) {
        setTimelineMetrics(metrics);
      }
    });

    const unsubscribeLogs = loggerService.subscribe((entries) => {
      setLogEntries(entries);
    });
    const unsubscribeTrace = subscribeDirectorTrace((entries) => {
      setDirectorTrace(entries);
    });

    return () => {
      cancelled = true;
      unsubscribeLogs();
      unsubscribeTrace();
    };
  }, []);

  const systemStats = getSystemStats();
  const usageStats = getGeminiUsageStats();
  const recentCalls = getRecentGeminiCalls();
  const selectedCall = recentCalls.find((call) => call.id === selectedCallId) ?? recentCalls[0] ?? null;
  const filteredLogs = useMemo(
    () => logEntries.filter((entry) => logFilter === "all" || entry.severity === logFilter),
    [logEntries, logFilter]
  );

  useEffect(() => {
    if (!selectedCallId && recentCalls.length > 0) {
      setSelectedCallId(recentCalls[0].id);
    }
  }, [recentCalls, selectedCallId]);

  async function handleProviderSmokeTest() {
    setApiPending(true);
    setApiStatus("Testing provider via AIRouter...");

    try {
      const response = await router.chat({
        prompt: "Reply with exactly: RK Flow developer diagnostics OK"
      });
      setApiStatus(response.text);
    } catch (error) {
      setApiStatus(error instanceof Error ? error.message : "AIRouter test failed.");
    } finally {
      setApiPending(false);
    }
  }

  async function handleApiTest() {
    setApiPending(true);
    setApiStatus("Sending live GeminiService request...");
    setApiResponse("");

    try {
      const response = await runGemini(apiPrompt, {
        systemInstruction: systemInstruction.trim() || undefined
      });
      setApiResponse(response);
      setApiStatus("GeminiService request completed.");
    } catch (error) {
      setApiStatus(error instanceof Error ? error.message : "GeminiService request failed.");
    } finally {
      setApiPending(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="Developer Center" subtitle="Diagnostics, prompt inspection, and debug tooling for Monday, August 3, 2026.">
        <Tabs
          items={[
            { id: "diagnostics", label: "Diagnostics" },
            { id: "logs", label: "Logs" },
            { id: "prompts", label: "Prompt Builder" },
            { id: "debugger", label: "AI Debugger" },
            { id: "api", label: "API Tester" }
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />
      </Card>

      {activeTab === "diagnostics" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md }}>
          <Card title="Environment" subtitle="Real runtime facts from the current panel bridge." style={{ flex: "1 1 320px" }}>
            <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
              <StatusChip label="Provider Gemini" tone="success" />
              <StatusChip label={`Model ${GEMINI_MODEL}`} />
              <StatusChip label={`Plugin ${APP_VERSION}`} />
            </div>
            <div style={{ marginTop: spacing.md, display: "flex", flexDirection: "column", gap: spacing.sm, color: colors.inkMuted }}>
              <div>Premiere bridge: {timelineMetrics?.timeline ? "Connected" : "No active sequence or bridge response yet"}</div>
              <div>Premiere version: Unavailable in this panel bridge</div>
              <div>Premiere build: Unavailable in this panel bridge</div>
              <div>GPU: {systemStats.gpu}</div>
              <div>RAM: {systemStats.ram}</div>
            </div>
            <div style={{ marginTop: spacing.md }}>
              <Button variant="secondary" onClick={() => void handleProviderSmokeTest()} disabled={apiPending}>
                Test AIRouter Provider
              </Button>
            </div>
          </Card>

          <Card title="Performance Monitor" subtitle="Reuses the same Module 4 analytics sources." style={{ flex: "1 1 320px" }}>
            <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
              <StatusChip label={`${usageStats.totalCalls} Gemini calls`} />
              <StatusChip label={`Avg ${usageStats.averageDurationMs} ms`} />
              <StatusChip
                label={`Timeline ${timelineMetrics ? `${timelineMetrics.latencyMs} ms` : "—"}`}
                tone={timelineMetrics?.error ? "warning" : "success"}
              />
            </div>
            <div style={{ marginTop: spacing.md, display: "flex", flexDirection: "column", gap: spacing.sm, color: colors.inkMuted }}>
              <div>Sequence: {timelineMetrics?.timeline?.sequenceName || "No active sequence"}</div>
              <div>Clips scanned: {timelineMetrics?.clipCount ?? 0}</div>
              <div>Failures: {usageStats.failedCalls}</div>
              {timelineMetrics?.error && <div style={{ color: colors.warning }}>{timelineMetrics.error}</div>}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "logs" && (
        <Card title="Logs Viewer" subtitle="Shared logger service entries, filterable by severity.">
          <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", marginBottom: spacing.md }}>
            {LOG_FILTERS.map((filter) => (
              <Button
                key={filter}
                variant={logFilter === filter ? "primary" : "secondary"}
                onClick={() => setLogFilter(filter)}
              >
                {filter.toUpperCase()}
              </Button>
            ))}
            <Button variant="ghost" onClick={() => loggerService.clear()}>
              Clear Logs
            </Button>
          </div>
          <div style={panelStyle}>
            {filteredLogs.length === 0 ? (
              <div style={{ color: colors.inkMuted }}>No shared log entries captured yet.</div>
            ) : (
              filteredLogs.slice().reverse().map((entry) => (
                <div key={entry.id} style={{ paddingBottom: spacing.sm, borderBottom: `1px solid ${colors.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm, flexWrap: "wrap" }}>
                    <strong style={{ color: colors.maroonDeep }}>{entry.severity.toUpperCase()}</strong>
                    <span style={{ color: colors.inkMuted, fontSize: typography.sizes.xs }}>{entry.timestamp}</span>
                  </div>
                  <div style={{ color: colors.ink, marginTop: 4 }}>{entry.message}</div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}

      {activeTab === "prompts" && (
        <Card title="Prompt Builder" subtitle="Exact GeminiService prompt payloads from recent recorded calls.">
          {recentCalls.length === 0 ? (
            <div style={{ color: colors.inkMuted }}>No GeminiService calls are recorded in this session yet.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
              <select
                value={selectedCall?.id ?? ""}
                onChange={(event) => setSelectedCallId(event.target.value)}
                style={selectStyle}
              >
                {recentCalls.map((call) => (
                  <option key={call.id} value={call.id}>
                    {new Date(call.startedAt).toLocaleTimeString()} • {call.kind} • {call.model}
                  </option>
                ))}
              </select>
              {selectedCall && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md }}>
                  <div style={{ flex: "1 1 320px" }}>
                    <div style={sectionLabelStyle}>Exact Prompt</div>
                    <pre style={panelStyle}>{selectedCall.promptText}</pre>
                  </div>
                  <div style={{ flex: "1 1 320px" }}>
                    <div style={sectionLabelStyle}>Response</div>
                    <pre style={panelStyle}>{selectedCall.responseText || selectedCall.errorMessage || "No response body stored."}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      )}

      {activeTab === "debugger" && (
        <Card title="AI Debugger" subtitle="The same live AI Director step-log stream used by the feature screen.">
          <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", marginBottom: spacing.md }}>
            <StatusChip label={`${directorTrace.length} steps`} />
          </div>
          <div style={panelStyle}>
            {directorTrace.length === 0 ? (
              <div style={{ color: colors.inkMuted }}>Run AI Director to populate the shared reasoning trace.</div>
            ) : (
              directorTrace.map((entry, index) => (
                <pre key={`${index}-${entry.slice(0, 16)}`} style={preStyle}>
                  {entry}
                </pre>
              ))
            )}
          </div>
        </Card>
      )}

      {activeTab === "api" && (
        <Card title="API Testing Panel" subtitle="Developer-only raw GeminiService probe. This is not user-facing workflow UI.">
          <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", marginBottom: spacing.md }}>
            <StatusChip label="Dev Tool" tone="warning" />
            <StatusChip label={`Model ${GEMINI_MODEL}`} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            <Input multiline rows={3} value={systemInstruction} onChange={(event) => setSystemInstruction(event.target.value)} placeholder="Optional system instruction" />
            <Input multiline rows={6} value={apiPrompt} onChange={(event) => setApiPrompt(event.target.value)} placeholder="Prompt to send through GeminiService" />
            <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
              <Button onClick={() => void handleApiTest()} disabled={apiPending || !apiPrompt.trim()}>
                {apiPending ? "Running..." : "Send Raw Prompt"}
              </Button>
            </div>
            <div style={{ color: colors.inkMuted }}>{apiStatus}</div>
            <pre style={panelStyle}>{apiResponse || "No response yet."}</pre>
          </div>
        </Card>
      )}
    </div>
  );
}

const panelStyle = {
  maxHeight: 360,
  overflow: "auto",
  borderRadius: 10,
  border: `1px solid ${colors.border}`,
  background: colors.white,
  padding: spacing.sm,
  whiteSpace: "pre-wrap" as const,
  wordBreak: "break-word" as const
};

const preStyle = {
  margin: 0,
  whiteSpace: "pre-wrap" as const,
  wordBreak: "break-word" as const
};

const sectionLabelStyle = {
  color: colors.maroonDeep,
  fontWeight: 700,
  marginBottom: spacing.xs
};

const selectStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  borderRadius: 10,
  border: `1px solid ${colors.border}`,
  background: colors.white,
  color: colors.ink,
  padding: "10px 12px"
};
