import { CommandDispatcher } from "../../commands";

export class AIPlanner {
  private readonly dispatcher = new CommandDispatcher();

  createPlan(prompt: string) {
    const command = this.dispatcher.dispatch(prompt);

    return {
      prompt,
      intent: command.message,
      steps: [
        "Collect Context",
        "Analyze Timeline",
        "Generate Edit Plan",
        "Execute Premiere Actions"
      ]
    };
  }
}
