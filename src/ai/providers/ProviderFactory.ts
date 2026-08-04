import { GeminiProvider } from "./GeminiProvider";
import { AIProvider } from "../interfaces/AIProvider";

export type ProviderId =
  | "gemini"
  | "chatgpt"
  | "claude"
  | "grok"
  | "kimi"
  | "ollama";

class DisabledProvider implements AIProvider {
  constructor(
    readonly id: ProviderId,
    readonly name: string
  ) {}

  async initialize(): Promise<void> {
    throw new Error(`${this.name} is not yet configured in RK Flow Settings.`);
  }

  async chat(): Promise<never> {
    throw new Error(`${this.name} is coming soon. Only Gemini is active right now.`);
  }

  isAvailable(): boolean {
    return false;
  }
}

export class ProviderFactory {
  static create(provider: ProviderId): AIProvider {
    switch (provider) {
      case "gemini":
        return new GeminiProvider();
      case "chatgpt":
        return new DisabledProvider("chatgpt", "ChatGPT");
      case "claude":
        return new DisabledProvider("claude", "Claude");
      case "grok":
        return new DisabledProvider("grok", "Grok");
      case "kimi":
        return new DisabledProvider("kimi", "Kimi");
      case "ollama":
        return new DisabledProvider("ollama", "Ollama");

      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }

  static providers(): ProviderId[] {
    return ["gemini", "chatgpt", "claude", "grok", "kimi", "ollama"];
  }
}
