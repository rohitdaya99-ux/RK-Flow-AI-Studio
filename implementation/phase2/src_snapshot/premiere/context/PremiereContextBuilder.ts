import SequenceReader from "../readers/SequenceReader";
import SelectionReader from "../readers/SelectionReader";

export default class PremiereContextBuilder {

  private sequence = new SequenceReader();
  private selection = new SelectionReader();

  async build() {

    const project = await import("../../services/PremiereAPI");

    const info = await project.premiereAPI.getTimelineContext();

    if (!info)
      return null;

    return {
      projectName: info.projectName,
      sequence: await this.sequence.read(),
      selectedClips: await this.selection.read()
    };
  }

}
