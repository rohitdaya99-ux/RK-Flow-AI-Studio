import { SequenceInfo } from "../types/PremiereTypes";

export class SequenceReader {
  async read(): Promise<SequenceInfo> {
    return {
      id: "",
      name: "",
      fps: 25,
      duration: 0
    };
  }
}
