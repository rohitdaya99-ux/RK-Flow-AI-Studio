import { TimelineReader } from "../readers/TimelineReader";

export class PremiereContext {
  private reader = new TimelineReader();

  async build() {
    return this.reader.read();
  }
}
