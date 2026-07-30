export default class SequenceActions {

  async create(name: string) {
    return { success: true, sequence: name };
  }

  async duplicate(name: string) {
    return { success: true };
  }

  async open(name: string) {
    return { success: true };
  }

  async close(name: string) {
    return { success: true };
  }

}
