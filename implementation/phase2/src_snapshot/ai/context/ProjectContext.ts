import PremiereBridgeActions from "../actions/PremiereBridgeActions";

export default class ProjectContext {

  private bridge = new PremiereBridgeActions();

  async collect() {

    return {

      project: await this.bridge.getProject(),

      sequence: await this.bridge.getActiveSequence(),

      timeline: await this.bridge.getTimeline(),

      selectedClips: await this.bridge.getSelectedClips(),

      playhead: await this.bridge.getPlayhead()

    };

  }

}
