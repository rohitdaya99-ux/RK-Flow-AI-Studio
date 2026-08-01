import { CommandResult } from "../types/Command";
import { PremiereBridge } from "./PremiereBridge";

export class ClipController {
  public constructor(private readonly bridge: PremiereBridge) {}

  public async cut(clipId: string, time: number): Promise<CommandResult> {
    return this.bridge.execute("CUT_CLIP", { clipId, time });
  }

  public async trim(
    clipId: string,
    start: number,
    end: number
  ): Promise<CommandResult> {
    return this.bridge.execute("TRIM_CLIP", { clipId, start, end });
  }

  public async move(
    clipId: string,
    targetTrackIndex: number,
    start: number
  ): Promise<CommandResult> {
    return this.bridge.execute("MOVE_CLIP", {
      clipId,
      targetTrackIndex,
      start
    });
  }
}
