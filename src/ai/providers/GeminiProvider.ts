import { GoogleGenerativeAI } from "@google/generative-ai";
import { BaseProvider } from "./BaseProvider";
import { ChatRequest, ChatResponse } from "../models/ChatTypes";
import { GEMINI_CONFIG } from "../config/GeminiConfig";

export class GeminiProvider extends BaseProvider {
  readonly id = "gemini";
  readonly name = "Gemini";

  private client?: GoogleGenerativeAI;

  async initialize(apiKey: string): Promise<void> {
    const key = apiKey || GEMINI_CONFIG.API_KEY;

    if (!key) {
      throw new Error("Gemini API Key not found.");
    }

    this.client = new GoogleGenerativeAI(key);
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    if (!this.client) {
      await this.initialize("");
    }

    const model = this.client!.getGenerativeModel({
      model: GEMINI_CONFIG.MODEL
    });

    const result = await model.generateContent(request.prompt);
    const response = await result.response;

    return {
      text: response.text(),
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
