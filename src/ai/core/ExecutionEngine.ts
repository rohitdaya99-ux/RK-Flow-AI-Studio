import { aiEngine } from "./AIEngine";

export interface ExecutionRequest {
  feature: string;
  prompt: string;
  parameters?: Record<string, any>;
}

export class ExecutionEngine {
  async execute(request: ExecutionRequest) {
    console.log(`[ExecutionEngine] ${request.feature}`);

    return aiEngine.execute({
      feature: request.feature,
      prompt: request.prompt,
      parameters: request.parameters,
    });
  }
}

export const executionEngine = new ExecutionEngine();