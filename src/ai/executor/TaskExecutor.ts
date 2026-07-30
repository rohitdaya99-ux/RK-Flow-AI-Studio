import ToolRegistry from "../tools/ToolRegistry";
import type { AgentTask } from "../planner/TaskPlanner";

export default class TaskExecutor {

  private tools = new ToolRegistry();

  async execute(tasks: AgentTask[]) {

    const results = [];

    for (const task of tasks) {

      switch (task.action) {

        case "undo":
          results.push(await this.tools.command.undo());
          break;

        case "redo":
          results.push(await this.tools.command.redo());
          break;

        case "save":
          results.push(await this.tools.command.save());
          break;

        case "saveAs":
          results.push(await this.tools.command.saveAs());
          break;

        case "closeProject":
          results.push(await this.tools.command.closeProject());
          break;

        case "renderInToOut":
          results.push(await this.tools.command.renderInToOut());
          break;

        case "exportMedia":
          results.push(await this.tools.command.exportMedia());
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
