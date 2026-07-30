export interface AIState {
  sessionId: string;
  activeModel: string;
  activeIntent: string;
  isRunning: boolean;
}

export const DEFAULT_AI_STATE: AIState = {
  sessionId: "",
  activeModel: "gemini-3.6-flash",
  activeIntent: "",
  isRunning: false
};
