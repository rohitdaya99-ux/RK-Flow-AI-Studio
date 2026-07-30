import { AIChatService } from "../services/AIChatService";
import { AIState } from "./AIState";
import { ProviderId } from "../providers/ProviderFactory";
import { AIModel } from "../models/ModelRegistry";

export class AIController {
  private readonly chatService = new AIChatService();

  async ask(prompt: string): Promise<string> {
    return this.chatService.ask(prompt);
  }

  getProvider(): ProviderId {
    return AIState.provider();
  }

  setProvider(provider: ProviderId): void {
    AIState.setProvider(provider);
  }

  getModel(): AIModel {
    return AIState.model();
  }

  setModel(model: AIModel): void {
    AIState.setModel(model);
  }

  getApiKey(): string {
    return AIState.apiKey();
  }

  setApiKey(key: string): void {
    AIState.setApiKey(key);
  }
}
