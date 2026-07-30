import {
  EmptyPremiereContext,
  PremiereContext
} from "./PremiereContext";

export class PremiereContextManager {
  private static context: PremiereContext = {
    ...EmptyPremiereContext
  };

  static get(): PremiereContext {
    return this.context;
  }

  static update(
    data: Partial<PremiereContext>
  ): PremiereContext {
    this.context = {
      ...this.context,
      ...data
    };

    return this.context;
  }

  static reset(): void {
    this.context = {
      ...EmptyPremiereContext
    };
  }
}
