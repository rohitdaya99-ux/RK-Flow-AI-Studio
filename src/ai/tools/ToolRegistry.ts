import TimelineActions from "../actions/TimelineActions";
import SequenceActions from "../actions/SequenceActions";
import ProjectActions from "../actions/ProjectActions";
import MediaActions from "../actions/MediaActions";
import ExportActions from "../actions/ExportActions";

export default class ToolRegistry {

  timeline = new TimelineActions();

  sequence = new SequenceActions();

  project = new ProjectActions();

  media = new MediaActions();

  export = new ExportActions();

}
