import { CommandExecutor } from "../../commands/executor/CommandExecutor";
import { RKCommand, RKResult } from "../types/RKCommand";

export default class RKExecutor {

  private executor = new CommandExecutor();

  async execute(command: RKCommand): Promise<RKResult> {

    const result = await this.executor.execute({
      intent: command.action as any
    });

    return {
      success: result.success,
      message: result.message,
      data: undefined,
      error: undefined
    };

  }

}