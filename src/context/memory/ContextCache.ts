import { ProjectContext } from "../types/ContextTypes";

export class ContextCache {
  private cache = new Map<string, ProjectContext>();

  set(id: string, context: ProjectContext): void {
    this.cache.set(id, context);
  }

  get(id: string): ProjectContext | undefined {
    return this.cache.get(id);
  }

  clear(): void {
    this.cache.clear();
  }
}
