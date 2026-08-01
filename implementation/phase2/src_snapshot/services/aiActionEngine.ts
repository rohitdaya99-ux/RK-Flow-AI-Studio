import { generateWeddingPlan } from "./geminiService";

export interface AIActionResult {
  success: boolean;
  plan?: any;
  error?: string;
}

export async function generateAIEditingPlan(
  prompt = "Analyze current Premiere timeline"
): Promise<AIActionResult> {

  const result = await generateWeddingPlan(prompt);

  if (!result.success) {
    return {
      success: false,
      error: result.message
    };
  }

  try {
    return {
      success: true,
      plan: JSON.parse(result.text ?? "{}")
    };
  } catch {
    return {
      success: false,
      error: "Gemini returned invalid JSON."
    };
  }
}
