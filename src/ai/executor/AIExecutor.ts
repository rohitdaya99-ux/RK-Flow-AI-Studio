import { AIProvider } from "../providers/AIProvider";
import { AIRequest } from "../types/AIRequest";
import { AIResponse } from "../types/AIResponse";

export class AIExecutor {
  constructor(private readonly provider: AIProvider) {}

  execute(request: AIRequest): Promise<AIResponse> {
    return this.provider.execute(request);
  }
}
