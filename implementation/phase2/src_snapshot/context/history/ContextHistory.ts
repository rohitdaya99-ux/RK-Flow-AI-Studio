import { ProjectContext } from "../types/ContextTypes";

export class ContextHistory {
  private history: ProjectContext[] = [];

  add(context: ProjectContext): void {
    this.history.push(context);
  }

  latest(): ProjectContext | undefined {
    return this.history.at(-1);
  }

  all(): ProjectContext[] {
    return [...this.history];
  }

  clear(): void {
    this.history = [];
  }
}
