import { premiereAPI } from "../../services/PremiereAPI";
import ProjectReader from "../readers/ProjectReader";
import SequenceReader from "../readers/SequenceReader";
import SelectionReader from "../readers/SelectionReader";
import TimelineReader from "../readers/TimelineReader";

export default class PremiereActions {

  private project = new ProjectReader();
  private sequence = new SequenceReader();
  private selection = new SelectionReader();
  private timeline = new TimelineReader();

  async getProject() {
    return this.project.read();
  }

  async getSequence() {
    return this.sequence.read();
  }

  async getSelection() {
    return this.selection.read();
  }

  async getTimeline() {
    return this.timeline.read();
  }

  async center() {
    return premiereAPI.center();
  }

  async left() {
    return premiereAPI.left();
  }

  async right() {
    return premiereAPI.right();
  }

  async top() {
    return premiereAPI.top();
  }

  async bottom() {
    return premiereAPI.bottom();
  }

  async position(x:number,y:number) {
    return premiereAPI.setPosition(x,y);
  }

}
