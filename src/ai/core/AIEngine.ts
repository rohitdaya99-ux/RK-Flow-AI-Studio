import { geminiProvider } from "../providers/GeminiProvider";

export interface AIRequest {
  feature: string;
  prompt: string;
  parameters?: Record<string, any>;
}

export interface AIResponse {
  success: boolean;
  result: string;
  feature: string;
  timestamp: number;
}

export class AIEngine {
  async execute(request: AIRequest): Promise<AIResponse> {
    const finalPrompt = this.buildPrompt(request);

    const result = await geminiProvider.generate(finalPrompt);

    return {
      success: true,
      result,
      feature: request.feature,
      timestamp: Date.now(),
    };
  }

  private buildPrompt(request: AIRequest): string {
    return `
You are RK Flow AI Studio.

Feature:
${request.feature}

Prompt:
${request.prompt}

Parameters:
${JSON.stringify(request.parameters ?? {}, null, 2)}

Rules:

- Adobe Premiere Pro 26.0.2
- UXP Plugin
- Wedding Editing Specialist
- Indian Wedding Workflow
- Respond in Hinglish when user speaks Hinglish.
- Prefer cinematic editing.
- Return concise production-ready output.
`;
  }
}

export const aiEngine = new AIEngine();