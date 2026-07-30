import ToolRegistry from "../tools/ToolRegistry";
import type { AgentTask } from "../planner/TaskPlanner";

export default class TaskExecutor {

  private tools = new ToolRegistry();

  async execute(tasks: AgentTask[]) {

    const results = [];

    for (const task of tasks) {

      switch (task.action) {

        case "analyzeMusic":
          results.push(await this.tools.music.analyzeMusic());
          break;

        case "detectBeat":
          results.push(await this.tools.music.detectBeat());
          break;

        case "detectDrops":
          results.push(await this.tools.music.detectDrops());
          break;

        case "detectChorus":
          results.push(await this.tools.music.detectChorus());
          break;

        case "autoBeatSync":
          results.push(await this.tools.music.autoBeatSync());
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
