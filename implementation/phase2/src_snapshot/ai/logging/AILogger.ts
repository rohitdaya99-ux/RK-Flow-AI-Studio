export class AILogger {
  info(message: string): void {
    console.log("[AI]", message);
  }

  warn(message: string): void {
    console.warn("[AI]", message);
  }

  error(message: string): void {
    console.error("[AI]", message);
  }
}
