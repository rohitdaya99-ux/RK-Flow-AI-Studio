import { ProjectContext } from "../types/ContextTypes";

export class ContextSerializer {
  serialize(context: ProjectContext): string {
    return JSON.stringify(context, null, 2);
  }

  deserialize(json: string): ProjectContext {
    return JSON.parse(json) as ProjectContext;
  }
}
