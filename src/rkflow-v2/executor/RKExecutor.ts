import { CommandExecutor } from "../../commands/CommandExecutor";
import { RKCommand, RKResult } from "../types/RKCommand";

export default class RKExecutor {

  private executor = new CommandExecutor();

  async execute(command: RKCommand): Promise<RKResult> {

    const result = await this.executor.execute({
      id: command.id,
      action: command.action,
      payload: command.payload,
      timestamp: command.timestamp
    });

    return {
      success: result.success,
      message: result.message,
      data: result.data,
      error: result.error
    };

  }

}
