export interface AgentTask {
  action: string;
  payload: unknown;
}

export default class TaskPlanner {

  async create(prompt: string): Promise<AgentTask[]> {

    const p = prompt.toLowerCase();

    if (/(think|analyze)/.test(p))
      return [{ action: "think", payload: prompt }];

    if (/(plan)/.test(p))
      return [{ action: "plan", payload: prompt }];

    if (/(execute|run)/.test(p))
      return [{ action: "execute", payload: prompt }];

    if (/(summary|summarize)/.test(p))
      return [{ action: "summarize", payload: null }];

    if (/(explain|why)/.test(p))
      return [{ action: "explain", payload: null }];

    return [{ action: "chat", payload: prompt }];

  }

}
