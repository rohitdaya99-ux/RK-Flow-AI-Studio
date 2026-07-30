export interface AgentTask {
  action: string;
  payload: unknown;
}

export default class TaskPlanner {

  async create(prompt: string): Promise<AgentTask[]> {

    const p = prompt.toLowerCase();

    if (/\bundo\b/.test(p))
      return [{ action: "undo", payload: null }];

    if (/\bredo\b/.test(p))
      return [{ action: "redo", payload: null }];

    if (/save as/.test(p))
      return [{ action: "saveAs", payload: null }];

    if (/\bsave\b/.test(p))
      return [{ action: "save", payload: null }];

    if (/close project/.test(p))
      return [{ action: "closeProject", payload: null }];

    if (/render/.test(p))
      return [{ action: "renderInToOut", payload: null }];

    if (/export/.test(p))
      return [{ action: "exportMedia", payload: null }];

    return [{ action: "chat", payload: prompt }];

  }

}
