export default class CommandActions {

  async undo() {
    return { success: true, command: "Undo" };
  }

  async redo() {
    return { success: true, command: "Redo" };
  }

  async save() {
    return { success: true, command: "Save" };
  }

  async saveAs() {
    return { success: true, command: "Save As" };
  }

  async closeProject() {
    return { success: true, command: "Close Project" };
  }

  async renderInToOut() {
    return { success: true, command: "Render In To Out" };
  }

  async exportMedia() {
    return { success: true, command: "Export Media" };
  }

}
