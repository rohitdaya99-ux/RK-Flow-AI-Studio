import { premiereAPI } from "../../services/PremiereAPI";

export default class EffectReader {
  async readSelectionEffects() {
    const ctx = await premiereAPI.getTimelineContext();

    if (!ctx)
      return [];

    return ctx.selection ?? [];
  }
}
