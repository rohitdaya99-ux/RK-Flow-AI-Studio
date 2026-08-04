import { runGemini } from "../../ai/GeminiService";

export class ReasoningEngine {
  async reason(goal: string, contextPrompt: string) {
    return runGemini(
      `${contextPrompt}\n\nGoal:\n${goal}\n\nReturn a concise reasoning summary and plan outline.`,
      {
        systemInstruction: "You are RK Brain. Think like a senior Indian wedding film editor."
      }
    );
  }
}
