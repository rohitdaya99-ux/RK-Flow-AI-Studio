export interface MemoryRecord {
  id: string;
  feature: string;
  prompt: string;
  result: string;
  createdAt: number;
}

export class MemoryEngine {
  private memory: MemoryRecord[] = [];

  add(record: MemoryRecord): void {
    this.memory.push(record);
  }

  all(): MemoryRecord[] {
    return [...this.memory];
  }

  clear(): void {
    this.memory = [];
  }
}

export const memoryEngine = new MemoryEngine();