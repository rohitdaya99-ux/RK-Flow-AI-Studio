import { TimelineState } from "../types/Timeline";
import { CommandResult } from "../types/Command";

declare const window: any;

export class PremiereBridge {
  private host: any;

  constructor() {
    this.host = window?.premiere || window?.uxp || null;
  }

  public isConnected(): boolean {
    return this.host !== null;
  }

  public async readTimeline(): Promise<TimelineState | null> {
    console.log("[RKFlow] readTimeline()");
    return null;
  }

  public async execute(
    action: string,
    payload: any = {}
  ): Promise<CommandResult> {
    console.log("[RKFlow]", action, payload);

    return {
      success: true,
      message: `${action} executed`,
      data: payload
    };
  }
}