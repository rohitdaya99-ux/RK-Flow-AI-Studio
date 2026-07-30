import PremiereRuntimeProvider from "../context/PremiereRuntimeProvider";
import { AIChatService } from "./AIChatService";

export default class RKAgentService {

  private context = new PremiereRuntimeProvider();
  private ai = new AIChatService();

  async ask(prompt: string) {

    const runtime = await this.context.getContext();

    const fullPrompt = `
Current Premiere Context:

${JSON.stringify(runtime, null, 2)}

User Request:

${prompt}
`;

    return this.ai.ask(fullPrompt);

  }

}
