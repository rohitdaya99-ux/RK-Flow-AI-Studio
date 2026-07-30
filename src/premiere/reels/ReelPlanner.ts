import EditPlanner from "../planner/EditPlanner";
import BeatAnalyzer from "../music/BeatAnalyzer";

export default class ReelPlanner{

  private planner=new EditPlanner();
  private beats=new BeatAnalyzer();

  async create(prompt:string,audio:any){

    return{
      edit:await this.planner.createPlan(prompt),
      music:this.beats.analyze(audio)
    };

  }

}
