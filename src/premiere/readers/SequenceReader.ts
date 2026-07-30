import { premiereAPI } from "../../services/PremiereAPI";

export default class SequenceReader {
  async read() {
    const ctx = await premiereAPI.getTimelineContext();

    if (!ctx)
      return null;

    return {
      name: ctx.sequenceName,
      videoTracks: ctx.videoTracks,
      audioTracks: ctx.audioTracks,
      frameSize: ctx.frameSize,
      timebase: ctx.timebase
    };
  }
}
