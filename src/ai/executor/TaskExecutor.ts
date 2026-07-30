import ToolRegistry from "../tools/ToolRegistry";
import type { AgentTask } from "../planner/TaskPlanner";

export default class TaskExecutor {

  private tools = new ToolRegistry();

  async execute(tasks: AgentTask[]) {

    const results = [];

    for (const task of tasks) {

      switch (task.action) {

        case "brideEntry":
          results.push(await this.tools.wedding.brideEntry());
          break;

        case "groomEntry":
          results.push(await this.tools.wedding.groomEntry());
          break;

        case "haldi":
          results.push(await this.tools.wedding.haldi());
          break;

        case "mehndi":
          results.push(await this.tools.wedding.mehndi());
          break;

        case "sangeet":
          results.push(await this.tools.wedding.sangeet());
          break;

        case "baraat":
          results.push(await this.tools.wedding.baraat());
          break;

        case "varmala":
          results.push(await this.tools.wedding.varmala());
          break;

        case "pheras":
          results.push(await this.tools.wedding.pheras());
          break;

        case "reception":
          results.push(await this.tools.wedding.reception());
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
