export const COMMAND_ACTIONS = [
  "READ_TIMELINE",
  "READ_SELECTED_CLIPS",
  "GET_IN_OUT",
  "GET_PLAYHEAD",
  "MOVE_PLAYHEAD",
  "CREATE_MARKER",
  "DELETE_MARKER",
  "CUT_CLIP",
  "TRIM_CLIP",
  "MOVE_CLIP",
  "CREATE_SEQUENCE",
  "IMPORT_MEDIA",
  "EXPORT_SEQUENCE",
  "CREATE_REEL",
  "RIPPLE_DELETE",
  "AUTO_TRIM",
  "BEAT_CUT",
  "SILENCE_REMOVE",
  "SPEED_RAMP",
  "AUTO_ZOOM",
  "REFRAME",
  "ADD_CLIP_TO_SEQUENCE",
  "ADD_AUDIO_TO_SEQUENCE",
  "ADD_TRANSITION",
  "APPLY_COLOR_MATCH",
  "APPLY_SKIN_TONE_PROTECTION",
  "APPLY_FILM_LUT",
  "AUTO_GRADE",
  "APPLY_PAN_AND_ZOOM",
  "APPLY_PARALLAX",
  "APPLY_MOTION_BLUR",
  "REMOVE_NOISE",
  "ENHANCE_VOICE",
  "AUTO_DUCK",
  "CLEANUP_SPEECH",
  "INSERT_CAPTIONS"
] as const;

export type CommandAction = (typeof COMMAND_ACTIONS)[number];

export type CommandPayload = Record<string, unknown>;

export interface RKCommand {
  id: string;
  action: CommandAction;
  payload: CommandPayload;
  timestamp: number;
}

export interface CommandResult<TData = unknown> {
  success: boolean;
  message: string;
  data?: TData;
  error?: string;
}

export interface CommandValidationResult {
  valid: boolean;
  errors: string[];
}

let commandCounter = 0;

export function createCommand(
  action: CommandAction,
  payload: CommandPayload = {}
): RKCommand {
  commandCounter += 1;

  return {
    id: `rk-command-${Date.now()}-${commandCounter}`,
    action,
    payload,
    timestamp: Date.now()
  };
}
