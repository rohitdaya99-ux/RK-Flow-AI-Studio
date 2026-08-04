import { createCommand } from "../../types/Command";
import {
  CommandAction,
  CommandPayload,
  CommandResult,
  RKCommand
} from "../commands/CommandTypes";
import { ExecutionQueue } from "./ExecutionQueue";
import { requestExecutionPreview } from "./PreviewGate";

const NON_DESTRUCTIVE_ACTIONS = new Set<CommandAction>([
  "READ_TIMELINE",
  "READ_SELECTED_CLIPS",
  "GET_IN_OUT",
  "GET_PLAYHEAD"
]);

// These actions are only used by AutoEditAssembler after it creates and activates a new sequence.
const NEW_SEQUENCE_ASSEMBLY_ACTIONS = new Set<CommandAction>([
  "CREATE_SEQUENCE",
  "IMPORT_MEDIA",
  "ADD_CLIP_TO_SEQUENCE",
  "ADD_AUDIO_TO_SEQUENCE",
  "ADD_TRANSITION"
]);

export class PremiereExecutor {
  public constructor(private readonly queue = new ExecutionQueue()) {}

  public async run(command: RKCommand): Promise<CommandResult> {
    if (!(await this.ensurePreview([command]))) {
      return {
        success: false,
        message: `${command.action} was cancelled before execution.`,
        error: "PREVIEW_CANCELLED"
      };
    }

    return this.queue.enqueue(command);
  }

  public runAction(
    action: CommandAction,
    payload: CommandPayload = {}
  ): Promise<CommandResult> {
    return this.run(createCommand(action, payload));
  }

  public runNewSequenceAssembly(command: RKCommand): Promise<CommandResult> {
    if (!NEW_SEQUENCE_ASSEMBLY_ACTIONS.has(command.action)) {
      return Promise.resolve({
        success: false,
        message: `${command.action} is not allowed in the no-confirm new-sequence assembly path.`,
        error: "UNSAFE_NEW_SEQUENCE_ACTION"
      });
    }

    console.log(
      `[RK Flow][PremiereExecutor] Running ${command.action} in the new-sequence assembly path without PreviewGate.`
    );
    return this.queue.enqueue(command);
  }

  public async runBatch(commands: RKCommand[]): Promise<CommandResult[]> {
    if (!(await this.ensurePreview(commands))) {
      return commands.map((command) => ({
        success: false,
        message: `${command.action} was cancelled before execution.`,
        error: "PREVIEW_CANCELLED"
      }));
    }

    return this.queue.enqueueBatch(commands);
  }

  private async ensurePreview(commands: RKCommand[]) {
    const destructiveCommands = commands.filter((command) => !NON_DESTRUCTIVE_ACTIONS.has(command.action));

    if (destructiveCommands.length === 0) {
      return true;
    }

    return requestExecutionPreview(destructiveCommands);
  }
}
