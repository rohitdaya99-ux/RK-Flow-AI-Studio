import ReelPlanner from "../reels/ReelPlanner";

export default class WeddingWorkflow{

  private planner=new ReelPlanner();

  async run(prompt:string,audio:any){

    const plan=await this.planner.create(prompt,audio);
    return {
      ...plan,
      execution: {
        status: "planning-only",
        note: "Legacy WeddingWorkflow no longer drives a separate PremiereExecutor. Only the core execution pipeline remains active."
      }
    };

  }

}
