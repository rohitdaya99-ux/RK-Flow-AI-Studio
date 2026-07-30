import { ProjectContext } from "../types/ContextTypes";

export interface IContextProvider {
  load(prompt: string): Promise<ProjectContext>;
}
