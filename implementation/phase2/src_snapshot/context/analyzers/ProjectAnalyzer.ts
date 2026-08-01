import { ProjectContext } from "../types/ContextTypes";

export class ProjectAnalyzer {
  analyze(context: ProjectContext) {
    return {
      hasSelection: context.timeline.selectedClips > 0,
      isLongTimeline: context.timeline.duration > 600,
      fps: context.timeline.fps,
      sequence: context.timeline.sequenceName
    };
  }
}
