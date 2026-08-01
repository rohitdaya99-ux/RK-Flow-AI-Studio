import { ProjectContext } from "../types/ContextTypes";

export interface ContextRule {
  evaluate(context: ProjectContext): boolean;
}
