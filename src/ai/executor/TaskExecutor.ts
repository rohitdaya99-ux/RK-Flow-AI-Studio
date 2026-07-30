import ToolRegistry from "../tools/ToolRegistry";
import type { AgentTask } from "../planner/TaskPlanner";

export default class TaskExecutor {

  private tools = new ToolRegistry();

  async execute(tasks: AgentTask[]) {

    const results = [];

    for (const task of tasks) {

      switch (task.action) {

        case "autoSequence":
          results.push(await this.tools.premiere.autoSequence());
          break;

        case "multicamSync":
          results.push(await this.tools.premiere.multicamSync());
          break;

        case "speechToText":
          results.push(await this.tools.premiere.speechToText());
          break;

        case "autoSubtitles":
          results.push(await this.tools.premiere.autoSubtitles());
          break;

        case "smartProxy":
          results.push(await this.tools.premiere.smartProxy());
          break;

        case "detectDuplicateShots":
          results.push(await this.tools.premiere.detectDuplicateShots());
          break;

        case "autoProjectCleanup":
          results.push(await this.tools.premiere.autoProjectCleanup());
          break;

        case "smartRelink":
          results.push(await this.tools.premiere.smartRelink());
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
