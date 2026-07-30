export class WorkflowExecutor {
  async execute(steps: string[]): Promise<void> {
    for (const step of steps) {
      console.log(`Executing: ${step}`);
    }
  }
}
