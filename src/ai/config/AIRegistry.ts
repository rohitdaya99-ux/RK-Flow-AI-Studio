import { ProviderId } from "../providers/ProviderFactory";

export interface ProviderInfo {
  id: ProviderId;
  label: string;
  enabled: boolean;
}

export const AI_PROVIDERS: ProviderInfo[] = [
  {
    id: "gemini",
    label: "Google Gemini",
    enabled: true,
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    enabled: false,
  },
  {
    id: "claude",
    label: "Claude",
    enabled: false,
  },
  {
    id: "grok",
    label: "Grok",
    enabled: false,
  },
  {
    id: "kimi",
    label: "Kimi",
    enabled: false,
  },
  {
    id: "ollama",
    label: "Ollama",
    enabled: false,
  }
];
