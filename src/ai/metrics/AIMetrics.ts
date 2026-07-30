import { AIResponse } from "../types/AIResponse";

export class AIMetrics {
  collect(response: AIResponse) {
    return {
      success: response.success,
      latency: response.latency ?? 0,
      tokens: response.tokens ?? 0
    };
  }
}
