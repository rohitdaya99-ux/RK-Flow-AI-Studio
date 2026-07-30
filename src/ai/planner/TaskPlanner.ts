export interface AgentTask {
  action: string;
  payload: unknown;
}

export default class TaskPlanner {

  async create(prompt: string): Promise<AgentTask[]> {

    const p = prompt.toLowerCase();

    if (p.includes("face"))
      return [{ action: "detectFaces", payload: null }];

    if (p.includes("smile"))
      return [{ action: "detectSmile", payload: null }];

    if (p.includes("blur"))
      return [{ action: "detectBlur", payload: null }];

    if (p.includes("closed eye"))
      return [{ action: "detectClosedEyes", payload: null }];

    if (p.includes("best"))
      return [{ action: "detectBestMoments", payload: null }];

    if (p.includes("emotion"))
      return [{ action: "detectEmotion", payload: null }];

    return [{ action: "chat", payload: prompt }];

  }

}
