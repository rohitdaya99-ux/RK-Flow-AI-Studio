import { GoogleGenerativeAI } from "@google/generative-ai";
import { resolveGeminiConfig } from "../../config";
import { RKCommand } from "../types/RKCommand";

export default class RKPlanner {

  private model;

  constructor() {
    const ai = new GoogleGenerativeAI(resolveGeminiConfig().apiKey);

    this.model = ai.getGenerativeModel({
      model: "gemini-3.6-flash"
    });
  }

  async create(prompt: string): Promise<RKCommand> {
return {
  id: "rk-test",
  action: "READ_TIMELINE",
  payload: {},
  timestamp: Date.now()
};
    const result = await this.model.generateContent(`
You are RK Flow AI.

Convert the user request into ONE valid RKCommand JSON.

Allowed actions:

READ_TIMELINE
MOVE_PLAYHEAD
CREATE_MARKER
IMPORT_MEDIA
CREATE_REEL

Return ONLY JSON.

Example:

{
"id":"rk-1",
"action":"READ_TIMELINE",
"payload":{},
"timestamp":1711111111
}

User:
${prompt}
`);

    const text = result.response.text()
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();

    return JSON.parse(text);

  }

}
