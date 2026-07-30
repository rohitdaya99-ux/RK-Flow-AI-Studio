import { premiereAPI } from "../../services/PremiereAPI";

export default class PremiereActions {

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

  async position(x:number,y:number) {
    return premiereAPI.setPosition(x,y);
  }

}
