import ToolRegistry from "../tools/ToolRegistry";
import type { AgentTask } from "../planner/TaskPlanner";

export default class TaskExecutor {

  private tools = new ToolRegistry();

  async execute(tasks: AgentTask[]) {

    const results = [];

    for (const task of tasks) {

      switch (task.action) {

        case "detectFaces":
          results.push(await this.tools.analysis.detectFaces());
          break;

        case "detectSmile":
          results.push(await this.tools.analysis.detectSmile());
          break;

        case "detectBlur":
          results.push(await this.tools.analysis.detectBlur());
          break;

        case "detectClosedEyes":
          results.push(await this.tools.analysis.detectClosedEyes());
          break;

        case "detectBestMoments":
          results.push(await this.tools.analysis.detectBestMoments());
          break;

        case "detectEmotion":
          results.push(await this.tools.analysis.detectEmotion());
          break;

        default:
          results.push({
            success: true,
            action: task.action
          });

      }

    }

    return results;

  }

}
