import { useState } from "react";
import { GEMINI_MODEL, getGeminiRuntimeStatus, getGeminiUsageStats } from "../ai/GeminiService";
import { AIRouter } from "../ai/router/AIRouter";
import { AI_PROVIDERS } from "../ai/config/AIRegistry";
import { Button, Card, Input, StatusChip } from "../ui/theme/primitives";
import { colors, spacing, typography } from "../ui/theme";
import { resolveGeminiConfig, saveGeminiConfig } from "../config";

const router = new AIRouter();

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState(resolveGeminiConfig().apiKey);
  const [status, setStatus] = useState("Add your Gemini API key in Settings.");
  const runtimeStatus = getGeminiRuntimeStatus();
  const usageStats = getGeminiUsageStats();

  function save() {
    saveGeminiConfig({ apiKey });
    setStatus(apiKey.trim() ? "Gemini API key saved locally." : "Gemini API key cleared.");
  }

  async function test() {
    try {
      setStatus("Testing Gemini connection...");
      const result = await router.chat({
        prompt: "Reply with exactly: RK Flow AI Connected"
      });
      setStatus(result.text);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Connection failed.");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}>
      <Card title="Gemini Settings" subtitle="Single active provider for RK Flow on Monday, August 3, 2026.">
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
            <StatusChip label="Active Provider: Gemini" tone="success" />
            <StatusChip label={`Model: ${GEMINI_MODEL}`} />
          </div>
          <Input
            type="password"
            placeholder="Paste Gemini API key"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
          />
          <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
            <Button onClick={save}>Save API Key</Button>
            <Button variant="secondary" onClick={() => void test()}>
              Test Connection
            </Button>
          </div>
          <div style={{ color: colors.inkMuted, fontSize: typography.sizes.sm }}>
            {status}
          </div>
        </div>
      </Card>

      <Card title="Appearance" subtitle="Theme foundation for the Indian wedding workspace.">
        <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
          <StatusChip label="Ivory base" />
          <StatusChip label="Maroon accent" />
          <StatusChip label="Muted gold accent" />
        </div>
      </Card>

      <Card title="Quota / Cache" subtitle="Session-level Gemini behavior and rate-limit visibility.">
        <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
          <StatusChip label={`${usageStats.totalCalls} session calls`} />
          <StatusChip label={`${usageStats.cacheHits} cache hits`} tone="success" />
          <StatusChip label={runtimeStatus.lastQuotaMessage || "No active quota warning"} tone={runtimeStatus.lastQuotaMessage ? "warning" : "neutral"} />
        </div>
        <div style={{ marginTop: spacing.md, color: colors.inkMuted, fontSize: typography.sizes.sm }}>
          Gemini free-tier limits are low. RK Flow now tries local command resolution first and only falls back to Gemini when local parsing is not confident.
        </div>
        {runtimeStatus.lastError && (
          <div style={{ marginTop: spacing.sm, color: colors.warning, fontSize: typography.sizes.sm }}>
            Last Gemini error: {runtimeStatus.lastError}
          </div>
        )}
      </Card>

      <Card title="Providers" subtitle="Only Gemini is wired today. The rest are scaffolded but intentionally disabled.">
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
          {AI_PROVIDERS.map((provider) => (
            <div
              key={provider.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: spacing.sm,
                alignItems: "center",
                padding: spacing.sm,
                border: `1px solid ${colors.border}`,
                borderRadius: 10,
                background: provider.enabled ? colors.panelMuted : colors.white
              }}
            >
              <div>
                <div style={{ color: colors.ink, fontWeight: 700 }}>{provider.label}</div>
                <div style={{ color: colors.inkMuted, fontSize: typography.sizes.xs }}>
                  {provider.enabled ? "Configured now" : "Coming soon"}
                </div>
              </div>
              <StatusChip label={provider.enabled ? "Active" : "Coming soon"} tone={provider.enabled ? "success" : "neutral"} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
