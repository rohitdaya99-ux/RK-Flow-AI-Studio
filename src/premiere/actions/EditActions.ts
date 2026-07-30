import { premiereAPI } from "../../services/PremiereAPI";

export default class EditActions {

  async trimSelected() {
    const ctx = await premiereAPI.getTimelineContext();
    return { success: true, selection: ctx?.selection ?? [] };
  }

  async razorAtPlayhead() {
    return { success: true };
  }

  async rippleDelete() {
    return { success: true };
  }

  async addTransition(type = "Cross Dissolve") {
    return { success: true, type };
  }

  async addAudioFade() {
    return { success: true };
  }

}
