import { GeminiProvider } from "../providers/GeminiProvider";
import { OpenAIProvider } from "../providers/OpenAIProvider";
import { ClaudeProvider } from "../providers/ClaudeProvider";
import { GrokProvider } from "../providers/GrokProvider";
import { KimiProvider } from "../providers/KimiProvider";

export class ProviderRouter {
  static providers = {
    gemini: GeminiProvider,
    openai: OpenAIProvider,
    claude: ClaudeProvider,
    grok: GrokProvider,
    kimi: KimiProvider,
  };
}

export default ProviderRouter;
