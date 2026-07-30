import SequenceReader from "./SequenceReader";
import TrackReader from "./TrackReader";
import ClipReader from "./ClipReader";

export default class TimelineReader {
  private readonly sequence = new SequenceReader();
  private readonly tracks = new TrackReader();
  private readonly clips = new ClipReader();

  async read() {
    return {
      sequence: await this.sequence.read(),
      videoTracks: await this.tracks.readVideoTracks(),
      audioTracks: await this.tracks.readAudioTracks(),
      selectedClips: await this.clips.readSelected()
    };
  }
}
