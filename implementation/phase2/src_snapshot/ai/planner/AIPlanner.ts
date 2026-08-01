import { CommandDispatcher } from "../../commands/dispatcher/CommandDispatcher";

export class AIPlanner {

  private dispatcher = new CommandDispatcher();

  async plan(prompt: string) {
    const command = await this.dispatcher.dispatch(prompt);

    return {
      intent: command.message,
      success: command.success,
      warnings: command.warnings
    };
  }

  async createPlan(prompt: string) {
    return this.plan(prompt);
  }

}
