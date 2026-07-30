import TimelineActions from "../actions/TimelineActions";
import SequenceActions from "../actions/SequenceActions";
import ProjectActions from "../actions/ProjectActions";
import MediaActions from "../actions/MediaActions";
import ExportActions from "../actions/ExportActions";
import EditActions from "../actions/EditActions";
import WeddingActions from "../actions/WeddingActions";
import AnalysisActions from "../actions/AnalysisActions";
import MusicActions from "../actions/MusicActions";
import WorkflowActions from "../actions/WorkflowActions";
import AIActions from "../actions/AIActions";
import PremiereAIActions from "../actions/PremiereAIActions";
import CommandActions from "../actions/CommandActions";
import AgentActions from "../actions/AgentActions";

export default class ToolRegistry {

  timeline = new TimelineActions();
  sequence = new SequenceActions();
  project = new ProjectActions();
  media = new MediaActions();
  export = new ExportActions();
  edit = new EditActions();
  wedding = new WeddingActions();
  analysis = new AnalysisActions();
  music = new MusicActions();
  workflow = new WorkflowActions();
  ai = new AIActions();
  premiere = new PremiereAIActions();
  command = new CommandActions();
  agent = new AgentActions();

}
