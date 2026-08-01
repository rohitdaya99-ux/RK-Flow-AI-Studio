import ToolRegistry from "../tools/ToolRegistry";
import type { AgentTask } from "../planner/TaskPlanner";

export default class TaskExecutor {

  private tools = new ToolRegistry();

  async execute(tasks: AgentTask[]) {

    const results = [];

    for (const task of tasks) {

      switch (task.action) {

        case "think":
          results.push(await this.tools.agent.think(String(task.payload)));
          break;

        case "plan":
          results.push(await this.tools.agent.plan(String(task.payload)));
          break;

        case "execute":
          results.push(await this.tools.agent.execute(String(task.payload)));
          break;

        case "summarize":
          results.push(await this.tools.agent.summarize());
          break;

        case "explain":
          results.push(await this.tools.agent.explain());
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
