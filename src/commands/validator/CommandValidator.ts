import { CommandRequest } from "../types/CommandTypes";

export class CommandValidator {
  validate(command: CommandRequest): boolean {
    return command.intent !== "UNKNOWN";
  }
}
