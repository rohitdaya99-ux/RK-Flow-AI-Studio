import AIChat from "../chat/AIChat";
import TaskPlanner from "../planner/TaskPlanner";
import TaskExecutor from "../executor/TaskExecutor";

export default class RKFlowAgent {

  private planner = new TaskPlanner();

  private executor = new TaskExecutor();

  private chat = new AIChat();

  async execute(
    prompt: string,
    onStream?: (text: string) => void
  ) {

    const tasks = await this.planner.create(prompt);

    if (tasks.length === 1 && tasks[0].action === "chat") {
      return this.chat.ask(
        prompt,
        onStream ?? (() => {})
      );
    }

    return this.executor.execute(tasks);

  }

  clearMemory() {
    this.chat.clear();
  }

}
