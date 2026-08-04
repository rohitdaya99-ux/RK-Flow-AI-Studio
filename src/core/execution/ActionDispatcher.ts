import { CommandExecutor } from "../../commands/CommandExecutor";
import { CommandResult, RKCommand } from "../commands/CommandTypes";

export class ActionDispatcher {
  public constructor(private readonly executor = new CommandExecutor()) {}

  public async dispatch(command: RKCommand): Promise<CommandResult> {
    return this.executor.execute(command);
  }

  public async dispatchBatch(commands: RKCommand[]): Promise<CommandResult[]> {
    const results: CommandResult[] = [];

    for (const command of commands) {
      results.push(await this.dispatch(command));
    }

    return results;
  }
}
