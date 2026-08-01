import { AIRequest } from "../types/AIRequest";
import { AIResponse } from "../types/AIResponse";

export interface AIProvider {
  execute(request: AIRequest): Promise<AIResponse>;
}
