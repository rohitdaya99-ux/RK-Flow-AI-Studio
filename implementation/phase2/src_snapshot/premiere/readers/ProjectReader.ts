import { premiereAPI } from "../../services/PremiereAPI";

export default class ProjectReader {
  async read() {
    return await premiereAPI.getProjectInfo();
  }
}
