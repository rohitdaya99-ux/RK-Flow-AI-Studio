import { AICopilot } from "../ai/copilot/AICopilot";
import { runGeminiStructured } from "../ai/GeminiService";
import { ResponseSchema, SchemaType } from "@google/generative-ai";

export interface AIActionResult {
  success: boolean;
  plan?: any;
  error?: string;
}

const copilot = new AICopilot();
const editingPlanSchema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    summary: { type: SchemaType.STRING },
    steps: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
  },
  required: ["summary", "steps"]
};

export async function generateAIEditingPlan(
  prompt = "Analyze current Premiere timeline"
): Promise<AIActionResult> {
  try {
    const resolved = await copilot.resolve({
      intent: "ai-action:generate-plan",
      context: { prompt },
      memoryScopeKey: `ai-action:${prompt}`,
      memoryCacheKey: "result",
      geminiResolver: async () =>
        runGeminiStructured(prompt, editingPlanSchema)
    });

    return {
      success: true,
      plan: resolved.value
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gemini returned invalid JSON."
    };
  }
}
