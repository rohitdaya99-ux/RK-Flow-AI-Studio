export default class Pipeline {

  private steps: Array<() => Promise<void>> = [];

  add(step: () => Promise<void>) {
    this.steps.push(step);
  }

  async run() {
    for (const step of this.steps) {
      await step();
    }
  }

}
