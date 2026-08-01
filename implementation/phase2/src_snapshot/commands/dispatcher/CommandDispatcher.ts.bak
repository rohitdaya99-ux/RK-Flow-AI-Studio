import { CommandParser } from "../parser/CommandParser";
import { CommandValidator } from "../validator/CommandValidator";
import { PremiereExecutor } from "../../executor/PremiereExecutor";
import { CommandResult } from "../types/CommandTypes";

export class CommandDispatcher {
  private readonly parser = new CommandParser();
  private readonly validator = new CommandValidator();
  private readonly executor = new PremiereExecutor();

  async dispatch(prompt: string): Promise<CommandResult> {
    const command = this.parser.parse(prompt);

    if (!this.validator.validate(command)) {
      return {
        success: false,
        message: "Unknown command.",
        actionsExecuted: 0,
        executionTime: 0,
        warnings: ["Unsupported intent"]
      };
    }

    return await this.executor.run(command);
  }
}
