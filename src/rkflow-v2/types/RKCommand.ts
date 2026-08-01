export type RKAction =
  | "READ_TIMELINE"
  | "MOVE_PLAYHEAD"
  | "CREATE_MARKER"
  | "IMPORT_MEDIA"
  | "CREATE_REEL";

export interface RKCommand {
  id: string;
  action: RKAction;
  payload: Record<string, any>;
  timestamp: number;
}

export interface RKResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}
