import { CommandResult, RKCommand } from "../types/Command";
import { ClipController } from "../premiere/ClipController";
import { ExportController } from "../premiere/ExportController";
import { MarkerController } from "../premiere/MarkerController";
import { EffectsController } from "../premiere/effects/EffectsController";
import { PremiereBridge } from "../premiere/PremiereBridge";
import { SequenceController } from "../premiere/SequenceController";
import { TimelineReader } from "../premiere/TimelineReader";
import { CommandValidator } from "./CommandValidator";

export interface CommandExecutorDependencies {
  bridge?: PremiereBridge;
  validator?: CommandValidator;
}

export class CommandExecutor {
  private readonly bridge: PremiereBridge;
  private readonly validator: CommandValidator;
  private readonly timelineReader: TimelineReader;
  private readonly clips: ClipController;
  private readonly markers: MarkerController;
  private readonly sequences: SequenceController;
  private readonly exporter: ExportController;
  private readonly effects: EffectsController;

  public constructor(dependencies: CommandExecutorDependencies = {}) {
    this.bridge = dependencies.bridge ?? new PremiereBridge();
    this.validator = dependencies.validator ?? new CommandValidator();
    this.timelineReader = new TimelineReader(this.bridge);
    this.clips = new ClipController(this.bridge);
    this.markers = new MarkerController(this.bridge);
    this.sequences = new SequenceController(this.bridge);
    this.exporter = new ExportController(this.bridge);
    this.effects = new EffectsController(this.bridge);
  }

  public async execute(command: RKCommand): Promise<CommandResult> {
    const validation = this.validator.validate(command);

    if (!validation.valid) {
      return {
        success: false,
        message: "Command rejected by validation.",
        error: validation.errors.join(" ")
      };
    }

    switch (command.action) {
      case "READ_TIMELINE":
        return this.readTimeline();
      case "READ_SELECTED_CLIPS":
        return {
          success: true,
          message: "Selected clips read.",
          data: await this.timelineReader.getSelectedClips()
        };
      case "GET_IN_OUT":
        return {
          success: true,
          message: "In and out points read.",
          data: await this.timelineReader.getInOut()
        };
      case "GET_PLAYHEAD":
        return {
          success: true,
          message: "Playhead read.",
          data: await this.timelineReader.getPlayhead()
        };
      case "MOVE_PLAYHEAD":
        return this.bridge.execute(command.action, command.payload);
      case "CREATE_MARKER":
        return this.markers.create(
          command.payload.name as string,
          command.payload.time as number,
          command.payload.color as string | undefined
        );
      case "DELETE_MARKER":
        return this.markers.delete(command.payload.markerId as string);
      case "CUT_CLIP":
        return this.clips.cut(
          command.payload.clipId as string,
          command.payload.time as number
        );
      case "TRIM_CLIP":
        return this.clips.trim(
          command.payload.clipId as string,
          command.payload.start as number,
          command.payload.end as number
        );
      case "MOVE_CLIP":
        return this.clips.move(
          command.payload.clipId as string,
          command.payload.targetTrackIndex as number,
          command.payload.start as number
        );
      case "CREATE_SEQUENCE":
        return this.sequences.create(
          command.payload.name as string,
          command.payload.fps as number | undefined
        );
      case "IMPORT_MEDIA":
        return this.sequences.importMedia(
          command.payload.mediaPath as string,
          command.payload.binPath as string | undefined
        );
      case "EXPORT_SEQUENCE":
        return this.exporter.exportSequence(
          command.payload.destinationPath as string,
          command.payload.sequenceId as string | undefined,
          command.payload.preset as string | undefined
        );
      case "CREATE_REEL":
        return this.bridge.execute(command.action, command.payload);
      case "RIPPLE_DELETE":
        return this.sequences.rippleDelete(
          command.payload.start as number,
          command.payload.end as number
        );
      case "AUTO_TRIM":
        return this.effects.autoTrim();
      case "BEAT_CUT":
        return this.effects.beatCut();
      case "SILENCE_REMOVE":
        return this.effects.silenceRemove();
      case "SPEED_RAMP":
        return this.effects.speedRamp(
          command.payload.clipId as string,
          command.payload.from as number,
          command.payload.to as number
        );
      case "AUTO_ZOOM":
        return this.effects.autoZoom(
          command.payload.clipId as string,
          command.payload.start,
          command.payload.end
        );
      case "REFRAME":
        return this.effects.reframe(command.payload.clipId as string);
      case "ADD_CLIP_TO_SEQUENCE":
      case "ADD_AUDIO_TO_SEQUENCE":
      case "ADD_TRANSITION":
      case "APPLY_COLOR_MATCH":
      case "APPLY_SKIN_TONE_PROTECTION":
      case "APPLY_FILM_LUT":
      case "AUTO_GRADE":
      case "APPLY_PAN_AND_ZOOM":
      case "APPLY_PARALLAX":
      case "APPLY_MOTION_BLUR":
      case "REMOVE_NOISE":
      case "ENHANCE_VOICE":
      case "AUTO_DUCK":
      case "CLEANUP_SPEECH":
      case "INSERT_CAPTIONS":
        return this.bridge.execute(command.action, command.payload);
    }
  }

  private async readTimeline(): Promise<CommandResult> {
    const timeline = await this.timelineReader.read();

    if (timeline === null) {
      return {
        success: false,
        message: "No active Premiere timeline is available.",
        error: "TIMELINE_NOT_AVAILABLE"
      };
    }

    return {
      success: true,
      message: "Timeline read.",
      data: timeline
    };
  }
}
