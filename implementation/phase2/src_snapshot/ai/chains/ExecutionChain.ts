export interface ExecutionStep {
  id: string;
  name: string;
  status: "pending" | "running" | "completed";
}

export class ExecutionChain {
  private readonly steps: ExecutionStep[] = [];

  add(name: string): void {
    this.steps.push({
      id: crypto.randomUUID(),
      name,
      status: "pending"
    });
  }

  all(): ExecutionStep[] {
    return [...this.steps];
  }
}
