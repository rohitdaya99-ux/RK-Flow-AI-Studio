import ClipContextProvider from "../context/ClipContextProvider";

export default class RKTimelineService {

  private clips = new ClipContextProvider();

  async summarize() {

    const data = await this.clips.getClips();

    return {
      clipCount: data.length,
      clips: data
    };

  }

}
