export interface AgentTask {
  action: string;
  payload: unknown;
}

export default class TaskPlanner {

  async create(prompt: string): Promise<AgentTask[]> {

    const p = prompt.toLowerCase();

    if (p.includes("reel")) {
      return [{
        action: "instagramReel",
        payload: prompt
      }];
    }

    if (p.includes("highlight")) {
      return [{
        action: "youtubeHighlight",
        payload: prompt
      }];
    }

    if (p.includes("export")) {
      return [{
        action: "master4K",
        payload: prompt
      }];
    }

    if (p.includes("save")) {
      return [{
        action: "saveProject",
        payload: null
      }];
    }

    return [{
      action: "chat",
      payload: prompt
    }];
  }

}
