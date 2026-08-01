import RuntimeContext from "../../premiere/runtime/RuntimeContext";

export default class PremiereRuntimeProvider {

  private runtime = new RuntimeContext();

  async getContext() {
    return await this.runtime.snapshot();
  }

}
