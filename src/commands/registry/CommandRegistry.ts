import { CommandIntent } from "../types/CommandTypes";

export class CommandRegistry {
  private readonly commands = new Set<CommandIntent>([
    "CREATE_REEL",
    "CREATE_TEASER",
    "CREATE_HIGHLIGHT",
    "TRIM_SILENCE",
    "SYNC_MUSIC",
    "ADD_TRANSITIONS",
    "EXPORT"
  ]);

  has(intent: CommandIntent): boolean {
    return this.commands.has(intent);
  }

  all(): CommandIntent[] {
    return [...this.commands];
  }
}
