import PremiereContextBuilder from "../context/PremiereContextBuilder";

export default class TimelineAnalyzer {

  private builder = new PremiereContextBuilder();

  async analyze() {

    const context = await this.builder.build();

    if (!context)
      return null;

    return {
      project: context.projectName,
      sequence: context.sequence?.name,
      clips: context.selectedClips.length,
      tracks:
        (context.sequence?.videoTracks ?? 0) +
        (context.sequence?.audioTracks ?? 0)
    };
  }

}
