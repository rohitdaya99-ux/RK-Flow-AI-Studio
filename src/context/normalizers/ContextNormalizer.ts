import { ProjectContext } from "../types/ContextTypes";

export class ContextNormalizer {
  normalize(context: ProjectContext): ProjectContext {
    return {
      ...context,
      user: {
        ...context.user,
        prompt: context.user.prompt.trim()
      },
      timeline: {
        ...context.timeline,
        sequenceName: context.timeline.sequenceName.trim()
      }
    };
  }
}
