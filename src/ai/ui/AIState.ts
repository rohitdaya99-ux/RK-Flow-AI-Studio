import { GEMINI_MODEL } from '../GeminiService';
import { resolveGeminiConfig, saveGeminiConfig } from '../../config';
import { ProviderId } from '../providers/ProviderFactory';

// NOTE: This is a simplified state manager for the UI.
// The provider is hardcoded to Gemini as it's the only one implemented.
// The model is also fixed for now.
// The main purpose is to abstract the API key storage.

export class AIState {
  static provider(): ProviderId {
    return 'gemini';
  }

  static model(): string {
    return GEMINI_MODEL;
  }

  static apiKey(): string {
    return resolveGeminiConfig().apiKey;
  }

  static setApiKey(key: string): void {
    saveGeminiConfig({ apiKey: key });
  }
}
