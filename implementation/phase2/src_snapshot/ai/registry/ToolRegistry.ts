import { AITool } from "../tools/AITool";

export class ToolRegistry {
  private readonly tools = new Map<string, AITool>();

  register(tool: AITool): void {
    this.tools.set(tool.name, tool);
  }

  get(name: string): AITool | undefined {
    return this.tools.get(name);
  }

  list(): string[] {
    return [...this.tools.keys()];
  }
}
