import { COMMAND_ACTIONS, CommandAction } from "../types/Command";

export class CommandRegistry {
  private readonly actions = new Set<CommandAction>(COMMAND_ACTIONS);

  public has(action: string): action is CommandAction {
    return this.actions.has(action as CommandAction);
  }

  public list(): CommandAction[] {
    return [...this.actions];
  }
}
