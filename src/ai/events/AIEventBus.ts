export type AIEvent =
  | "context.loaded"
  | "command.parsed"
  | "plan.created"
  | "execution.started"
  | "execution.finished";

export class AIEventBus {
  emit(event: AIEvent, payload?: unknown): void {
    console.log("[AI EVENT]", event, payload);
  }
}
