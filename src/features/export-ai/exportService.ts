import { premiereAPI } from "../../services/PremiereAPI";
import { ExportPresetConfig } from "./presets";

export interface ExportCapabilityReport {
  canAttemptDirectExport: boolean;
  missing: string[];
  note: string;
}

export interface ExportQueueItem {
  id: string;
  presetId: ExportPresetConfig["id"];
  presetLabel: string;
  outputName: string;
  destination: string;
  status: "queued" | "handoff" | "submitted" | "failed";
  detail: string;
  createdAt: string;
}

export async function inspectExportCapability(): Promise<ExportCapabilityReport> {
  try {
    const sequence = await premiereAPI.getActiveSequence();
    const missing: string[] = [];

    if (!sequence) {
      missing.push("No active sequence");
    }

    if (!sequence?.exportAsMediaDirect) {
      missing.push("sequence.exportAsMediaDirect");
    }

    if (!sequence?.getExportFileExtension) {
      missing.push("sequence.getExportFileExtension");
    }

    if (missing.length > 0) {
      return {
        canAttemptDirectExport: false,
        missing,
        note:
          "This workspace has no verified preset-discovery path wired into the panel runtime yet. Export AI will prepare a Media Encoder hand-off instead of pretending a one-click export is confirmed."
      };
    }

    return {
      canAttemptDirectExport: true,
      missing: [],
      note:
        "Premiere reports a direct export API surface, but this repo has not manually re-verified an end-to-end delivery export from the panel in the current session."
    };
  } catch (error) {
    return {
      canAttemptDirectExport: false,
      missing: ["Premiere capability inspection failed"],
      note: error instanceof Error ? error.message : "Could not inspect export capability."
    };
  }
}

export function buildOutputName(
  sequenceName: string,
  presetLabel: string,
  template: string
) {
  const today = new Date();
  const date = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  return template
    .replaceAll("{sequenceName}", sanitize(sequenceName || "Sequence"))
    .replaceAll("{preset}", sanitize(presetLabel))
    .replaceAll("{date}", date);
}

export function createQueueItem(args: {
  preset: ExportPresetConfig;
  outputName: string;
  destination: string;
  capability: ExportCapabilityReport;
}): ExportQueueItem {
  const handoff = !args.capability.canAttemptDirectExport;

  return {
    id: `${Date.now()}-${args.preset.id}`,
    presetId: args.preset.id,
    presetLabel: args.preset.label,
    outputName: args.outputName,
    destination: args.destination,
    status: handoff ? "handoff" : "queued",
    detail: handoff
      ? "Prepared for Premiere's native Media Encoder hand-off."
      : "Direct export API detected, but still awaiting manual verification and preset wiring.",
    createdAt: new Date().toISOString()
  };
}

function sanitize(value: string) {
  return value.replace(/[^\w.-]+/g, "_");
}
