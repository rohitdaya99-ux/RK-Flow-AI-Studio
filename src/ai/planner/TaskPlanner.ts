export interface AgentTask {
  action: string;
  payload: unknown;
}

export default class TaskPlanner {

  async create(prompt: string): Promise<AgentTask[]> {

    const p = prompt.toLowerCase();

    if (p.includes("bride"))
      return [{ action: "brideEntry", payload: null }];

    if (p.includes("groom"))
      return [{ action: "groomEntry", payload: null }];

    if (p.includes("haldi"))
      return [{ action: "haldi", payload: null }];

    if (p.includes("mehndi"))
      return [{ action: "mehndi", payload: null }];

    if (p.includes("sangeet"))
      return [{ action: "sangeet", payload: null }];

    if (p.includes("baraat"))
      return [{ action: "baraat", payload: null }];

    if (p.includes("varmala"))
      return [{ action: "varmala", payload: null }];

    if (p.includes("phera"))
      return [{ action: "pheras", payload: null }];

    if (p.includes("reception"))
      return [{ action: "reception", payload: null }];

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

    return [{ action: "chat", payload: prompt }];

  }

}
