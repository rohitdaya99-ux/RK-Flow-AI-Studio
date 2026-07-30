import { TimelineState } from "../types/PremiereTypes";
import { SequenceReader } from "./SequenceReader";

export class TimelineReader {
  private sequence = new SequenceReader();

  async read(): Promise<TimelineState> {
    return {
      sequence: await this.sequence.read(),
      videoTracks: [],
      audioTracks: [],
      selectedClips: []
    };
  }
}
