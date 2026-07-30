import { TimelineSDK } from "../../sdk/TimelineSDK";

export default class TimelineBridge {

  async read() {

    const timeline = await TimelineSDK.getTimeline();

    return {
      timeline,
      selection: timeline.clips,
      playhead: null,
      tracks: {
        video: timeline.videoTracks,
        audio: timeline.audioTracks
      }
    };

  }

}
