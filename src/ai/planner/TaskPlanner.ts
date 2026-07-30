export interface AgentTask {
  action: string;
  payload: unknown;
}

export default class TaskPlanner {

  async create(prompt: string): Promise<AgentTask[]> {

    const p = prompt.toLowerCase();

    if (p.includes("wedding reel"))
      return [{ action: "weddingReel", payload: null }];

    if (p.includes("highlight"))
      return [{ action: "highlightFilm", payload: null }];

    if (p.includes("teaser"))
      return [{ action: "teaser", payload: null }];

    if (p.includes("short"))
      return [{ action: "shorts", payload: null }];

    if (p.includes("beat"))
      return [{ action: "beatSync", payload: null }];

    if (p.includes("instagram"))
      return [{ action: "instagramReel", payload: null }];

    if (p.includes("export"))
      return [{ action: "master4K", payload: null }];

    if (p.includes("transition"))
      return [{ action: "transition", payload: "Cross Dissolve" }];

    if (p.includes("marker"))
      return [{ action: "marker", payload: "RK Flow Marker" }];

    if (p.includes("trim"))
      return [{ action: "trim", payload: null }];

    if (p.includes("gap"))
      return [{ action: "deleteGap", payload: null }];

    if (p.includes("ripple"))
      return [{ action: "rippleDelete", payload: null }];

    if (p.includes("save"))
      return [{ action: "saveProject", payload: null }];

    return [{ action: "chat", payload: prompt }];

  }

}
