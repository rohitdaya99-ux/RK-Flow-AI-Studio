import { AIChatService } from "../services/AIChatService";
import { AIState } from "./AIState";
import { ProviderId } from "../providers/ProviderFactory";

export class AIController {
  private readonly chatService = new AIChatService();

  async ask(prompt: string): Promise<string> {
    return this.chatService.ask(prompt);
  }

  getProvider(): ProviderId {
    return AIState.provider();
  }

  getModel(): string {
    return AIState.model();
  }

  getApiKey(): string {
    return AIState.apiKey();
  }

  setApiKey(key: string): void {
    AIState.setApiKey(key);
  }
}
