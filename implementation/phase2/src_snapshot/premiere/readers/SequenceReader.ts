import { premiereAPI } from "../../services/PremiereAPI";

export default class SequenceReader {
  async read() {
    return await premiereAPI.getActiveSequence();
  }
}
