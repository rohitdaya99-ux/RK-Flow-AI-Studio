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
    id: "openai",
    label: "OpenAI",
    enabled: true,
  },
  {
    id: "claude",
    label: "Claude",
    enabled: true,
  },
  {
    id: "grok",
    label: "Grok",
    enabled: true,
  },
  {
    id: "kimi",
    label: "Kimi",
    enabled: true,
  },
];
