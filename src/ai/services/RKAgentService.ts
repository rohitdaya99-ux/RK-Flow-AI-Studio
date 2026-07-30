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

    const timeline = await import("./RKTimelineService");

    const summary = await new timeline.default().summarize();

    return this.ai.ask(fullPrompt + "\n\nTimeline Summary:\n" + JSON.stringify(summary,null,2));

  }

}
