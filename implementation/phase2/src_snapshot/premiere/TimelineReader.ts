import { PremiereBridge } from "./PremiereBridge";
import {
  InOutRange,
  TimelineClip,
  TimelineState
} from "../types/Timeline";

export class TimelineReader {
  public constructor(private readonly bridge: PremiereBridge) {}

  public async read(): Promise<TimelineState | null> {
    return this.bridge.readTimeline();
  }

  public async getSelectedClips(): Promise<TimelineClip[]> {
    const timeline = await this.read();

    if (timeline === null) {
      return [];
    }

    return [...timeline.videoTracks, ...timeline.audioTracks].flatMap((track) =>
      track.clips.filter((clip) => clip.selected)
    );
  }

  public async getInOut(): Promise<InOutRange | null> {
    const timeline = await this.read();

    if (timeline === null) {
      return null;
    }

    return {
      inPoint: timeline.inPoint,
      outPoint: timeline.outPoint
    };
  }

  public async getPlayhead(): Promise<number | null> {
    const timeline = await this.read();
    return timeline?.playhead ?? null;
  }
}
