import { TimelineSDK } from "../../../sdk/TimelineSDK";

export class TimelineReader {
  async getTimeline() {
    return await TimelineSDK.getTimeline();
  }

  async getSelectedClips() {
    return await TimelineSDK.getSelectedClips();
  }
}

export const timelineReader = new TimelineReader();
