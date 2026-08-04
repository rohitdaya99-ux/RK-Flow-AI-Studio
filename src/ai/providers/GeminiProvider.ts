import { BaseProvider } from "./BaseProvider";
import { ChatRequest, ChatResponse } from "../models/ChatTypes";
import { runGemini } from "../GeminiService";

export class GeminiProvider extends BaseProvider {
  readonly id = "gemini";
  readonly name = "Gemini";

  async initialize(_apiKey: string): Promise<void> {}

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const text = await runGemini(request.prompt, {
      systemInstruction: request.systemPrompt
    });

    return {
      text,
      provider: this.id,
      usage: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0
      }
    };
  }
}

export default GeminiProvider;
