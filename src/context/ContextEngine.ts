import { TimelineProvider } from "./providers/TimelineProvider";
import { UserContextProvider } from "./providers/UserContextProvider";
import { ProjectContext } from "./types/ContextTypes";

export class ContextEngine {
  private timeline = new TimelineProvider();
  private user = new UserContextProvider();

  async build(prompt: string): Promise<ProjectContext> {
    return {
      timeline: await this.timeline.getContext(),
      user: this.user.getContext(prompt)
    };
  }
}
