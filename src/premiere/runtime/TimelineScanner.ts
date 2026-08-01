import { premiereAPI } from "../../services/PremiereAPI";
import { ClipSnapshot } from "./ClipSnapshot";

export default class TimelineScanner {

  async scan(): Promise<ClipSnapshot[]> {

    const ctx = await premiereAPI.getTimelineContext();

    if (!ctx) {
      return [];
    }

    const selection = Array.isArray(ctx.selection) ? ctx.selection : [];

    return selection.map((clip: any, index: number) => ({
      id: String(index),
      name: clip?.name ?? `Clip ${index + 1}`,
      track: clip?.trackIndex ?? 0,
      type: clip?.mediaType === "audio" ? "audio" : "video",
      inPoint: clip?.inPoint,
      outPoint: clip?.outPoint,
      duration: clip?.duration,
      selected: true
    }));

  }

}
