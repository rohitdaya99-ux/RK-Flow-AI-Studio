export interface AIResponse {
  success: boolean;
  response: string;
  tokens?: number;
  latency?: number;
}
