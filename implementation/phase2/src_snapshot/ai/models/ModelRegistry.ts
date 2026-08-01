export type AIModel =
  | "gemini-3.6-flash"
  | "gpt-5"
  | "claude-sonnet-4"
  | "grok-4"
  | "kimi-k2";

export const DEFAULT_MODEL: AIModel = "gemini-3.6-flash";

export const AVAILABLE_MODELS: AIModel[] = [
  "gemini-3.6-flash",
  "gpt-5",
  "claude-sonnet-4",
  "grok-4",
  "kimi-k2"
];
