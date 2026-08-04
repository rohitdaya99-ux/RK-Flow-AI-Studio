import { ChatRequest, ChatResponse } from "../models/ChatTypes";

export interface IAIProvider {
  readonly id: string;
  readonly name: string;

  initialize(apiKey: string): Promise<void>;
  chat(request: ChatRequest): Promise<ChatResponse>;
  isAvailable(): boolean;
}
