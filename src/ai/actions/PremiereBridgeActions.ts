import { PremiereAPI } from "../../services/PremiereAPI";

export default class PremiereBridgeActions {

  async getProject() {
    return await PremiereAPI.getProjectInfo();
  }

  async getActiveSequence() {
    return await PremiereAPI.getActiveSequence();
  }

  async getSelectedClips() {
    return await PremiereAPI.getSelectedClips();
  }

  async getTimeline() {
    return await PremiereAPI.getTimeline();
  }

  async getPlayhead() {
    return await PremiereAPI.getPlayheadPosition();
  }

}
