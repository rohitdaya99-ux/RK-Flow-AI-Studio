import { chatWithGemini } from "../../services/geminiService";
import { ExecutionPlan } from "../plans/ExecutionPlan";

export default class GeminiPlanner {

  async create(prompt:string):Promise<ExecutionPlan>{

    try{

      const response = await chatWithGemini({
        prompt:`
You are RK Flow AI Planner.

Convert the user's request into ONLY valid JSON.

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
`
      });

      if(!response.success){
        throw new Error(response.error ?? "Gemini failed");
      }

      const cleaned = response.text
        .replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();

      return JSON.parse(cleaned);

    }catch{

      return{
        goal:prompt,
        steps:[
          {command:"read project"},
          {command:"read timeline"}
        ]
      };

    }

  }

}
