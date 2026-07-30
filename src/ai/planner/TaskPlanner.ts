export interface AgentTask {
  action: string;
  payload: unknown;
}

export default class TaskPlanner {
  async create(prompt: string): Promise<AgentTask[]> {
    return [
      {
        action: "chat",
        payload: prompt
      }
    ];
  }
}
