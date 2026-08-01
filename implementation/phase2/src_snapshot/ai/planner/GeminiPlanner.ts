import { AIChatService } from "../services/AIChatService";
import { ExecutionPlan } from "../plans/ExecutionPlan";

export default class GeminiPlanner {

  private chat = new AIChatService();

  async create(prompt: string): Promise<ExecutionPlan> {

    try {

      const response = await this.chat.ask(`
You are RK Flow AI Planner.

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

      const cleaned = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleaned);

    } catch {

      return {
        goal: prompt,
        steps: [
          { command: "read project" },
          { command: "read timeline" }
        ]
      };

    }

  }

}
