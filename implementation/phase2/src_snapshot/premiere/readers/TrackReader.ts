import { TrackInfo } from "../types/PremiereTypes";

export class TrackReader {
  async readVideoTracks(): Promise<TrackInfo[]> {
    return [];
  }

  async readAudioTracks(): Promise<TrackInfo[]> {
    return [];
  }
}
