export class AICache {
  private cache = new Map<string, string>();

  set(key: string, value: string): void {
    this.cache.set(key, value);
  }

  get(key: string): string | undefined {
    return this.cache.get(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
