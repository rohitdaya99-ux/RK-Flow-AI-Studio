import TimelineBridge from "../runtime/TimelineBridge";

export default class TimelineActions {

  private bridge = new TimelineBridge();

  async readTimeline() {
    return this.bridge.read();
  }

}
