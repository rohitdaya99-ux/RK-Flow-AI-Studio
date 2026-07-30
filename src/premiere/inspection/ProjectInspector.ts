import { premiereAPI } from "../../services/PremiereAPI";

export default class ProjectInspector {

  async inspect() {
    return await premiereAPI.getProjectInfo();
  }

}
