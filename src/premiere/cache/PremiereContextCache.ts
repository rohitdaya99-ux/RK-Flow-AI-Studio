import { PremiereContext } from "../models/PremiereContext";

export default class PremiereContextCache {
  private cache: PremiereContext | null = null;

  get() {
    return this.cache;
  }

  set(data: PremiereContext) {
    this.cache = data;
  }

  clear() {
    this.cache = null;
  }
}
