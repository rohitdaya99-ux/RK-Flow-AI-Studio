import { ProjectContext } from "../types/ContextTypes";

export class ContextMetrics {
  measure(context: ProjectContext) {
    return {
      timelineDuration: context.timeline.duration,
      selectedClips: context.timeline.selectedClips,
      fps: context.timeline.fps,
      promptLength: context.user.prompt.length
    };
  }
}
