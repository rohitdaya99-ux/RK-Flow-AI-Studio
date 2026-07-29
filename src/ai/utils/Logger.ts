export class Logger {
  info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }

  success(message: string): void {
    console.log(`[SUCCESS] ${message}`);
  }
}

export const logger = new Logger();