export interface AgentTask {
  action: string;
  payload: unknown;
}

export default class TaskPlanner {

  async create(prompt: string): Promise<AgentTask[]> {

    const p = prompt.toLowerCase();

    if (/(music|song|audio)/.test(p))
      return [{ action: "analyzeMusic", payload: null }];

    if (/(beat|bpm)/.test(p))
      return [{ action: "detectBeat", payload: null }];

    if (/(drop)/.test(p))
      return [{ action: "detectDrops", payload: null }];

    if (/(chorus|hook)/.test(p))
      return [{ action: "detectChorus", payload: null }];

    if (/(sync|beat sync)/.test(p))
      return [{ action: "autoBeatSync", payload: null }];

    return [{ action: "chat", payload: prompt }];

  }

}
