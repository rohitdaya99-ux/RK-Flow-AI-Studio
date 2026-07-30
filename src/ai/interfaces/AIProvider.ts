import { ChatRequest, ChatResponse } from "../models/ChatTypes";

export interface AIProvider {
  readonly id: string;
  readonly name: string;

  initialize(apiKey: string): Promise<void>;

  chat(request: ChatRequest): Promise<ChatResponse>;

  isAvailable(): boolean;
}
