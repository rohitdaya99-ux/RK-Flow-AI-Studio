import { ProviderFactory } from "../providers/ProviderFactory";
import { ChatRequest, ChatResponse } from "../models/ChatTypes";

export class AIRouter {
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const provider = ProviderFactory.create("gemini");

    await provider.initialize("");

    return provider.chat(request);
  }
}
