import { premiereAPI } from "../../PremiereAPI";

export class SequenceManager {
  async getActiveSequence() {
    return await premiereAPI.getActiveSequence();
  }

  async getTimelineContext() {
    return await premiereAPI.getTimelineContext();
  }

  async getVideoTrackCount() {
    const sequence = await this.getActiveSequence();

    if (!sequence) return 0;

    return await sequence.getVideoTrackCount();
  }

  async getAudioTrackCount() {
    const sequence = await this.getActiveSequence();

    if (!sequence) return 0;

    return await sequence.getAudioTrackCount();
  }
}

export const sequenceManager = new SequenceManager();
