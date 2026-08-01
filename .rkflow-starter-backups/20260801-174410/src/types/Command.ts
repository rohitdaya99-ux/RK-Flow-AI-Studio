export type CommandAction =
  | "READ_TIMELINE"
  | "READ_SELECTED_CLIPS"
  | "GET_IN_OUT"
  | "GET_PLAYHEAD"
  | "MOVE_PLAYHEAD"
  | "CREATE_MARKER"
  | "DELETE_MARKER"
  | "CUT_CLIP"
  | "TRIM_CLIP"
  | "MOVE_CLIP"
  | "CREATE_SEQUENCE"
  | "IMPORT_MEDIA"
  | "EXPORT_SEQUENCE"
  | "CREATE_REEL";

export interface CommandPayload {
  [key: string]: unknown;
}

export interface RKCommand {
  id: string;
  action: CommandAction;
  payload: CommandPayload;
  timestamp: number;
}

export interface CommandResult {
  success: boolean;
  message: string;
  data?: unknown;
  error?: string;
}