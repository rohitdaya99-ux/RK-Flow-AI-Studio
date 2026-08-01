import TimelineScanner from "../../premiere/runtime/TimelineScanner";

export default class ClipContextProvider {

  private scanner = new TimelineScanner();

  async getClips() {
    return this.scanner.scan();
  }

}
