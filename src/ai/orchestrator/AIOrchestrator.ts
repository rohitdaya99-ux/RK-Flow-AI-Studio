import { ContextEngine } from "../../context";
import { CommandDispatcher } from "../../commands";

export class AIOrchestrator {
  private context = new ContextEngine();
  private commands = new CommandDispatcher();

  async execute(prompt: string) {
    const ctx = await this.context.build(prompt);
    const command = this.commands.dispatch(prompt);

    return {
      context: ctx,
      command
    };
  }
}
