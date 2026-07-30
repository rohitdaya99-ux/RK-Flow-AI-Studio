import { TimelineContext } from "../types/ContextTypes";

export class TimelineProvider {
  async getContext(): Promise<TimelineContext> {
    return {
      sequenceName: "",
      fps: 25,
      duration: 0,
      selectedClips: 0
    };
  }
}
