import { GoogleGenerativeAI } from "@google/generative-ai";
import { TimelineInfo } from "./premiereService";

const GEMINI_KEY_STORAGE = "rkflow.gemini.apiKey";

export interface WeddingPlan {
  title: string;
  durationSeconds: number;
  style: string;
  editSteps: string[];
  markerSuggestions: string[];
  note: string;
}

export function getStoredGeminiKey(): string {
  return localStorage.getItem(GEMINI_KEY_STORAGE) ?? "";
}

export function saveGeminiKey(apiKey: string): void {
  localStorage.setItem(GEMINI_KEY_STORAGE, apiKey.trim());
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

  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({
    model: "gemini-3.6-flash",
    generationConfig: { responseMimeType: "application/json" }
  });
  const prompt = [
    "Create a read-only wedding-video edit plan. Return JSON only.",
    "Do not claim edits were executed. Do not invent clip IDs.",
    "Use this exact shape:",
    '{"title":"string","durationSeconds":number,"style":"string","editSteps":["string"],"markerSuggestions":["string"],"note":"string"}',
    `Sequence: ${timeline.sequenceName}`,
    `Video tracks: ${timeline.videoTracks}; audio tracks: ${timeline.audioTracks}; duration: ${timeline.duration}.`,
    `Requested style: ${style}; target duration: ${targetDuration} seconds.`
  ].join("\n");
  const result = await model.generateContent(prompt);
  return parseWeddingPlan(result.response.text(), style, targetDuration);
}

function parseWeddingPlan(
  response: string,
  fallbackStyle: string,
  fallbackDuration: number
): WeddingPlan {
  const parsed = JSON.parse(response) as Partial<WeddingPlan>;

  if (!Array.isArray(parsed.editSteps) || !Array.isArray(parsed.markerSuggestions)) {
    throw new Error("Gemini returned an invalid wedding plan.");
  }

  return {
    title: typeof parsed.title === "string" ? parsed.title : "Wedding edit plan",
    durationSeconds: typeof parsed.durationSeconds === "number" ? parsed.durationSeconds : fallbackDuration,
    style: typeof parsed.style === "string" ? parsed.style : fallbackStyle,
    editSteps: parsed.editSteps.filter((step): step is string => typeof step === "string"),
    markerSuggestions: parsed.markerSuggestions.filter((marker): marker is string => typeof marker === "string"),
    note: typeof parsed.note === "string" ? parsed.note : "Review this plan before applying any edit."
  };
}
