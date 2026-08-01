export default class AgentActions {

  async think(prompt: string) {
    return {
      success: true,
      type: "thinking",
      prompt
    };
  }

  async plan(goal: string) {
    return {
      success: true,
      type: "plan",
      goal
    };
  }

  async execute(task: string) {
    return {
      success: true,
      type: "execute",
      task
    };
  }

  async summarize() {
    return {
      success: true,
      type: "summary"
    };
  }

  async explain() {
    return {
      success: true,
      type: "explanation"
    };
  }

}
