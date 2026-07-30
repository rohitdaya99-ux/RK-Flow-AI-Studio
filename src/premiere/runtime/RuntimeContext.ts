import { premiereAPI } from "../../services/PremiereAPI";
import { TimelineSnapshot } from "./TimelineSnapshot";

export default class RuntimeContext {

  async snapshot(): Promise<TimelineSnapshot | null> {

    const ctx = await premiereAPI.getTimelineContext();

    if (!ctx) {
      return null;
    }

    return {
      projectName: ctx.projectName,
      sequenceName: ctx.sequenceName,
      videoTracks: ctx.videoTracks,
      audioTracks: ctx.audioTracks,
      frameSize: ctx.frameSize,
      timebase: ctx.timebase,
      selection: Array.isArray(ctx.selection) ? ctx.selection : [],
      timestamp: Date.now()
    };

  }

}
