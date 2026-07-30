import { ProjectContext } from "../types/ContextTypes";

export class PromptContextBuilder {
  build(context: ProjectContext): string {
    return `
Prompt:
${context.user.prompt}

Sequence:
${context.timeline.sequenceName}

FPS:
${context.timeline.fps}

Duration:
${context.timeline.duration}

Selected Clips:
${context.timeline.selectedClips}
`;
  }
}
