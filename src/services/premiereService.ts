import { PremiereBridge } from "../premiere/PremiereBridge";

export interface TimelineInfo {
  connected: boolean;
  projectName: string;
  sequenceName: string;
  videoTracks: number;
  audioTracks: number;
  frameSize: { width: number; height: number } | null;
  timebase: number | null;
  duration: string;
}

export class PremiereService {
  private readonly bridge = new PremiereBridge();

  public async getTimelineInfo(): Promise<TimelineInfo> {
    if (!this.bridge.isConnected()) {
      return emptyTimelineInfo(false);
    }

    try {
      const timeline = await this.bridge.readTimeline();

      if (timeline === null) {
        return emptyTimelineInfo(true);
      }

      return {
        connected: true,
        projectName: "",
        sequenceName: normalizeLabelText(timeline.sequenceName, ""),
        videoTracks: timeline.videoTracks.length,
        audioTracks: timeline.audioTracks.length,
        frameSize: null,
        timebase: timeline.fps || null,
        duration: formatDuration(timeline.duration)
      };
    } catch (error: unknown) {
      console.error("[RK Flow] Could not read the active Premiere timeline.", error);
      return emptyTimelineInfo(false);
    }
  }
}

function normalizeLabelText(value: unknown, fallback: string): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function emptyTimelineInfo(connected: boolean): TimelineInfo {
  return {
    connected,
    projectName: "",
    sequenceName: "",
    videoTracks: 0,
    audioTracks: 0,
    frameSize: null,
    timebase: null,
    duration: "--"
  };
}

function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export const premiereService = new PremiereService();
