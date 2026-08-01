import { TimelineState } from "../types/PremiereTypes";

export class PremiereCache {
  private cache?: TimelineState;

  set(state: TimelineState) {
    this.cache = state;
  }

  get() {
    return this.cache;
  }

  clear() {
    this.cache = undefined;
  }
}
