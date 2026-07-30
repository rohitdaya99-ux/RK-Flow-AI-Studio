import { APIKeyStore } from "./APIKeyStore";
import { ProviderSettings } from "./ProviderSettings";
import { AISettings } from "./AISettings";
import { ProviderId } from "../providers/ProviderFactory";
import { AIModel } from "../models/ModelRegistry";

export class AIConfigManager {
  static provider(): ProviderId {
    return ProviderSettings.getProvider();
  }

  static setProvider(provider: ProviderId): void {
    ProviderSettings.setProvider(provider);
  }

  static model(): AIModel {
    return AISettings.getModel();
  }

  static setModel(model: AIModel): void {
    AISettings.setModel(model);
  }

  static apiKey(provider: ProviderId): string {
    return APIKeyStore.get(provider);
  }

  static setApiKey(provider: ProviderId, key: string): void {
    APIKeyStore.set(provider, key);
  }

  static hasApiKey(provider: ProviderId): boolean {
    return APIKeyStore.has(provider);
  }
}
