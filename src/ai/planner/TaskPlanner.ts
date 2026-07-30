export interface AgentTask {
  action: string;
  payload: unknown;
}

export default class TaskPlanner {

  async create(prompt: string): Promise<AgentTask[]> {

    const p = prompt.toLowerCase();

    if (/(instagram|reel)/.test(p))
      return [{ action: "instagramReel", payload: prompt }];

    if (/(highlight|film)/.test(p))
      return [{ action: "youtubeHighlight", payload: prompt }];

    if (/(teaser)/.test(p))
      return [{ action: "youtubeHighlight", payload: prompt }];

    if (/(export|render|4k)/.test(p))
      return [{ action: "master4K", payload: prompt }];

    if (/(save)/.test(p))
      return [{ action: "saveProject", payload: null }];

    if (/(transition)/.test(p))
      return [{ action: "transition", payload: "Cross Dissolve" }];

    if (/(marker)/.test(p))
      return [{ action: "marker", payload: "AI Marker" }];

    if (/(gap)/.test(p))
      return [{ action: "deleteGap", payload: null }];

    return [{ action: "chat", payload: prompt }];

  }

}
