import { premiereAPI } from "../../PremiereAPI";

export interface ClipInfo {
  name: string;
  start: number;
  end: number;
  duration: number;
  track: number;
  mediaType: string;
  type: string;
  projectItem: any;
  raw: any;
}

export class ClipManager {
  async getSelectedClips(): Promise<ClipInfo[]> {
    const sequence = await premiereAPI.getActiveSequence();

    if (!sequence) return [];

    const selection = await sequence.getSelection();
    const items = await selection.getItems();

    const result: ClipInfo[] = [];

    for (const clip of items) {
      const start = await clip.getStartTime();
      const end = await clip.getEndTime();
      const duration = await clip.getDuration();

      result.push({
        name: await clip.getName(),
        start: start?.seconds ?? 0,
        end: end?.seconds ?? 0,
        duration: duration?.seconds ?? 0,
        track: await clip.getTrackIndex(),
        mediaType: await clip.getMediaType(),
        type: await clip.getType(),
        projectItem: await clip.getProjectItem(),
        raw: clip
      });
    }

    return result;
  }

  async getSelectedClipNames(): Promise<string[]> {
    const clips = await this.getSelectedClips();
    return clips.map(c => c.name);
  }

  async hasSelection(): Promise<boolean> {
    return (await this.getSelectedClips()).length > 0;
  }
}

export const clipManager = new ClipManager();
