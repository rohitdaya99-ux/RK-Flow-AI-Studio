import { AIConfigManager } from "../config/AIConfigManager";
import { ProviderId } from "../providers/ProviderFactory";
import { AIModel } from "../models/ModelRegistry";

const DEFAULT_GEMINI_KEY = "AQ.Ab8RN6J5PW823wXcNZzXoZXHCtlB-xbcFK1M5ON2aNEaSUZvOA";

AIConfigManager.setProvider("gemini");

if (!AIConfigManager.hasApiKey("gemini") && DEFAULT_GEMINI_KEY) {
  AIConfigManager.setApiKey("gemini", DEFAULT_GEMINI_KEY);
}

export class AIState {
  static provider(): ProviderId {
    return AIConfigManager.provider();
  }

  static setProvider(provider: ProviderId): void {
    AIConfigManager.setProvider(provider);
  }

  static model(): AIModel {
    return AIConfigManager.model();
  }

  static setModel(model: AIModel): void {
    AIConfigManager.setModel(model);
  }

  static apiKey(): string {
    return AIConfigManager.apiKey(this.provider());
  }

  static setApiKey(key: string): void {
    AIConfigManager.setApiKey(this.provider(), key);
  }
}
