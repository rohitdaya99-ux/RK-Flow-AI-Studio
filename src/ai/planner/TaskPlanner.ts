export interface AgentTask {
  action: string;
  payload: unknown;
}

export default class TaskPlanner {

  async create(prompt: string): Promise<AgentTask[]> {

    const p = prompt.toLowerCase();

    if (/(auto sequence|sequence builder)/.test(p))
      return [{ action: "autoSequence", payload: null }];

    if (/(multicam|multi cam)/.test(p))
      return [{ action: "multicamSync", payload: null }];

    if (/(speech to text|transcribe)/.test(p))
      return [{ action: "speechToText", payload: null }];

    if (/(subtitle|captions)/.test(p))
      return [{ action: "autoSubtitles", payload: null }];

    if (/(proxy)/.test(p))
      return [{ action: "smartProxy", payload: null }];

    if (/(duplicate shot|duplicate clip)/.test(p))
      return [{ action: "detectDuplicateShots", payload: null }];

    if (/(cleanup project|project cleanup)/.test(p))
      return [{ action: "autoProjectCleanup", payload: null }];

    if (/(relink|missing media)/.test(p))
      return [{ action: "smartRelink", payload: null }];

    return [{ action: "chat", payload: prompt }];

  }

}
