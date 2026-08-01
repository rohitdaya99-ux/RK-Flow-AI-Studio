import { CommandResult } from "../types/Command";
import { PremiereBridge } from "./PremiereBridge";

export class MarkerController {
  public constructor(private readonly bridge: PremiereBridge) {}

  public async create(
    name: string,
    time: number,
    color?: string
  ): Promise<CommandResult> {
    return this.bridge.execute("CREATE_MARKER", { name, time, color });
  }

  public async delete(markerId: string): Promise<CommandResult> {
    return this.bridge.execute("DELETE_MARKER", { markerId });
  }
}
