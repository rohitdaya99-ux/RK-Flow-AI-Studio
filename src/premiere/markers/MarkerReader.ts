import { premiereAPI } from "../../services/PremiereAPI";

export default class MarkerReader {
  async read() {
    const sequence = await premiereAPI.getActiveSequence();

    if (!sequence || typeof sequence.getMarkers !== "function")
      return [];

    return await sequence.getMarkers();
  }
}
