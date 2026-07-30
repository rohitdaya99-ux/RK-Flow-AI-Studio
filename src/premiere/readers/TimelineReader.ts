import { premiereAPI } from "../../services/PremiereAPI";

export default class TimelineReader {
  async read() {
    return await premiereAPI.getTimelineContext();
  }
}
