import ToolRegistry from "../tools/ToolRegistry";
import type { AgentTask } from "../planner/TaskPlanner";

export default class TaskExecutor {

  private tools = new ToolRegistry();

  async execute(tasks: AgentTask[]) {

    const results = [];

    for (const task of tasks) {

      switch (task.action) {

        case "instagramReel":
          results.push(await this.tools.export.instagramReel());
          break;

        case "youtubeHighlight":
          results.push(await this.tools.export.youtubeHighlight());
          break;

        case "master4K":
          results.push(await this.tools.export.master4K());
          break;

        case "transition":
          results.push(await this.tools.timeline.applyTransition(String(task.payload)));
          break;

        case "marker":
          results.push(await this.tools.timeline.addMarker(String(task.payload)));
          break;

        case "trim":
          results.push(await this.tools.timeline.trimSelectedClips());
          break;

        case "deleteGap":
          results.push(await this.tools.timeline.deleteGaps());
          break;

        case "rippleDelete":
          results.push(await this.tools.timeline.rippleDelete());
          break;

        case "saveProject":
          results.push(await this.tools.project.save());
          break;

        default:
          results.push({
            success: true,
            action: task.action,
            payload: task.payload
          });

      }

    }

    return results;

  }

}
