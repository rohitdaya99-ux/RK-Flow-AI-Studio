import { TimelineInfo } from "./premiereService";
import { AICopilot } from "../ai/copilot/AICopilot";
import { runGeminiStructured } from "../ai/GeminiService";
import { ResponseSchema, SchemaType } from "@google/generative-ai";

export interface WeddingPlan {
  title: string;
  durationSeconds: number;
  style: string;
  editSteps: string[];
  markerSuggestions: string[];
  note: string;
}

const copilot = new AICopilot();
const weddingPlanSchema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    title: { type: SchemaType.STRING },
    durationSeconds: { type: SchemaType.NUMBER },
    style: { type: SchemaType.STRING },
    editSteps: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    markerSuggestions: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    note: { type: SchemaType.STRING }
  },
  required: ["title", "durationSeconds", "style", "editSteps", "markerSuggestions", "note"]
};

export function getStoredGeminiKey(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem("rkflow.gemini.apiKey") ?? "";
}

export function saveGeminiKey(apiKey: string): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem("rkflow.gemini.apiKey", apiKey.trim());
}

export async function generateWeddingPlan(
  timeline: TimelineInfo,
  style: string,
  targetDuration: number
): Promise<WeddingPlan> {
  const apiKey = getStoredGeminiKey();

  if (!apiKey) {
    throw new Error("Add your Gemini API key before generating a plan.");
  }

  if (!timeline.connected || !timeline.sequenceName) {
    throw new Error("Open an active Premiere sequence before generating a plan.");
  }

  const resolved = await copilot.resolve<WeddingPlan>({
    intent: "wedding-plan:generate",
    context: { timeline, style, targetDuration },
    memoryScopeKey: `wedding-plan:${timeline.sequenceName}:${style}:${targetDuration}`,
    memoryCacheKey: "result",
    geminiResolver: async () =>
      runGeminiStructured(
        [
          "Create a read-only wedding-video edit plan.",
          "Do not claim edits were executed. Do not invent clip IDs.",
          `Sequence: ${timeline.sequenceName}`,
          `Video tracks: ${timeline.videoTracks}; audio tracks: ${timeline.audioTracks}; duration: ${timeline.duration}.`,
          `Requested style: ${style}; target duration: ${targetDuration} seconds.`
        ].join("\n"),
        weddingPlanSchema
      )
  });

  return resolved.value;
}
