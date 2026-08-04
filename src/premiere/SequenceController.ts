import { CommandResult } from "../types/Command";
import { PremiereBridge } from "./PremiereBridge";

export class SequenceController {
  public constructor(private readonly bridge: PremiereBridge) {}

  public async create(name: string, fps?: number): Promise<CommandResult> {
    return this.bridge.execute("CREATE_SEQUENCE", { name, fps });
  }

  public async importMedia(
    mediaPath: string,
    binPath?: string
  ): Promise<CommandResult> {
    return this.bridge.execute("IMPORT_MEDIA", { mediaPath, binPath });
  }

  public async rippleDelete(start: number, end: number): Promise<CommandResult> {
    return this.bridge.execute("RIPPLE_DELETE", { start, end });
  }
}
