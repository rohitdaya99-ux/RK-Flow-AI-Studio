import { GeminiProvider } from "./GeminiProvider";
import { OpenAIProvider } from "./OpenAIProvider";
import { ClaudeProvider } from "./ClaudeProvider";
import { GrokProvider } from "./GrokProvider";
import { KimiProvider } from "./KimiProvider";
import { AIProvider } from "../interfaces/AIProvider";

export type ProviderId =
  | "gemini"
  | "openai"
  | "claude"
  | "grok"
  | "kimi";

export class ProviderFactory {
  static create(provider: ProviderId): AIProvider {
    switch (provider) {
      case "gemini":
        return new GeminiProvider();

      case "openai":
        return new OpenAIProvider();

      case "claude":
        return new ClaudeProvider();

      case "grok":
        return new GrokProvider();

      case "kimi":
        return new KimiProvider();

      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }

  static providers(): ProviderId[] {
    return [
      "gemini",
      "openai",
      "claude",
      "grok",
      "kimi"
    ];
  }
}
