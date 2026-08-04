import { PremiereContextManager } from "./PremiereContextManager";
import { PremiereReader } from "../premiere/PremiereReader";

export interface PremiereContextSnapshot {
  projectName: string;
  sequenceName: string;
  fps: number;
  playhead: number;
  inPoint: number;
  outPoint: number;
  videoTracks: number;
  audioTracks: number;
  selectedClips: string[];
  selectedClipCount: number;
  markers: string[];
}

export class PremiereContextSnapshotService {
  private readonly reader = new PremiereReader();

  async capture(): Promise<PremiereContextSnapshot> {
    const context = await this.reader.readContext();
    PremiereContextManager.update(context);

    return {
      projectName: context.projectName,
      sequenceName: context.sequenceName,
      fps: context.fps,
      playhead: context.playhead,
      inPoint: context.inPoint,
      outPoint: context.outPoint,
      videoTracks: context.videoTracks,
      audioTracks: context.audioTracks,
      selectedClips: [...context.selectedClips],
      selectedClipCount: context.selectedClips.length,
      markers: [...context.markers]
    };
  }
}
