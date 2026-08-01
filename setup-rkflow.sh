#!/usr/bin/env bash

# RK Flow starter installer
# Run from the project root with: chmod +x setup-rkflow.sh && ./setup-rkflow.sh

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [[ ! -f package.json ]]; then
  echo "Error: setup-rkflow.sh must be kept in the RK Flow project root." >&2
  exit 1
fi

TARGET_FILES=(
  "src/premiere/PremiereBridge.ts"
  "src/premiere/TimelineReader.ts"
  "src/premiere/ClipController.ts"
  "src/premiere/MarkerController.ts"
  "src/premiere/SequenceController.ts"
  "src/premiere/ExportController.ts"
  "src/commands/CommandRegistry.ts"
  "src/commands/CommandValidator.ts"
  "src/commands/CommandExecutor.ts"
  "src/ai/GeminiJSONService.ts"
  "src/ai/PromptBuilder.ts"
  "src/types/Command.ts"
  "src/types/Timeline.ts"
)

BACKUP_ROOT=".rkflow-starter-backups/$(date +%Y%m%d-%H%M%S)"
BACKUP_CREATED=false

for file_path in "${TARGET_FILES[@]}"; do
  if [[ -s "$file_path" ]]; then
    mkdir -p "$BACKUP_ROOT/$(dirname "$file_path")"
    cp "$file_path" "$BACKUP_ROOT/$file_path"
    BACKUP_CREATED=true
  fi
done

mkdir -p src/premiere src/commands src/ai src/types

cat > src/types/Command.ts <<'EOF'
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
EOF

cat > src/types/Timeline.ts <<'EOF'
export type TimelineTrackType = "video" | "audio";

export interface TimelineClip {
  id: string;
  name: string;
  start: number;
  end: number;
  duration: number;
  trackIndex: number;
  selected: boolean;
  mediaPath?: string;
}

export interface TimelineTrack {
  id: string;
  name: string;
  type: TimelineTrackType;
  clips: TimelineClip[];
}

export interface TimelineMarker {
  id: string;
  name: string;
  time: number;
  color?: string;
}

export interface TimelineState {
  sequenceName: string;
  fps: number;
  duration: number;
  playhead: number;
  inPoint: number;
  outPoint: number;
  videoTracks: TimelineTrack[];
  audioTracks: TimelineTrack[];
  markers: TimelineMarker[];
}

export interface InOutRange {
  inPoint: number;
  outPoint: number;
}

export function createEmptyTimeline(): TimelineState {
  return {
    sequenceName: "",
    fps: 0,
    duration: 0,
    playhead: 0,
    inPoint: 0,
    outPoint: 0,
    videoTracks: [],
    audioTracks: [],
    markers: []
  };
}
EOF

cat > src/premiere/PremiereBridge.ts <<'EOF'
import {
  CommandAction,
  CommandPayload,
  CommandResult
} from "../types/Command";
import {
  TimelineState,
  TimelineTrack,
  TimelineTrackType
} from "../types/Timeline";

interface TickTime {
  seconds: number;
}

interface SequenceSettings {
  getVideoFrameRate?: () => Promise<{ value: number }>;
}

interface PremiereSequence {
  name: string;
  getAudioTrackCount: () => Promise<number>;
  getEndTime: () => Promise<TickTime>;
  getInPoint: () => Promise<TickTime>;
  getOutPoint: () => Promise<TickTime>;
  getPlayerPosition: () => Promise<TickTime>;
  getSettings: () => Promise<SequenceSettings>;
  getVideoTrackCount: () => Promise<number>;
}

interface PremiereProject {
  getActiveSequence: () => Promise<PremiereSequence | null>;
}

interface PremiereApp {
  Project: {
    getActiveProject: () => Promise<PremiereProject | null>;
  };
}

interface PremiereHost {
  app?: PremiereApp;
  execute?: (
    action: CommandAction,
    payload: CommandPayload
  ) => Promise<unknown> | unknown;
  readTimeline?: () => Promise<TimelineState | null> | TimelineState | null;
}

export class PremiereBridge {
  private readonly host: PremiereHost | null;

  public constructor(host?: PremiereHost | null) {
    this.host = host === undefined ? this.resolveHost() : host;
  }

  public isConnected(): boolean {
    return this.host !== null;
  }

  public async readTimeline(): Promise<TimelineState | null> {
    if (this.host?.readTimeline !== undefined) {
      return this.host.readTimeline();
    }

    const sequence = await this.getActiveSequence();

    if (sequence === null) {
      return null;
    }

    const [
      videoTrackCount,
      audioTrackCount,
      duration,
      inPoint,
      outPoint,
      playhead,
      settings
    ] = await Promise.all([
      sequence.getVideoTrackCount(),
      sequence.getAudioTrackCount(),
      sequence.getEndTime(),
      sequence.getInPoint(),
      sequence.getOutPoint(),
      sequence.getPlayerPosition(),
      sequence.getSettings()
    ]);

    return {
      sequenceName: sequence.name,
      fps: await getFrameRate(settings),
      duration: duration.seconds,
      playhead: playhead.seconds,
      inPoint: inPoint.seconds,
      outPoint: outPoint.seconds,
      videoTracks: createTracks("video", videoTrackCount),
      audioTracks: createTracks("audio", audioTrackCount),
      markers: []
    };
  }

  public async execute(
    action: CommandAction,
    payload: CommandPayload = {}
  ): Promise<CommandResult> {
    if (this.host?.execute !== undefined) {
      return this.executeWithHost(action, payload);
    }

    return {
      success: false,
      message: `${action} is not enabled in the read-only UXP bridge.`,
      error: "ACTION_NOT_IMPLEMENTED"
    };
  }

  private async executeWithHost(
    action: CommandAction,
    payload: CommandPayload
  ): Promise<CommandResult> {
    try {
      const data = await this.host?.execute?.(action, payload);

      return {
        success: true,
        message: `${action} executed.`,
        data
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: `${action} failed.`,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async getActiveSequence(): Promise<PremiereSequence | null> {
    if (this.host?.app === undefined) {
      return null;
    }

    const project = await this.host.app.Project.getActiveProject();
    return project === null ? null : project.getActiveSequence();
  }

  private resolveHost(): PremiereHost | null {
    const moduleRequire = (globalThis as { require?: unknown }).require;

    if (typeof moduleRequire !== "function") {
      return null;
    }

    try {
      const app = moduleRequire("premierepro") as PremiereApp;
      return app?.Project?.getActiveProject === undefined ? null : { app };
    } catch {
      return null;
    }
  }
}

async function getFrameRate(settings: SequenceSettings): Promise<number> {
  if (settings.getVideoFrameRate === undefined) {
    return 0;
  }

  return (await settings.getVideoFrameRate()).value;
}

function createTracks(type: TimelineTrackType, count: number): TimelineTrack[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${type}-${index + 1}`,
    name: `${type === "video" ? "Video" : "Audio"} ${index + 1}`,
    type,
    clips: []
  }));
}
EOF

cat > src/premiere/TimelineReader.ts <<'EOF'
import { PremiereBridge } from "./PremiereBridge";
import {
  InOutRange,
  TimelineClip,
  TimelineState
} from "../types/Timeline";

export class TimelineReader {
  public constructor(private readonly bridge: PremiereBridge) {}

  public async read(): Promise<TimelineState | null> {
    return this.bridge.readTimeline();
  }

  public async getSelectedClips(): Promise<TimelineClip[]> {
    const timeline = await this.read();

    if (timeline === null) {
      return [];
    }

    return [...timeline.videoTracks, ...timeline.audioTracks].flatMap((track) =>
      track.clips.filter((clip) => clip.selected)
    );
  }

  public async getInOut(): Promise<InOutRange | null> {
    const timeline = await this.read();

    if (timeline === null) {
      return null;
    }

    return {
      inPoint: timeline.inPoint,
      outPoint: timeline.outPoint
    };
  }

  public async getPlayhead(): Promise<number | null> {
    const timeline = await this.read();
    return timeline?.playhead ?? null;
  }
}
EOF

cat > src/premiere/ClipController.ts <<'EOF'
import { CommandResult } from "../types/Command";
import { PremiereBridge } from "./PremiereBridge";

export class ClipController {
  public constructor(private readonly bridge: PremiereBridge) {}

  public async cut(clipId: string, time: number): Promise<CommandResult> {
    return this.bridge.execute("CUT_CLIP", { clipId, time });
  }

  public async trim(
    clipId: string,
    start: number,
    end: number
  ): Promise<CommandResult> {
    return this.bridge.execute("TRIM_CLIP", { clipId, start, end });
  }

  public async move(
    clipId: string,
    targetTrackIndex: number,
    start: number
  ): Promise<CommandResult> {
    return this.bridge.execute("MOVE_CLIP", {
      clipId,
      targetTrackIndex,
      start
    });
  }
}
EOF

cat > src/premiere/MarkerController.ts <<'EOF'
import { CommandResult } from "../types/Command";
import { PremiereBridge } from "./PremiereBridge";

export class MarkerController {
  public constructor(private readonly bridge: PremiereBridge) {}

  public async create(
    name: string,
    time: number,
    color?: string
  ): Promise<CommandResult> {
    return this.bridge.execute("CREATE_MARKER", { name, time, color });
  }

  public async delete(markerId: string): Promise<CommandResult> {
    return this.bridge.execute("DELETE_MARKER", { markerId });
  }
}
EOF

cat > src/premiere/SequenceController.ts <<'EOF'
import { CommandResult } from "../types/Command";
import { PremiereBridge } from "./PremiereBridge";

export class SequenceController {
  public constructor(private readonly bridge: PremiereBridge) {}

  public async create(name: string, fps?: number): Promise<CommandResult> {
    return this.bridge.execute("CREATE_SEQUENCE", { name, fps });
  }

  public async importMedia(
    mediaPath: string,
    binPath?: string
  ): Promise<CommandResult> {
    return this.bridge.execute("IMPORT_MEDIA", { mediaPath, binPath });
  }
}
EOF

cat > src/premiere/ExportController.ts <<'EOF'
import { CommandResult } from "../types/Command";
import { PremiereBridge } from "./PremiereBridge";

export class ExportController {
  public constructor(private readonly bridge: PremiereBridge) {}

  public async exportSequence(
    destinationPath: string,
    sequenceId?: string,
    preset?: string
  ): Promise<CommandResult> {
    return this.bridge.execute("EXPORT_SEQUENCE", {
      destinationPath,
      sequenceId,
      preset
    });
  }
}
EOF

cat > src/commands/CommandRegistry.ts <<'EOF'
import { COMMAND_ACTIONS, CommandAction } from "../types/Command";

export class CommandRegistry {
  private readonly actions = new Set<CommandAction>(COMMAND_ACTIONS);

  public has(action: string): action is CommandAction {
    return this.actions.has(action as CommandAction);
  }

  public list(): CommandAction[] {
    return [...this.actions];
  }
}
EOF

cat > src/commands/CommandValidator.ts <<'EOF'
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
      case "READ_TIMELINE":
      case "READ_SELECTED_CLIPS":
      case "GET_IN_OUT":
      case "GET_PLAYHEAD":
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
EOF

cat > src/commands/CommandExecutor.ts <<'EOF'
import { CommandResult, RKCommand } from "../types/Command";
import { ClipController } from "../premiere/ClipController";
import { ExportController } from "../premiere/ExportController";
import { MarkerController } from "../premiere/MarkerController";
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

  public constructor(dependencies: CommandExecutorDependencies = {}) {
    this.bridge = dependencies.bridge ?? new PremiereBridge();
    this.validator = dependencies.validator ?? new CommandValidator();
    this.timelineReader = new TimelineReader(this.bridge);
    this.clips = new ClipController(this.bridge);
    this.markers = new MarkerController(this.bridge);
    this.sequences = new SequenceController(this.bridge);
    this.exporter = new ExportController(this.bridge);
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
EOF

cat > src/ai/PromptBuilder.ts <<'EOF'
import { COMMAND_ACTIONS } from "../types/Command";
import { TimelineState } from "../types/Timeline";

export class PromptBuilder {
  public buildCommandPrompt(
    userRequest: string,
    timeline?: TimelineState | null
  ): string {
    const timelineContext =
      timeline === undefined || timeline === null
        ? "No timeline data is available. Do not invent clip, track, or marker IDs."
        : JSON.stringify(timeline, null, 2);

    return [
      "You translate RK Flow editing requests into one safe Premiere command.",
      "Return only a JSON object. Do not include markdown, explanations, or code fences.",
      'The JSON shape must be: {"action":"COMMAND_NAME","payload":{}}.',
      `Supported actions: ${COMMAND_ACTIONS.join(", ")}.`,
      "Only use values supported by the timeline context. Never claim that a command has run.",
      `Timeline context:\n${timelineContext}`,
      `User request:\n${userRequest}`
    ].join("\n\n");
  }
}
EOF

cat > src/ai/GeminiJSONService.ts <<'EOF'
import {
  CommandAction,
  CommandPayload,
  RKCommand,
  createCommand
} from "../types/Command";
import { TimelineState } from "../types/Timeline";
import { CommandRegistry } from "../commands/CommandRegistry";
import { CommandValidator } from "../commands/CommandValidator";
import { PromptBuilder } from "./PromptBuilder";

export interface GeminiTextGenerator {
  generate(prompt: string): Promise<string>;
}

export class GeminiJSONService {
  private readonly registry = new CommandRegistry();
  private readonly validator = new CommandValidator(this.registry);

  public constructor(
    private readonly generator: GeminiTextGenerator,
    private readonly promptBuilder = new PromptBuilder()
  ) {}

  public async createCommand(
    userRequest: string,
    timeline?: TimelineState | null
  ): Promise<RKCommand> {
    const prompt = this.promptBuilder.buildCommandPrompt(userRequest, timeline);
    const response = await this.generator.generate(prompt);
    const command = this.parseCommand(response);
    const validation = this.validator.validate(command);

    if (!validation.valid) {
      throw new Error(`Gemini returned an invalid command: ${validation.errors.join(" ")}`);
    }

    return command;
  }

  public parseCommand(response: string): RKCommand {
    const parsed = JSON.parse(extractJsonObject(response)) as unknown;

    if (!isRecord(parsed) || typeof parsed.action !== "string") {
      throw new Error("Gemini response must contain an action.");
    }

    if (!this.registry.has(parsed.action)) {
      throw new Error(`Unsupported command action: ${parsed.action}`);
    }

    const payload = isRecord(parsed.payload) ? parsed.payload : {};
    return createCommand(parsed.action as CommandAction, payload);
  }
}

function extractJsonObject(response: string): string {
  const withoutFences = response
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  const firstBrace = withoutFences.indexOf("{");
  const lastBrace = withoutFences.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    throw new Error("Gemini response did not contain a JSON object.");
  }

  return withoutFences.slice(firstBrace, lastBrace + 1);
}

function isRecord(value: unknown): value is CommandPayload {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
EOF

if [[ "$BACKUP_CREATED" == true ]]; then
  echo "Existing starter files backed up to: $BACKUP_ROOT"
fi

echo "RK Flow starter files written successfully."
echo "Next: npm run build"
