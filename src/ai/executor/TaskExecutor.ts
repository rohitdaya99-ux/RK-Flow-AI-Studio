import ToolRegistry from "../tools/ToolRegistry";
import type { AgentTask } from "../planner/TaskPlanner";

export default class TaskExecutor {

  private tools = new ToolRegistry();

  async execute(tasks: AgentTask[]) {

    const results = [];

    for (const task of tasks) {

      switch (task.action) {

        case "weddingFilm":
          results.push(await this.tools.workflow.autoWeddingFilm());
          break;

        case "weddingHighlight":
          results.push(await this.tools.workflow.autoWeddingHighlight());
          break;

        case "instagramReel":
          results.push(await this.tools.workflow.autoInstagramReel());
          break;

        case "youtubeShort":
          results.push(await this.tools.workflow.autoYoutubeShort());
          break;

        case "babyShower":
          results.push(await this.tools.workflow.autoBabyShower());
          break;

        case "preWedding":
          results.push(await this.tools.workflow.autoPreWedding());
          break;

        case "saveTheDate":
          results.push(await this.tools.workflow.autoSaveTheDate());
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
