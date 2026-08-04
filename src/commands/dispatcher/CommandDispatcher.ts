import { CommandParser } from "../parser/CommandParser";
import { createCommand } from "../../types/Command";
import { CommandValidator } from "../validator/CommandValidator";
import { PremiereExecutor as CorePremiereExecutor } from "../../core/execution/PremiereExecutor";
import { CommandIntent, CommandRequest, CommandResult } from "../types/CommandTypes";

export class CommandDispatcher {
  private readonly parser = new CommandParser();
  private readonly validator = new CommandValidator();
  private readonly executor = new CorePremiereExecutor();

  async dispatch(prompt: string): Promise<CommandResult> {
    const command = this.parser.parse(prompt);

    if (!this.validator.validate(command)) {
      return {
        success: false,
        message: "Unknown command.",
        actionsExecuted: 0,
        executionTime: 0,
        warnings: ["Unsupported intent"]
      };
    }

    const startedAt = Date.now();
    const action = mapIntentToAction(command);

    if (action === null) {
      return {
        success: false,
        message: `No active core executor mapping exists for intent "${command.intent}".`,
        actionsExecuted: 0,
        executionTime: Date.now() - startedAt,
        warnings: ["Intent is recognized by the legacy dispatcher but has no mapped RK command action."]
      };
    }

    const result = await this.executor.run(createCommand(action.action, action.payload));

    return {
      success: result.success,
      message: result.error ? `${result.message} ${result.error}`.trim() : result.message,
      actionsExecuted: 1,
      executionTime: Date.now() - startedAt,
      warnings: result.success ? [] : [result.error ?? "Premiere command execution failed."]
    };
  }
}

function mapIntentToAction(command: CommandRequest): { action: ReturnType<typeof createCommand>["action"]; payload: Record<string, unknown> } | null {
  switch (command.intent) {
    case "CREATE_REEL":
      return {
        action: "CREATE_REEL",
        payload: {
          source: command.source ?? "selected_clips",
          style: command.style ?? "default",
          format: "reel"
        }
      };
    case "CREATE_TEASER":
      return {
        action: "CREATE_REEL",
        payload: {
          source: command.source ?? "selected_clips",
          style: command.style ?? "default",
          format: "teaser"
        }
      };
    case "CREATE_HIGHLIGHT":
      return {
        action: "CREATE_REEL",
        payload: {
          source: command.source ?? "selected_clips",
          style: command.style ?? "default",
          format: "highlight"
        }
      };
    case "TRIM_SILENCE":
      return { action: "SILENCE_REMOVE", payload: {} };
    case "SYNC_MUSIC":
      return { action: "BEAT_CUT", payload: { musicSync: command.musicSync ?? true } };
    case "ADD_TRANSITIONS":
      return { action: "ADD_TRANSITION", payload: { type: command.transitions ?? "film_dissolve", duration: 0.5 } };
    case "EXPORT":
      return {
        action: "EXPORT_SEQUENCE",
        payload: {
          preset: command.style ?? "Instagram Reels"
        }
      };
    default:
      return exhaustiveIntent(command.intent);
  }
}

function exhaustiveIntent(intent: CommandIntent): null {
  void intent;
  return null;
}
