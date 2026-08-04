import { AICopilot } from "../../ai/copilot/AICopilot";
import { runGeminiStructured } from "../../ai/GeminiService";
import { ResponseSchema, SchemaType } from "@google/generative-ai";

const copilot = new AICopilot();
const referenceProfileSchema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    cutPacing: { type: SchemaType.STRING },
    storyStructure: { type: SchemaType.STRING },
    motion: { type: SchemaType.STRING },
    effects: { type: SchemaType.STRING },
    fonts: { type: SchemaType.STRING },
    musicMood: { type: SchemaType.STRING },
    colorGrade: { type: SchemaType.STRING },
    summary: { type: SchemaType.STRING }
  },
  required: ["cutPacing", "storyStructure", "motion", "effects", "fonts", "musicMood", "colorGrade", "summary"]
};

export class ReferenceAnalyzer {
  async analyze(input: string): Promise<any> {
    if (input.startsWith("http://") || input.startsWith("https://")) {
      const resolved = await copilot.resolve<Record<string, unknown>>({
        intent: "reference-ai:analyze",
        context: { input },
        memoryScopeKey: `reference-ai:${input}`,
        memoryCacheKey: "result",
        geminiResolver: async () =>
          runGeminiStructured(
            `Analyze the following video content from ${input} for cut pacing, story structure, motion, effects, fonts, music mood, and color grade.`,
            referenceProfileSchema
          )
      });
      return {
        ...resolved.value,
        signalSource: `URL: ${input}`,
        resolutionPath: resolved.path
      };
    } else {
      return {
        summary:
          "Local file style analysis requires extracted frames plus a Gemini Vision request. That execution path is not wired in this workspace yet, so only URL text analysis is currently available.",
        signalSource: `Local File: ${input}`,
        requiresManualFrameExtraction: true
      };
    }
  }
}
