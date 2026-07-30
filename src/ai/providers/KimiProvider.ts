import { BaseProvider } from "./BaseProvider";
import { ChatRequest, ChatResponse } from "../models/ChatTypes";

export class KimiProvider extends BaseProvider {
  readonly id = "kimi";
  readonly name = "Kimi";

  async chat(_request: ChatRequest): Promise<ChatResponse> {
    throw new Error("Kimi provider not implemented yet.");
  }
}
