import { AIRouter } from "../router/AIRouter";
import { ChatRequest } from "../models/ChatTypes";
import { ContextPromptBuilder } from "../context/ContextPromptBuilder";
import { PremiereContextProvider } from "../context";

export class AIChatService {
  private readonly router = new AIRouter();

  async ask(prompt: string): Promise<string> {
    await PremiereContextProvider.refresh();

    const request: ChatRequest = {
      prompt: ContextPromptBuilder.build(prompt)
    };

    const response = await this.router.chat(request);

    return response.text;
  }
}
