import { ExecutionPlan } from "../plans/ExecutionPlan";

export default class GeminiPlanner {

  async create(prompt:string):Promise<ExecutionPlan>{

    const text = prompt.toLowerCase();

    const steps:any[] = [];

    steps.push({ command:"read project" });
    steps.push({ command:"read timeline" });

    if(text.includes("selection") || text.includes("selected")){
      steps.push({ command:"read selection" });
    }

    if(text.includes("trim")){
      steps.push({ command:"trim selected clips" });
    }

    if(text.includes("transition")){
      steps.push({ command:"add transitions" });
    }

    if(text.includes("music") || text.includes("beat")){
      steps.push({ command:"sync music" });
    }

    if(text.includes("export")){
      steps.push({ command:"export" });
    }

    return {
      goal:prompt,
      steps
    };

  }

}
