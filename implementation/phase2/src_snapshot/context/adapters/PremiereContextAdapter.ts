import { ProjectContext } from "../types/ContextTypes";

export class PremiereContextAdapter {
  async load(): Promise<ProjectContext> {
    return {
      timeline: {
        sequenceName: "",
        fps: 25,
        duration: 0,
        selectedClips: 0
      },
      user: {
        prompt: "",
        language: "hinglish"
      }
    };
  }
}
