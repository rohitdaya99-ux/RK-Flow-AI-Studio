import { LogEntry, LogSeverity } from '../types';

type LogListener = (entries: LogEntry[]) => void;

export class LoggerService {
  private readonly entries: LogEntry[] = [];
  private readonly listeners = new Set<LogListener>();

  log(message: string, severity: LogSeverity = 'info'): void {
    this.entries.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      severity,
      message,
      timestamp: new Date().toLocaleTimeString(),
    });
    console.info(`[RK Flow] ${severity.toUpperCase()}: ${message}`);
    this.emit();
  }

  getEntries(): LogEntry[] {
    return [...this.entries];
  }

  subscribe(listener: LogListener): () => void {
    this.listeners.add(listener);
    listener(this.getEntries());

    return () => {
      this.listeners.delete(listener);
    };
  }

  clear(): void {
    this.entries.length = 0;
    this.emit();
  }

  private emit(): void {
    const snapshot = this.getEntries();
    this.listeners.forEach((listener) => listener(snapshot));
  }
}

export const loggerService = new LoggerService();
