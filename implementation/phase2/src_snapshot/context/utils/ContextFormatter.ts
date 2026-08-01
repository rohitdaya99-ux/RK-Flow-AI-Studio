import { ProjectContext } from "../types/ContextTypes";

export class ContextFormatter {
  format(context: ProjectContext): string {
    return [
      `Sequence: ${context.timeline.sequenceName}`,
      `FPS: ${context.timeline.fps}`,
      `Duration: ${context.timeline.duration}`,
      `Selected Clips: ${context.timeline.selectedClips}`,
      `Language: ${context.user.language}`,
      `Prompt: ${context.user.prompt}`
    ].join("\n");
  }
}
