import { GoogleGenerativeAI } from "@google/generative-ai";
import { resolveGeminiConfig } from "../config";

export interface AIRequest {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
}

export interface AIResponse {
  success: boolean;
  text: string;
  error?: string;
}

export class AIEngine {
  private model;

  constructor() {
    const config = resolveGeminiConfig();

    const genAI = new GoogleGenerativeAI(config.apiKey);

    this.model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });
  }

  async ask(request: AIRequest): Promise<AIResponse> {
    try {
      const prompt = `
SYSTEM:
${request.systemPrompt}

USER:
${request.userPrompt}
`;

      const result = await this.model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: request.temperature ?? 0.5,
        },
      });

      const text = result.response.text();

      return {
        success: true,
        text,
      };
    } catch (err: any) {
      console.error("AI Engine Error:", err);

      return {
        success: false,
        text: "",
        error: err?.message || "Unknown AI Error",
      };
    }
  }
}

export const aiEngine = new AIEngine();