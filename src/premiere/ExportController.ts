import { CommandResult } from "../types/Command";
import { PremiereBridge } from "./PremiereBridge";

export class ExportController {
  public constructor(private readonly bridge: PremiereBridge) {}

  public async exportSequence(
    destinationPath: string,
    sequenceId?: string,
    preset?: string
  ): Promise<CommandResult> {
    return this.bridge.execute("EXPORT_SEQUENCE", {
      destinationPath,
      sequenceId,
      preset
    });
  }
}
