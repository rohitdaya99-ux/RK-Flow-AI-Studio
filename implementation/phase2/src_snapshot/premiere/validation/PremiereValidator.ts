import { premiereAPI } from "../../services/PremiereAPI";

export default class PremiereValidator{

  async validate(){

    const seq = await premiereAPI.getActiveSequence();

    return seq !== null;

  }

}
