import { premiereAPI } from "../../services/PremiereAPI";

export default class PremiereBridgeActions {

  async getProject() {
    return await premiereAPI.getProjectInfo();
  }

  async getActiveSequence() {
    return await premiereAPI.getActiveSequence();
  }

  async getSelectedClips() {
    const ctx = await premiereAPI.getTimelineContext();
    return ctx?.selection ?? [];
  }

  async getTimeline() {
    return await premiereAPI.getTimelineContext();
  }

  async getPlayhead() {
    return null;
  }

}
