import AIChat from "../chat/AIChat";
import TaskPlanner from "../planner/TaskPlanner";
import TaskExecutor from "../executor/TaskExecutor";
import ProjectContext from "../context/ProjectContext";

export default class RKFlowAgent {

  private planner = new TaskPlanner();

  private executor = new TaskExecutor();

  private chat = new AIChat();

  private context = new ProjectContext();

  async execute(
    prompt: string,
    onStream?: (text: string) => void
  ) {

    const ctx = await this.context.collect();

    const tasks = await this.planner.create(
      JSON.stringify(ctx) + "\n\n" + prompt
    );

    if (tasks.length === 1 && tasks[0].action === "chat") {

      return this.chat.ask(
        JSON.stringify(ctx) + "\n\n" + prompt,
        onStream ?? (() => {})
      );

    }

    return this.executor.execute(tasks);

  }

}
