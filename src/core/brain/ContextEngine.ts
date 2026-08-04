import { PremiereContextProvider } from "../../ai/context/PremiereContextProvider";
import { PremiereContextManager } from "../../ai/context/PremiereContextManager";
import { premiereService } from "../../services/premiereService";
import { clipManager } from "../../services/premiere/clips/ClipManager";
import { BrainClip, BrainSequenceContext } from "./types";

export class ContextEngine {
  async readSequenceContext(): Promise<BrainSequenceContext | null> {
    await PremiereContextProvider.refresh();

    const base = PremiereContextManager.get();
    const timelineInfo = await premiereService.getTimelineInfo();
    const selectedClips = await this.readSelectedClips();

    if (!timelineInfo.connected || !base.sequenceName) {
      return null;
    }

    return {
      projectName: base.projectName,
      sequenceName: base.sequenceName,
      sequenceKey: this.getSequenceKey(base.projectName, base.sequenceName),
      fps: base.fps,
      playhead: base.playhead,
      inPoint: base.inPoint,
      outPoint: base.outPoint,
      duration: parseDurationToSeconds(timelineInfo.duration),
      videoTracks: base.videoTracks,
      audioTracks: base.audioTracks,
      selectedClips,
      markers: base.markers
    };
  }

  async readSelectedClips(): Promise<BrainClip[]> {
    const clips = await clipManager.getSelectedClips();

    return Promise.all(
      clips.map(async (clip, index) => ({
        id: buildClipId(clip.name, clip.start, clip.track, index),
        name: clip.name,
        start: clip.start,
        end: clip.end,
        duration: clip.duration,
        track: clip.track,
        mediaType: clip.mediaType,
        type: clip.type,
        projectItemId: await getProjectItemId(clip.projectItem)
      }))
    );
  }

  async capture(goal: string) {
    const context = await this.readSequenceContext();
    const promptLines = [`Goal: ${goal}`];

    if (context) {
      promptLines.push(`Sequence: ${context.sequenceName}`);
      promptLines.push(`Project: ${context.projectName}`);
      promptLines.push(
        `Selected Clips: ${context.selectedClips.map((clip) => clip.name).join(", ") || "None"}`
      );
    } else {
      promptLines.push("No active sequence");
    }

    return {
      context,
      prompt: promptLines.join("\n")
    };
  }

  getSequenceKey(projectName: string, sequenceName: string) {
    return `${projectName}::${sequenceName}`;
  }
}

function buildClipId(name: string, start: number, track: number, index: number) {
  return `${name}::${track}::${start.toFixed(3)}::${index}`;
}

function parseDurationToSeconds(value: string) {
  const parts = value.split(":").map(Number);

  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return 0;
  }

  return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

async function getProjectItemId(projectItem: any): Promise<string | undefined> {
  try {
    const id = await projectItem?.getId?.();
    return typeof id === "string" && id.length > 0 ? id : undefined;
  } catch {
    return undefined;
  }
}
