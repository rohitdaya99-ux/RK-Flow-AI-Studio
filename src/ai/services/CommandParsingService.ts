import { runGeminiTool } from '../GeminiService';
import { commandToolSchemas } from "../schemas";
import { RKCommand } from '../../types/Command';
import { PremiereContextSnapshot } from '../context';

export class CommandParsingService {
  parseLocal(commandText: string, snapshot: PremiereContextSnapshot): RKCommand | null {
    const normalized = commandText.trim().toLowerCase();
    const durationMatch = normalized.match(/(\d+)\s*(?:second|seconds|sec|s)\b/);
    const duration = durationMatch ? Number(durationMatch[1]) : null;

    if (normalized.includes("selection") || normalized.includes("selected") || normalized.includes("select clips")) {
      return buildCommand("READ_SELECTED_CLIPS", {});
    }

    if (normalized.includes("timeline")) {
      return buildCommand("READ_TIMELINE", {});
    }

    if (normalized.includes("playhead")) {
      return buildCommand("GET_PLAYHEAD", {});
    }

    if (normalized.includes("trim")) {
      return buildCommand("AUTO_TRIM", {});
    }

    if ((normalized.includes("beat") && normalized.includes("cut")) || normalized === "cut") {
      return buildCommand("BEAT_CUT", {});
    }

    if (normalized.includes("reel") || normalized.includes("highlight") || normalized.includes("short")) {
      return buildCommand("CREATE_REEL", {
        duration: duration ?? inferDurationFromSnapshot(snapshot)
      });
    }

    return null;
  }

  async parseWithGemini(commandText: string): Promise<RKCommand | null> {
    try {
      const toolCall = await runGeminiTool(
        [
          "Translate the user's editing request into exactly one structured Premiere command tool call.",
          "Prefer the most direct available action.",
          "User request:",
          commandText
        ].join("\n"),
        commandToolSchemas
      );

      return {
        id: `cmd_${Date.now()}`,
        action: toolCall.name as RKCommand["action"],
        payload: toolCall.args as RKCommand["payload"],
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error parsing command with Gemini:', error);
      return null;
    }
  }
}

function buildCommand(action: RKCommand["action"], payload: RKCommand["payload"]): RKCommand {
  return {
    id: `cmd_${Date.now()}`,
    action,
    payload,
    timestamp: Date.now()
  };
}

function inferDurationFromSnapshot(snapshot: PremiereContextSnapshot) {
  const candidate = Math.round(Math.max(15, snapshot.outPoint - snapshot.inPoint));
  return candidate > 0 ? candidate : 45;
}
