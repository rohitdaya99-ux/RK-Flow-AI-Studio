import { ProjectContext } from "../types/ContextTypes";

export class WeddingContextPreset {
  apply(context: ProjectContext): ProjectContext {
    return {
      ...context,
      user: {
        ...context.user,
        prompt: `[Indian Wedding] ${context.user.prompt}`
      }
    };
  }
}
