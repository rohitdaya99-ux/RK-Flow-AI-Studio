import { ProviderFactory } from "../providers/ProviderFactory";
import { AIConfigManager } from "../config/AIConfigManager";
import { ChatRequest, ChatResponse } from "../models/ChatTypes";

export class AIRouter {
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const providerId = AIConfigManager.provider();

    const provider = ProviderFactory.create(providerId);

    const apiKey = AIConfigManager.apiKey(providerId);

    if (!apiKey) {
      throw new Error(`Missing API key for ${providerId}.`);
    }

    await provider.initialize(apiKey);

    return provider.chat(request);
  }
}
