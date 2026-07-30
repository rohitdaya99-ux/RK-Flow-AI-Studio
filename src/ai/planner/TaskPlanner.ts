export interface AgentTask {
  action: string;
  payload: unknown;
}

export default class TaskPlanner {

  async create(prompt: string): Promise<AgentTask[]> {

    const p = prompt.toLowerCase();

    if (/(best clip|best shot|clip selection)/.test(p))
      return [{ action: "autoClipSelection", payload: null }];

    if (/(face group|group faces)/.test(p))
      return [{ action: "autoFaceGrouping", payload: null }];

    if (/(scene detect|scene detection)/.test(p))
      return [{ action: "autoSceneDetection", payload: null }];

    if (/(color match)/.test(p))
      return [{ action: "autoColorMatch", payload: null }];

    if (/(audio cleanup|noise)/.test(p))
      return [{ action: "autoAudioCleanup", payload: null }];

    if (/(caption|subtitle)/.test(p))
      return [{ action: "autoCaption", payload: null }];

    if (/(broll|b-roll)/.test(p))
      return [{ action: "autoBrollSuggestion", payload: null }];

    if (/(story|storyline)/.test(p))
      return [{ action: "autoStoryBuilder", payload: null }];

    return [{ action: "chat", payload: prompt }];

  }

}
