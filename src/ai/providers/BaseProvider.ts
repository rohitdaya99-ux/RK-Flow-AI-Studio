import { AIProvider } from "../interfaces/AIProvider";
import { ChatRequest, ChatResponse } from "../models/ChatTypes";

export abstract class BaseProvider implements AIProvider {
  abstract readonly id: string;
  abstract readonly name: string;

  async initialize(_apiKey: string): Promise<void> {}

  isAvailable(): boolean {
    return true;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    return {
      text: request.prompt,
      provider: this.id
    };
  }
}
