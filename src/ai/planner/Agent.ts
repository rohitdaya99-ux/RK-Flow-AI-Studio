import GeminiPlanner from "./GeminiPlanner";
import { PlanExecutor } from "../plans/PlanExecutor";

export default class Agent{

  private planner = new GeminiPlanner();
  private executor = new PlanExecutor();

  async run(prompt:string){

    const plan = await this.planner.create(prompt);

    return await this.executor.execute(plan);

  }

}
