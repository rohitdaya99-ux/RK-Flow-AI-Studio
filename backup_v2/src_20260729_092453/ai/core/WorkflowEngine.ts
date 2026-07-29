import { commandEngine } from "./CommandEngine";

export interface WorkflowRequest {
  workflow: string;
  feature: string;
  prompt: string;
  parameters?: Record<string, any>;
}

export class WorkflowEngine {
  async execute(request: WorkflowRequest) {
    console.log(`[Workflow] ${request.workflow}`);

    return commandEngine.run({
      feature: request.feature,
      prompt: request.prompt,
      parameters: request.parameters,
    });
  }
}

export const workflowEngine = new WorkflowEngine();