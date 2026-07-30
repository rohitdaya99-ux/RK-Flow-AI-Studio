import ToolRegistry from "../tools/ToolRegistry";
import type { AgentTask } from "../planner/TaskPlanner";

export default class TaskExecutor {

  private tools = new ToolRegistry();

  async execute(tasks: AgentTask[]) {

    const results = [];

    for (const task of tasks) {

      switch (task.action) {

        case "autoClipSelection":
          results.push(await this.tools.ai.autoClipSelection());
          break;

        case "autoFaceGrouping":
          results.push(await this.tools.ai.autoFaceGrouping());
          break;

        case "autoSceneDetection":
          results.push(await this.tools.ai.autoSceneDetection());
          break;

        case "autoColorMatch":
          results.push(await this.tools.ai.autoColorMatch());
          break;

        case "autoAudioCleanup":
          results.push(await this.tools.ai.autoAudioCleanup());
          break;

        case "autoCaption":
          results.push(await this.tools.ai.autoCaption());
          break;

        case "autoBrollSuggestion":
          results.push(await this.tools.ai.autoBrollSuggestion());
          break;

        case "autoStoryBuilder":
          results.push(await this.tools.ai.autoStoryBuilder());
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
