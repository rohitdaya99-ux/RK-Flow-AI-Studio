import { PremiereBridge } from "../PremiereBridge";
import { CommandResult } from "../../types/Command";

export class EffectsController {
  constructor(private readonly bridge: PremiereBridge) {}

  public autoTrim(clipId?: string): Promise<CommandResult> {
    return this.bridge.execute("AUTO_TRIM", { clipId });
  }

  public beatCut(clipId?: string): Promise<CommandResult> {
    return this.bridge.execute("BEAT_CUT", { clipId });
  }

  public silenceRemove(clipId?: string): Promise<CommandResult> {
    return this.bridge.execute("SILENCE_REMOVE", { clipId });
  }

  public speedRamp(clipId: string, from: number, to: number): Promise<CommandResult> {
    return this.bridge.execute("SPEED_RAMP", { clipId, from, to });
  }

  public autoZoom(clipId: string, start: any, end: any): Promise<CommandResult> {
    return this.bridge.execute("AUTO_ZOOM", { clipId, start, end });
  }

  public reframe(clipId: string): Promise<CommandResult> {
    return this.bridge.execute("REFRAME", { clipId });
  }
}
