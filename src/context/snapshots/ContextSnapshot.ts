import { ProjectContext } from "../types/ContextTypes";

export class ContextSnapshot {
  create(context: ProjectContext): ProjectContext {
    return structuredClone(context);
  }
}
