export default class ProjectActions {

  async save() {
    return { success: true };
  }

  async importMedia(files: string[]) {
    return {
      success: true,
      imported: files.length
    };
  }

  async organizeBins() {
    return { success: true };
  }

}
