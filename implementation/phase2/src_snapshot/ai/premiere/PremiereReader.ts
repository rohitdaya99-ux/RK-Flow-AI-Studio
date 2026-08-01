import { PremiereContext } from "../context/PremiereContext";
import { premiereAPI } from "../../services/PremiereAPI";
import { clipManager } from "../../services/premiere/clips/ClipManager";

export class PremiereReader {
  async readContext(): Promise<PremiereContext> {
    const sequence = await premiereAPI.getActiveSequence();
    const timeline = await premiereAPI.getTimelineContext();
    const clips = await clipManager.getSelectedClips();

    const playhead = sequence
      ? await sequence.getPlayerPosition()
      : null;

    const inPoint = sequence
      ? await sequence.getInPoint()
      : null;

    const outPoint = sequence
      ? await sequence.getOutPoint()
      : null;

    return {
      projectName: timeline?.projectName ?? "No Project",
      sequenceName: timeline?.sequenceName ?? "No Sequence",

      fps: 25,

      playhead: playhead?.seconds ?? 0,

      inPoint:
        inPoint?.seconds === -400000
          ? 0
          : (inPoint?.seconds ?? 0),

      outPoint:
        outPoint?.seconds === -400000
          ? 0
          : (outPoint?.seconds ?? 0),

      videoTracks: timeline?.videoTracks ?? 0,
      audioTracks: timeline?.audioTracks ?? 0,

      selectedClips: clips.map(c => c.name),

      markers: []
    };
  }
}
