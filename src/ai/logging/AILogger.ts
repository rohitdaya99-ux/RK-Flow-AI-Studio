import { loggerService } from "../../services/loggerService";

export class AILogger {
  info(message: string): void {
    loggerService.log(`[AI] ${message}`, "info");
  }

  warn(message: string): void {
    loggerService.log(`[AI] ${message}`, "warn");
  }

  error(message: string): void {
    loggerService.log(`[AI] ${message}`, "error");
  }
}
