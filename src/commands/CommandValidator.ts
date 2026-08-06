import {
  CommandPayload,
  CommandValidationResult,
  RKCommand
} from "../types/Command";
import { CommandRegistry } from "./CommandRegistry";

export class CommandValidator {
  public constructor(private readonly registry = new CommandRegistry()) {}

  public validate(command: unknown): CommandValidationResult {
    const errors: string[] = [];

    if (!isRecord(command)) {
      return { valid: false, errors: ["Command must be an object."] };
    }

    if (typeof command.id !== "string" || command.id.length === 0) {
      errors.push("Command id is required.");
    }

    if (typeof command.action !== "string" || !this.registry.has(command.action)) {
      errors.push("Command action is not supported.");
    }

    if (!isRecord(command.payload)) {
      errors.push("Command payload must be an object.");
    }

    if (!isFiniteNumber(command.timestamp)) {
      errors.push("Command timestamp must be a finite number.");
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    const typedCommand = command as unknown as RKCommand;
    this.validatePayload(typedCommand.action, typedCommand.payload, errors);

    return { valid: errors.length === 0, errors };
  }

  private validatePayload(
    action: RKCommand["action"],
    payload: CommandPayload,
    errors: string[]
  ): void {
    switch (action) {
      case "MOVE_PLAYHEAD":
        requireFiniteNumber(payload, "time", errors);
        break;
      case "CREATE_MARKER":
        requireNonEmptyString(payload, "name", errors);
        requireFiniteNumber(payload, "time", errors);
        break;
      case "DELETE_MARKER":
        requireNonEmptyString(payload, "markerId", errors);
        break;
      case "CUT_CLIP":
        requireNonEmptyString(payload, "clipId", errors);
        requireFiniteNumber(payload, "time", errors);
        break;
      case "DELETE_CLIP":
        requireNonEmptyString(payload, "clipId", errors);
        break;
      case "TRIM_CLIP":
        requireNonEmptyString(payload, "clipId", errors);
        requireFiniteNumber(payload, "start", errors);
        requireFiniteNumber(payload, "end", errors);
        break;
      case "MOVE_CLIP":
        requireNonEmptyString(payload, "clipId", errors);
        requireFiniteNumber(payload, "targetTrackIndex", errors);
        requireFiniteNumber(payload, "start", errors);
        break;
      case "CREATE_SEQUENCE":
        requireNonEmptyString(payload, "name", errors);
        break;
      case "IMPORT_MEDIA":
        requireNonEmptyString(payload, "mediaPath", errors);
        break;
      case "EXPORT_SEQUENCE":
        requireNonEmptyString(payload, "destinationPath", errors);
        break;
      case "CREATE_REEL":
        requireFiniteNumber(payload, "duration", errors);
        break;
      case "RIPPLE_DELETE":
        requireFiniteNumber(payload, "start", errors);
        requireFiniteNumber(payload, "end", errors);
        break;
      case "ADD_CLIP_TO_SEQUENCE":
        if (
          typeof payload.clipId !== "string" &&
          typeof payload.mediaPath !== "string"
        ) {
          errors.push("clipId or mediaPath must be provided.");
        }
        requireFiniteNumber(payload, "start", errors);
        break;
      case "ADD_AUDIO_TO_SEQUENCE":
        if (
          typeof payload.clipId !== "string" &&
          typeof payload.mediaPath !== "string" &&
          typeof payload.assetId !== "string"
        ) {
          errors.push("clipId, mediaPath, or assetId must be provided.");
        }
        requireFiniteNumber(payload, "start", errors);
        break;
      case "ADD_TRANSITION":
        requireNonEmptyString(payload, "type", errors);
        requireFiniteNumber(payload, "start", errors);
        requireFiniteNumber(payload, "duration", errors);
        break;
      case "APPLY_COLOR_MATCH":
        requireNonEmptyString(payload, "sourceClipId", errors);
        requireNonEmptyString(payload, "targetClipId", errors);
        break;
      case "APPLY_SKIN_TONE_PROTECTION":
      case "APPLY_FILM_LUT":
      case "AUTO_GRADE":
      case "APPLY_PAN_AND_ZOOM":
      case "APPLY_PARALLAX":
      case "APPLY_MOTION_BLUR":
      case "REMOVE_NOISE":
      case "ENHANCE_VOICE":
      case "CLEANUP_SPEECH":
        requireNonEmptyString(payload, "clipId", errors);
        break;
      case "AUTO_DUCK":
        requireNonEmptyString(payload, "mainClipId", errors);
        requireNonEmptyString(payload, "musicClipId", errors);
        break;
      case "INSERT_CAPTIONS":
        requireNonEmptyString(payload, "captions", errors);
        break;
      case "READ_TIMELINE":
      case "READ_SELECTED_CLIPS":
      case "GET_IN_OUT":
      case "GET_PLAYHEAD":
      case "AUTO_TRIM":
      case "BEAT_CUT":
      case "SILENCE_REMOVE":
      case "SPEED_RAMP":
      case "AUTO_ZOOM":
      case "REFRAME":
        break;
    }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function requireFiniteNumber(
  payload: CommandPayload,
  key: string,
  errors: string[]
): void {
  if (!isFiniteNumber(payload[key])) {
    errors.push(`${key} must be a finite number.`);
  }
}

function requireNonEmptyString(
  payload: CommandPayload,
  key: string,
  errors: string[]
): void {
  if (typeof payload[key] !== "string" || payload[key].trim().length === 0) {
    errors.push(`${key} must be a non-empty string.`);
  }
}
