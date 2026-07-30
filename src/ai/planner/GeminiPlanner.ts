import { executeRKAIFeature } from "../../services/geminiService";
import { ExecutionPlan } from "../plans/ExecutionPlan";

export default class GeminiPlanner {

  async create(prompt:string):Promise<ExecutionPlan>{

    try{

      const response = await executeRKAIFeature(`
You are RK Flow AI Planner.

Convert the following user request into a JSON execution plan.

Return ONLY valid JSON.

Schema:

{
  "goal":"string",
  "steps":[
    {
      "command":"string"
    }
  ]
}

User Request:
${prompt}
`);

      const text = response.replace(/```json|```/g,"").trim();

      return JSON.parse(text);

    }catch{

      return {
        goal:prompt,
        steps:[
          {command:"read project"},
          {command:"read timeline"}
        ]
      };

    }

  }

}
