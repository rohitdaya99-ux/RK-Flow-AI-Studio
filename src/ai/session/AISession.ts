export class AISession {
  readonly id = crypto.randomUUID();
  readonly startedAt = new Date();

  private requests = 0;

  increment(): void {
    this.requests++;
  }

  getRequestCount(): number {
    return this.requests;
  }
}
