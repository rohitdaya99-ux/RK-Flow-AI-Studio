import { executionEngine } from "./ExecutionEngine";

export interface CommandRequest {
  feature: string;
  prompt: string;
  parameters?: Record<string, any>;
}

export class CommandEngine {
  async run(command: CommandRequest) {
    return executionEngine.execute({
      feature: command.feature,
      prompt: command.prompt,
      parameters: command.parameters,
    });
  }
}

export const commandEngine = new CommandEngine();