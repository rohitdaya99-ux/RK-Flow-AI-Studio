import EventBus from "../eventsystem/EventBus";
import Pipeline from "../pipeline/Pipeline";
import JobQueue from "../jobs/JobQueue";

export default class PremiereBootstrap {

  readonly events = new EventBus();
  readonly pipeline = new Pipeline();
  readonly jobs = new JobQueue();

}
