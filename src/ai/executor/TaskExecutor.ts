import type { AgentTask } from "../planner/TaskPlanner";

export default class TaskExecutor {
  async execute(tasks: AgentTask[]) {
    const results = [];

    for (const task of tasks) {
      results.push({
        action: task.action,
        success: true,
        payload: task.payload
      });
    }

    return results;
  }
}
