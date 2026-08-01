import { ProjectContext } from "../types/ContextTypes";

export class ContextRecommendationEngine {
  recommend(context: ProjectContext): string[] {
    const suggestions: string[] = [];

    if (context.timeline.selectedClips < 20) {
      suggestions.push("Select more clips for better AI editing.");
    }

    if (context.timeline.duration > 900) {
      suggestions.push("Consider generating a Highlight Film.");
    }

    return suggestions;
  }
}
