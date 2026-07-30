import { AIRequest } from "../types/AIRequest";

export class AIRequestValidator {
  validate(request: AIRequest): boolean {
    return (
      request.prompt.trim().length > 0 &&
      request.model.trim().length > 0 &&
      request.context !== undefined
    );
  }
}
