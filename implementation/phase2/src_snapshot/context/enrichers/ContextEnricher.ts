import { ProjectContext } from "../types/ContextTypes";

export class ContextEnricher {
  enrich(context: ProjectContext): ProjectContext {
    return {
      ...context,
      user: {
        ...context.user,
        language: context.user.language || "hinglish"
      }
    };
  }
}
