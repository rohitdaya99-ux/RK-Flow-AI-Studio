import { TimelineContext } from "../types/ContextTypes";

export class TimelineExtractor {
  async extract(): Promise<TimelineContext> {
    return {
      sequenceName: "",
      fps: 25,
      duration: 0,
      selectedClips: 0
    };
  }
}
