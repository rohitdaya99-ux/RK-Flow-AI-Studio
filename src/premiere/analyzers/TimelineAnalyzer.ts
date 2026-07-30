import { TimelineState } from "../types/PremiereTypes";

export class TimelineAnalyzer {
  analyze(state: TimelineState) {
    return {
      clips: state.selectedClips.length,
      videoTracks: state.videoTracks.length,
      audioTracks: state.audioTracks.length,
      duration: state.sequence.duration
    };
  }
}
