import TimelineSDK from "../../sdk/TimelineSDK";

export default class TimelineBridge {

  private sdk = new TimelineSDK();

  async read() {

    return {
      timeline: await this.sdk.getTimeline?.(),
      selection: await this.sdk.getSelection?.(),
      playhead: await this.sdk.getPlayhead?.(),
      tracks: await this.sdk.getTracks?.()
    };

  }

}
