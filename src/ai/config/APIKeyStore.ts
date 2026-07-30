export type ProviderKeys = {
  gemini?: string;
  openai?: string;
  claude?: string;
  grok?: string;
  kimi?: string;
};

export class APIKeyStore {
  private static keys: ProviderKeys = {};

  static set(provider: keyof ProviderKeys, key: string): void {
    this.keys[provider] = key;
  }

  static get(provider: keyof ProviderKeys): string {
    return this.keys[provider] ?? "";
  }

  static has(provider: keyof ProviderKeys): boolean {
    return (this.keys[provider] ?? "").length > 0;
  }

  static clear(provider: keyof ProviderKeys): void {
    delete this.keys[provider];
  }

  static clearAll(): void {
    this.keys = {};
  }
}
