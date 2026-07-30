import TaskPlanner from "../planner/TaskPlanner";
import TaskExecutor from "../executor/TaskExecutor";

export class RKFlowAgent {
  private planner = new TaskPlanner();
  private executor = new TaskExecutor();

  async run(prompt: string) {
    const plan = await this.planner.create(prompt);
    return this.executor.execute(plan);
  }
}

export default RKFlowAgent;
