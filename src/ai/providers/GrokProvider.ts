import { BaseProvider } from "./BaseProvider";
import { ChatRequest, ChatResponse } from "../models/ChatTypes";

export class GrokProvider extends BaseProvider {
  readonly id = "grok";
  readonly name = "Grok";

  async chat(_request: ChatRequest): Promise<ChatResponse> {
    throw new Error("Grok provider not implemented yet.");
  }
}
