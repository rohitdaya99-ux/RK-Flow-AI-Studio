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
    const startTime = Date.now();
    
    console.log(`[RK Flow][CommandExecutor] Starting execution of ${command.action}`, {
      commandId: command.id,
      clipId: command.payload.clipId,
      projectItemId: command.payload.projectItemId,
      action: command.action,
      start: command.payload.start,
      end: command.payload.end,
      duration: command.payload.duration,
      trackIndex: command.payload.targetTrackIndex ?? command.payload.videoTrackIndex ?? command.payload.audioTrackIndex
    });

    try {
      const validation = this.validator.validate(command);
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(" ")}`);
      }

      // Pre-flight sequence and track validation for timeline-modifying commands
      if (this.isTimelineModifyingCommand(command.action)) {
        const timeline = await this.timelineReader.read();
        if (!timeline) {
          throw new Error("Pre-flight validation failed: No active sequence found.");
        }

        const trackIndex = command.payload.targetTrackIndex ?? command.payload.videoTrackIndex ?? command.payload.audioTrackIndex;
        if (typeof trackIndex === "number") {
          // If we have a track index, let's verify if a track exists or is locked
          const track = timeline.videoTracks.find(t => t.id === `video-${trackIndex + 1}`) || 
                        timeline.audioTracks.find(t => t.id === `audio-${trackIndex + 1}`);
          
          if (track && track.locked) {
            throw new Error(`Pre-flight validation failed: Target track ${track.name} is locked.`);
          }
        }

        if (command.payload.clipId) {
           const clipExists = timeline.videoTracks.some(t => t.clips.some(c => c.id === command.payload.clipId)) ||
                              timeline.audioTracks.some(t => t.clips.some(c => c.id === command.payload.clipId));
           
           if (!clipExists) {
              throw new Error(`Pre-flight validation failed: Clip ${command.payload.clipId} not found on timeline.`);
           }
        }
      }

      let result: CommandResult;
      switch (command.action) {
        case "READ_TIMELINE":
          result = await this.readTimeline();
          break;
        case "READ_SELECTED_CLIPS":
          result = { success: true, message: "Selected clips read.", data: await this.timelineReader.getSelectedClips() };
          break;
        case "GET_IN_OUT":
          result = { success: true, message: "In and out points read.", data: await this.timelineReader.getInOut() };
          break;
        case "GET_PLAYHEAD":
          result = { success: true, message: "Playhead read.", data: await this.timelineReader.getPlayhead() };
          break;
        case "CREATE_MARKER":
          result = await this.markers.create(command.payload.name as string, command.payload.time as number, command.payload.color as string | undefined);
          break;
        case "DELETE_MARKER":
          result = await this.markers.delete(command.payload.markerId as string);
          break;
        case "CUT_CLIP":
          result = await this.clips.cut(command.payload.clipId as string, command.payload.time as number);
          break;
        case "DELETE_CLIP":
          result = await this.bridge.execute(command.action, command.payload);
          break;
        case "TRIM_CLIP":
          result = await this.clips.trim(command.payload.clipId as string, command.payload.start as number, command.payload.end as number);
          break;
        case "MOVE_CLIP":
          result = await this.clips.move(command.payload.clipId as string, command.payload.targetTrackIndex as number, command.payload.start as number);
          break;
        case "CREATE_SEQUENCE":
          result = await this.sequences.create(command.payload.name as string, command.payload.fps as number | undefined);
          break;
        case "IMPORT_MEDIA":
          result = await this.sequences.importMedia(command.payload.mediaPath as string, command.payload.binPath as string | undefined);
          break;
        case "EXPORT_SEQUENCE":
          result = await this.exporter.exportSequence(command.payload.destinationPath as string, command.payload.sequenceId as string | undefined, command.payload.preset as string | undefined);
          break;
        case "RIPPLE_DELETE":
          result = await this.sequences.rippleDelete(command.payload.start as number, command.payload.end as number);
          break;
        case "AUTO_TRIM":
          result = await this.effects.autoTrim(command.payload.clipId as string);
          break;
        case "BEAT_CUT":
          result = await this.effects.beatCut(command.payload.clipId as string);
          break;
        case "SILENCE_REMOVE":
          result = await this.effects.silenceRemove(command.payload.clipId as string);
          break;
        case "SPEED_RAMP":
          result = await this.effects.speedRamp(command.payload.clipId as string, command.payload.from as number, command.payload.to as number);
          break;
        case "AUTO_ZOOM":
          result = await this.effects.autoZoom(command.payload.clipId as string, command.payload.start, command.payload.end);
          break;
        case "REFRAME":
          result = await this.effects.reframe(command.payload.clipId as string);
          break;
        case "MOVE_PLAYHEAD":
        case "CREATE_REEL":
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
          result = await this.bridge.execute(command.action, command.payload);
          break;
        default:
          result = { success: false, message: `Command ${command.action} not handled.` };
      }

      console.log(`[RK Flow][CommandExecutor] Finished execution of ${command.action} in ${Date.now() - startTime}ms`, {
        success: result.success,
        message: result.message
      });

      return result;

    } catch (error: any) {
      console.error(`[RK Flow][CommandExecutor] Execution failed for ${command.action} in ${Date.now() - startTime}ms`, {
        error: error.message
      });
      return {
        success: false,
        message: "Command execution failed.",
        error: error.message
      };
    }
  }

  private isTimelineModifyingCommand(action: string): boolean {
    const modifyingActions = [
      "MOVE_CLIP", "TRIM_CLIP", "CUT_CLIP", "DELETE_CLIP",
      "ADD_CLIP_TO_SEQUENCE", "ADD_AUDIO_TO_SEQUENCE", "ADD_TRANSITION",
      "AUTO_TRIM", "BEAT_CUT", "SILENCE_REMOVE", "RIPPLE_DELETE"
    ];
    return modifyingActions.includes(action);
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
