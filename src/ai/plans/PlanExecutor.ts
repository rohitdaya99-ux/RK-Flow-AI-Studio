import { CommandDispatcher } from "../../commands/dispatcher/CommandDispatcher";
import { ExecutionPlan } from "./ExecutionPlan";

export class PlanExecutor {

  private dispatcher = new CommandDispatcher();

  async execute(plan: ExecutionPlan) {

    const results = [];

    for (const step of plan.steps) {
      results.push(await this.dispatcher.dispatch(step.command));
    }

    return results;

  }

}
