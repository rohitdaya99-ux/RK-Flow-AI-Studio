export default class ToolRegistry {
  private tools = new Map<string, unknown>();

  register(name: string, tool: unknown) {
    this.tools.set(name, tool);
  }

  get(name: string) {
    return this.tools.get(name);
  }

  list() {
    return [...this.tools.keys()];
  }
}
