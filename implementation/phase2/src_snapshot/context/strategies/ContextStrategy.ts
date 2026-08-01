import { ProjectContext } from "../types/ContextTypes";

export interface ContextStrategy {
  apply(context: ProjectContext): ProjectContext;
}
