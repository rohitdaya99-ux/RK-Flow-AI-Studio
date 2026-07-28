import { LogEntry, LogSeverity } from '../types';

export class LoggerService {
  private readonly entries: LogEntry[] = [];

  log(message: string, severity: LogSeverity = 'info'): void {
    this.entries.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      severity,
      message,
      timestamp: new Date().toLocaleTimeString(),
    });
    console.info(`[RK Flow] ${severity.toUpperCase()}: ${message}`);
  }

  getEntries(): LogEntry[] {
    return [...this.entries];
  }

  clear(): void {
    this.entries.length = 0;
  }
}
