import { ProviderId } from "../providers/ProviderFactory";

export class ProviderSettings {
  private static provider: ProviderId = "gemini";

  static getProvider(): ProviderId {
    return this.provider;
  }

  static setProvider(provider: ProviderId): void {
    this.provider = provider;
  }
}
