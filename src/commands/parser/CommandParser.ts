import { CommandRequest } from "../types/CommandTypes";

export class CommandParser {
  parse(input: string): CommandRequest {
    const text = input.toLowerCase();

    if (text.includes("reel")) {
      return {
        intent: "CREATE_REEL",
        source: "selected_clips"
      };
    }

    if (text.includes("teaser")) {
      return {
        intent: "CREATE_TEASER",
        source: "selected_clips"
      };
    }

    if (text.includes("highlight")) {
      return {
        intent: "CREATE_HIGHLIGHT",
        source: "selected_clips"
      };
    }

    if (text.includes("music")) {
      return {
        intent: "SYNC_MUSIC"
      };
    }

    if (text.includes("export")) {
      return {
        intent: "EXPORT"
      };
    }

    return {
      intent: "UNKNOWN"
    };
  }
}
