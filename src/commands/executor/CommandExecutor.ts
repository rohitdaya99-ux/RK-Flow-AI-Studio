import { CommandRequest, CommandResult } from "../types/CommandTypes";
import { CommandValidator } from "../validator/CommandValidator";

export class CommandExecutor {
  private validator = new CommandValidator();

  execute(command: CommandRequest): CommandResult {
    if (!this.validator.validate(command)) {
      return {
        success: false,
        message: "Invalid command.",
        actionsExecuted: 0,
        executionTime: 0,
        warnings: ["Validation failed."]
      };
    }

    return {
      success: true,
      message: "Command accepted.",
      actionsExecuted: 0,
      executionTime: 0,
      warnings: []
    };
  }
}
