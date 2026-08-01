import { premiereAPI } from "../../services/PremiereAPI";

export default class PremiereCommand {

  async center() {
    return premiereAPI.center();
  }

  async left() {
    return premiereAPI.left();
  }

  async right() {
    return premiereAPI.right();
  }

  async top() {
    return premiereAPI.top();
  }

  async bottom() {
    return premiereAPI.bottom();
  }

}
