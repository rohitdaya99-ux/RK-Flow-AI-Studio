import { AIRequest } from "../types/AIRequest";

export class ModelRouter {
  select(request: AIRequest): string {
    if (request.model) return request.model;
    return "gemini-3.6-flash";
  }
}
