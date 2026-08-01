import RKPlanner from "../ai/RKPlanner";
import RKExecutor from "../executor/RKExecutor";

export default class RKDispatcher {

  private planner = new RKPlanner();

  private executor = new RKExecutor();

  async dispatch(prompt: string) {

    const command = await this.planner.create(prompt);

    return await this.executor.execute(command);

  }

}
