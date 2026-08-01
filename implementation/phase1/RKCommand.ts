export type RKAction =
  | "CREATE_REEL"
  | "CREATE_TEASER"
  | "CREATE_HIGHLIGHT"
  | "TRIM_SILENCE"
  | "SYNC_MUSIC"
  | "ADD_TRANSITIONS"
  | "EXPORT"
  | "READ_PROJECT"
  | "READ_SEQUENCE"
  | "READ_SELECTION"
  | "READ_TIMELINE"
  | "READ_SDK_TIMELINE"
  | "TRIM_SELECTED"
  | "RAZOR"
  | "RIPPLE_DELETE"
  | "ADD_AUDIO_FADE"
  | "UNKNOWN";

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