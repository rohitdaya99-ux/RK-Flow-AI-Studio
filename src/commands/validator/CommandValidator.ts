import { CommandRequest } from "../types/CommandTypes";
import { CommandRegistry } from "../registry/CommandRegistry";

export class CommandValidator {
  private readonly registry = new CommandRegistry();

  validate(command: CommandRequest): boolean {
    return this.registry.has(command.intent);
  }
}
