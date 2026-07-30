export interface AIConfig {
  defaultModel: string;
  maxRetries: number;
  timeout: number;
}

export const DEFAULT_AI_CONFIG: AIConfig = {
  defaultModel: "gemini-3.6-flash",
  maxRetries: 3,
  timeout: 60000
};
