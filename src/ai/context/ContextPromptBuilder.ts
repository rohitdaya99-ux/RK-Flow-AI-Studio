import { PromptBuilder } from "../prompts/PromptBuilder";
import { PremiereContextManager } from "./PremiereContextManager";

export class ContextPromptBuilder {
  static build(userPrompt: string): string {
    const ctx = PremiereContextManager.get();

    const context = `
Premiere Context

Project: ${ctx.projectName}
Sequence: ${ctx.sequenceName}

FPS: ${ctx.fps}

Playhead: ${ctx.playhead}
In Point: ${ctx.inPoint}
Out Point: ${ctx.outPoint}

Video Tracks: ${ctx.videoTracks}
Audio Tracks: ${ctx.audioTracks}

Selected Clips:
${ctx.selectedClips.length ? ctx.selectedClips.join("\n") : "None"}

Markers:
${ctx.markers.length ? ctx.markers.join("\n") : "None"}
`;

    return PromptBuilder.build(`${context}\n\nUser Request:\n${userPrompt}`);
  }
}
