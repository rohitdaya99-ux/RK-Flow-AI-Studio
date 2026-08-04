import { useEffect, useMemo, useState } from "react";
import { Button, Card, Input, StatusChip } from "../../ui/theme/primitives";
import { colors, spacing, typography } from "../../ui/theme";
import { premiereService } from "../../services/premiereService";
import { buildOutputName, createQueueItem, ExportCapabilityReport, ExportQueueItem, inspectExportCapability } from "./exportService";
import { EXPORT_PRESETS } from "./presets";

const DEFAULT_TEMPLATE = "{sequenceName}_{preset}_{date}";

export default function ExportAIScreen() {
  const [selectedPresetId, setSelectedPresetId] = useState(EXPORT_PRESETS[0].id);
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [destination, setDestination] = useState("/exports");
  const [queue, setQueue] = useState<ExportQueueItem[]>([]);
  const [capability, setCapability] = useState<ExportCapabilityReport | null>(null);
  const [timelineName, setTimelineName] = useState("Sequence");

  useEffect(() => {
    void inspectExportCapability().then(setCapability);
    void premiereService.getTimelineInfo().then((info) => {
      setTimelineName(info.sequenceName || "Sequence");
    });
  }, []);

  const preset = useMemo(
    () => EXPORT_PRESETS.find((item) => item.id === selectedPresetId) ?? EXPORT_PRESETS[0],
    [selectedPresetId]
  );
  const outputName = buildOutputName(timelineName, preset.label, template);

  function queueExport() {
    const next = createQueueItem({
      preset,
      outputName,
      destination,
      capability:
        capability ?? {
          canAttemptDirectExport: false,
          missing: ["Capability check still loading"],
          note: "Capability inspection is still loading; queueing as Media Encoder hand-off."
        }
    });

    setQueue((current) => [next, ...current]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="Export AI" subtitle="Delivery presets, naming templates, and an honest export hand-off queue.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md }}>
          <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: spacing.sm }}>
            <label htmlFor="export-preset" style={{ color: colors.maroonDeep, fontWeight: 700 }}>
              Delivery preset
            </label>
            <select
              id="export-preset"
              value={selectedPresetId}
              onChange={(event) => setSelectedPresetId(event.target.value as typeof selectedPresetId)}
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
              {EXPORT_PRESETS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <div style={{ color: colors.inkMuted }}>
              {preset.resolution} • {preset.aspectRatio} • {preset.targetBitrate} • {preset.format}
            </div>
            <div style={{ color: colors.inkMuted, fontSize: typography.sizes.sm }}>{preset.notes}</div>
          </div>

          <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: spacing.sm }}>
            <label htmlFor="export-template" style={{ color: colors.maroonDeep, fontWeight: 700 }}>
              Naming template
            </label>
            <Input
              id="export-template"
              value={template}
              onChange={(event) => setTemplate(event.target.value)}
            />
            <label htmlFor="export-destination" style={{ color: colors.maroonDeep, fontWeight: 700 }}>
              Destination folder
            </label>
            <Input
              id="export-destination"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
            <div style={{ color: colors.inkMuted }}>
              Output name preview: <strong>{outputName}</strong>
            </div>
          </div>
        </div>

        <div style={{ marginTop: spacing.md, display: "flex", gap: spacing.sm, flexWrap: "wrap", alignItems: "center" }}>
          <StatusChip
            label={
              capability?.canAttemptDirectExport
                ? "Direct export API detected"
                : "Media Encoder hand-off only"
            }
            tone={capability?.canAttemptDirectExport ? "warning" : "neutral"}
          />
          <Button onClick={queueExport}>Add To Export Queue</Button>
        </div>

        <div style={{ marginTop: spacing.md, color: colors.inkMuted }}>
          {capability?.note ?? "Inspecting Premiere export capability..."}
        </div>
        {capability && capability.missing.length > 0 && (
          <div style={{ marginTop: spacing.xs, color: colors.warning }}>
            Missing or unverified host surface: {capability.missing.join(", ")}
          </div>
        )}
      </Card>

      <Card title="Export Queue" subtitle="Queue state is real UI. Final rendering still depends on Premiere's native export path.">
        {queue.length === 0 ? (
          <div style={{ color: colors.inkMuted }}>
            Queue a delivery preset to prepare the export hand-off.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {queue.map((item) => (
              <div
                key={item.id}
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: 10,
                  background: colors.white,
                  padding: spacing.sm
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ color: colors.maroonDeep, fontWeight: 700 }}>{item.outputName}</div>
                    <div style={{ color: colors.inkMuted }}>
                      {item.presetLabel} • {item.destination}
                    </div>
                  </div>
                  <StatusChip
                    label={statusLabel(item.status)}
                    tone={item.status === "failed" ? "danger" : item.status === "submitted" ? "success" : "warning"}
                  />
                </div>
                <div style={{ marginTop: spacing.sm, color: colors.inkMuted }}>
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function statusLabel(status: ExportQueueItem["status"]) {
  switch (status) {
    case "handoff":
      return "Ready for Media Encoder";
    case "queued":
      return "Queued";
    case "submitted":
      return "Submitted";
    case "failed":
      return "Failed";
    default:
      return status;
  }
}
