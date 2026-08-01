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
  getActiveSequence?: () => Promise<PremiereSequence | null>;
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
console.log("===== RKFLOW SEQUENCE =====");
console.log(sequence);

console.log("Sequence methods:");
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(sequence)));

try {
  const track = await (sequence as any).getVideoTrack(0);

  console.log("===== VIDEO TRACK =====");
  console.log(track);

  console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(track)));

const PPRO = (globalThis as any).require("premierepro");

console.log("PPRO Constants:", PPRO.Constants);

const clips = await (track as any).getTrackItems(
  PPRO.Constants.TrackItemType.CLIP,
  false
);

console.log("===== TRACK CLIPS =====");
console.log(clips);
console.log("Clip count:", clips.length);

if (clips.length > 0) {
  console.log("===== FIRST CLIP =====");
  console.log(clips[0]);

  console.log(
    Object.getOwnPropertyNames(
      Object.getPrototypeOf(clips[0])
    )
  );

  console.log("Clip Name:", await clips[0].getName());
  console.log("Start:", await clips[0].getStartTime());
  console.log("End:", await clips[0].getEndTime());
  console.log("Duration:", await clips[0].getDuration());
  console.log("In:", await clips[0].getInPoint());
  console.log("Out:", await clips[0].getOutPoint());
  console.log("Selected:", await clips[0].getIsSelected());
  console.log("Track Index:", await clips[0].getTrackIndex());

  const projectItem = await clips[0].getProjectItem();

  console.log("===== PROJECT ITEM =====");
  console.log(projectItem);

  console.log(
    Object.getOwnPropertyNames(
      Object.getPrototypeOf(projectItem)
    )
  );

  const media = await (projectItem as any).getMedia?.();

  console.log("===== MEDIA =====");
  console.log(media);

  if (media) {
    console.log(
      Object.getOwnPropertyNames(
        Object.getPrototypeOf(media)
      )
    );
  }

  const chain = await clips[0].getComponentChain();

  console.log("===== COMPONENT CHAIN =====");
  console.log(chain);

  console.log(
    Object.getOwnPropertyNames(
      Object.getPrototypeOf(chain)
    )
  );

  const count = await chain.getComponentCount();

  console.log("Component Count:", count);

  if (count > 0) {
    const c = await chain.getComponentAtIndex(0);

    console.log("===== FIRST COMPONENT =====");
    console.log(c);

    console.log(
      Object.getOwnPropertyNames(
        Object.getPrototypeOf(c)
      )
    );

    const paramCount = await c.getParamCount();

    console.log("Param Count:", paramCount);

    for (let i = 0; i < paramCount; i++) {
      const param = await c.getParam(i);

      console.log("===== PARAM", i, "=====");
      console.log(param);

      console.log(
        Object.getOwnPropertyNames(
          Object.getPrototypeOf(param)
        )
      );
    }
  }
}
} catch (e) {
  console.error("Track Error:", e);
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
      // Marker and clip enumeration are added only after the read-only snapshot
      // is verified in Premiere.
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
