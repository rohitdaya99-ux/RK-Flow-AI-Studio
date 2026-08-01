export default class UndoManager {

  private stack: string[] = [];

  push(action: string) {
    this.stack.push(action);
  }

  undo() {
    return this.stack.pop() ?? null;
  }

  clear() {
    this.stack = [];
  }

  size() {
    return this.stack.length;
  }

}
