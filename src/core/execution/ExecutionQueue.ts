import { CommandResult, RKCommand } from "../commands/CommandTypes";
import { ActionDispatcher } from "./ActionDispatcher";

export class ExecutionQueue {
  private chain = Promise.resolve();

  public constructor(private readonly dispatcher = new ActionDispatcher()) {}

  public enqueue(command: RKCommand): Promise<CommandResult> {
    const result = this.chain.then(async () => {
      try {
        const outcome = await this.dispatcher.dispatch(command);

        if (outcome.success) {
          console.log(`[RK Flow][ExecutionQueue] ${command.action} succeeded.`, { command, outcome });
        } else {
          console.error(`[RK Flow][ExecutionQueue] ${command.action} failed.`, { command, outcome });
        }

        return outcome;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`[RK Flow][ExecutionQueue] ${command.action} threw.`, { command, error });
        return {
          success: false,
          message: `${command.action} threw during execution.`,
          error: message
        };
      }
    });
    this.chain = result.then(() => undefined, () => undefined);
    return result;
  }

  public async enqueueBatch(commands: RKCommand[]): Promise<CommandResult[]> {
    const results: CommandResult[] = [];

    for (const command of commands) {
      results.push(await this.enqueue(command));
    }

    return results;
  }
}
