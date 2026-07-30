export interface AgentTask {
  action: string;
  payload: unknown;
}

export default class TaskPlanner {

  async create(prompt: string): Promise<AgentTask[]> {

    const p = prompt.toLowerCase();

    if (/(wedding film)/.test(p))
      return [{ action: "weddingFilm", payload: null }];

    if (/(wedding highlight|highlight film)/.test(p))
      return [{ action: "weddingHighlight", payload: null }];

    if (/(instagram reel)/.test(p))
      return [{ action: "instagramReel", payload: null }];

    if (/(youtube short|yt short)/.test(p))
      return [{ action: "youtubeShort", payload: null }];

    if (/(baby shower)/.test(p))
      return [{ action: "babyShower", payload: null }];

    if (/(pre wedding)/.test(p))
      return [{ action: "preWedding", payload: null }];

    if (/(save the date)/.test(p))
      return [{ action: "saveTheDate", payload: null }];

    return [{ action: "chat", payload: prompt }];

  }

}
