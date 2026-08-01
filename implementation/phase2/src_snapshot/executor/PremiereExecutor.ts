import { CommandRequest, CommandResult } from "../commands/types/CommandTypes";
import { CommandExecutor } from "../commands/executor/CommandExecutor";

export class PremiereExecutor {

  private executor = new CommandExecutor();

  async run(command: CommandRequest): Promise<CommandResult> {
    return this.executor.execute(command);
  }

}

export function inspectPremiereAPI(): void {
  console.log("[RK Flow] inspectPremiereAPI()");
}

export function testMoveAction(): void {
  console.log("[RK Flow] testMoveAction()");
}
