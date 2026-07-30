import { BaseProvider } from "./BaseProvider";
import { ChatRequest, ChatResponse } from "../models/ChatTypes";

export class OpenAIProvider extends BaseProvider {
  readonly id = "openai";
  readonly name = "OpenAI";

  async chat(_request: ChatRequest): Promise<ChatResponse> {
    throw new Error("OpenAI provider not implemented yet.");
  }
}
