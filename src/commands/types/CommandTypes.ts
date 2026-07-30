export type CommandIntent =
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
  | "UNKNOWN";

export interface CommandRequest {
  intent: CommandIntent;
  source?: string;
  duration?: number;
  style?: string;
  event?: string;
  musicSync?: boolean;
  transitions?: string;
  metadata?: Record<string, unknown>;
}

export interface CommandResult {
  success: boolean;
  message: string;
  actionsExecuted: number;
  executionTime: number;
  warnings: string[];
}
