import { AIProvider } from "../interfaces/AIProvider";
import { ChatRequest, ChatResponse } from "../models/ChatTypes";

export abstract class BaseProvider implements AIProvider {
  abstract readonly id: string;
  abstract readonly name: string;

  protected apiKey = "";

  async initialize(apiKey: string): Promise<void> {
    this.apiKey = apiKey;
  }

  isAvailable(): boolean {
    return this.apiKey.length > 0;
  }

  abstract chat(request: ChatRequest): Promise<ChatResponse>;
}
