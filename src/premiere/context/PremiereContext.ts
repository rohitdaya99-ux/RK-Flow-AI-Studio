import TimelineReader from "../readers/TimelineReader";

export class PremiereContext {
  private readonly reader = new TimelineReader();

  async build() {
    return await this.reader.read();
  }
}
