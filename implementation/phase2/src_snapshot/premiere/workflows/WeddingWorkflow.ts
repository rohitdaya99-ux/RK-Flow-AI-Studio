import ReelPlanner from "../reels/ReelPlanner";
import PremiereExecutor from "../execution/PremiereExecutor";

export default class WeddingWorkflow{

  private planner=new ReelPlanner();
  private executor=new PremiereExecutor();

  async run(prompt:string,audio:any){

    const plan=await this.planner.create(prompt,audio);

    await this.executor.execute(plan.edit);

    return plan;

  }

}
