import { CommandRequest } from "../types/CommandTypes";

export class CommandParser {
  parse(input: string): CommandRequest {
    const text = input.toLowerCase().trim();

    if (text.includes("reel")) {
      return {
        intent: "CREATE_REEL",
        source: "selected_clips",
        style: text.includes("cinematic") ? "cinematic" : "default"
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

    if (text.includes("trim") && text.includes("silence")) {
      return {
        intent: "TRIM_SILENCE"
      };
    }

    if (text.includes("transition")) {
      return {
        intent: "ADD_TRANSITIONS"
      };
    }

    if (text.includes("music") || text.includes("beat")) {
      return {
        intent: "SYNC_MUSIC",
        musicSync: true
      };
    }

    if (text.includes("timeline")) { return { intent: "READ_TIMELINE" }; }

    if (text.includes("selection")) { return { intent: "READ_SELECTION" }; }

    if (text.includes("sequence")) { return { intent: "READ_SEQUENCE" }; }

    if (text.includes("project")) { return { intent: "READ_PROJECT" }; }

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
