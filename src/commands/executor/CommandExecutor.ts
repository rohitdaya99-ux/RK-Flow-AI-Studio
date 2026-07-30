import { CommandRequest, CommandResult } from "../types/CommandTypes";
import { CommandValidator } from "../validator/CommandValidator";
import PremiereActions from "../../premiere/actions/PremiereActions";
import EditActions from "../../premiere/actions/EditActions";

export class CommandExecutor {

  private validator = new CommandValidator();
  private actions = new PremiereActions();
  private edit = new EditActions();

  async execute(command: CommandRequest): Promise<CommandResult> {

    if (!this.validator.validate(command)) {
      return {
        success: false,
        message: "Invalid command.",
        actionsExecuted: 0,
        executionTime: 0,
        warnings: ["Validation failed."]
      };
    }

    const start = Date.now();

    switch (command.intent) {

      case "CREATE_REEL":
        await this.actions.center();
        break;

      case "CREATE_TEASER":
        await this.actions.left();
        break;

      case "CREATE_HIGHLIGHT":
        await this.actions.right();
        break;

      case "ADD_TRANSITIONS":
        await this.actions.top();
        break;

      case "READ_PROJECT":
        await this.actions.getProject();
        break;

      case "READ_SEQUENCE":
        await this.actions.getSequence();
        break;

      case "READ_SELECTION":
        await this.actions.getSelection();
        break;

      case "READ_TIMELINE":
        await this.actions.getTimeline();
        break;

      case "TRIM_SELECTED":
        await this.edit.trimSelected();
        break;

      case "RAZOR":
        await this.edit.razorAtPlayhead();
        break;

      case "RIPPLE_DELETE":
        await this.edit.rippleDelete();
        break;

      case "ADD_AUDIO_FADE":
        await this.edit.addAudioFade();
        break;

      case "EXPORT":
        await this.actions.bottom();
        break;

      default:
        break;
    }

    return {
      success: true,
      message: command.intent,
      actionsExecuted: 1,
      executionTime: Date.now() - start,
      warnings: []
    };

  }

}
