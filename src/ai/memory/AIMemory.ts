export class AIMemory {
  private history: string[] = [];

  add(entry: string): void {
    this.history.push(entry);
  }

  latest(): string | undefined {
    return this.history.at(-1);
  }

  all(): string[] {
    return [...this.history];
  }

  clear(): void {
    this.history = [];
  }
}
