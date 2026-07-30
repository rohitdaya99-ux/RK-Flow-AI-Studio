import { GoogleGenerativeAI } from "@google/generative-ai";
import { BaseProvider } from "./BaseProvider";
import { ChatRequest, ChatResponse } from "../models/ChatTypes";
import { AIConfigManager } from "../config/AIConfigManager";

export class GeminiProvider extends BaseProvider {
  readonly id = "gemini";
  readonly name = "Gemini";

  private client?: GoogleGenerativeAI;

  override async initialize(apiKey: string): Promise<void> {
    await super.initialize(apiKey);
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    if (!this.client) {
      throw new Error("Gemini not initialized.");
    }

    const model = this.client.getGenerativeModel({
      model: AIConfigManager.model()
    });

    const result = await model.generateContent(request.prompt);

    return {
      text: result.response.text(),
      provider: this.id,
      usage: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0
      }
    };
  }
}
