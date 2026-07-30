import { BaseProvider } from "./BaseProvider";
import { ChatRequest, ChatResponse } from "../models/ChatTypes";

export class ClaudeProvider extends BaseProvider {
  readonly id = "claude";
  readonly name = "Claude";

  async chat(_request: ChatRequest): Promise<ChatResponse> {
    throw new Error("Claude provider not implemented yet.");
  }
}
