export class AITelemetry {
  track(event: string, data?: unknown): void {
    console.log("[Telemetry]", event, data);
  }
}
