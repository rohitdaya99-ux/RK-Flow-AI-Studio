import { premiereAPI } from "../../services/PremiereAPI";

export default class SelectionReader {
  async read() {
    const ctx = await premiereAPI.getTimelineContext();
    return ctx?.selection ?? [];
  }
}
