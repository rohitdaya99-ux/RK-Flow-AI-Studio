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
  "CREATE_REEL"
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
