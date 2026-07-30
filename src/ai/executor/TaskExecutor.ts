import type { AgentTask } from "../planner/TaskPlanner";
import ToolRegistry from "../tools/ToolRegistry";

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

        case "saveProject":
          results.push(await this.tools.project.save());
          break;

        default:
          results.push({
            success: true,
            message: task.payload
          });

      }

    }

    return results;

  }

}
