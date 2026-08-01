import SelectionReader from "../readers/SelectionReader";

export default class MediaInspector {

  private readonly reader = new SelectionReader();

  async inspect() {
    const clips = await this.reader.read();

    return clips.map((clip: any) => ({
      name: clip.name ?? "Unknown",
      start: clip.start ?? 0,
      end: clip.end ?? 0,
      duration: clip.duration ?? 0
    }));
  }

}
