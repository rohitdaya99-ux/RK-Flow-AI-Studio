export type ProviderKeys = {
  gemini?: string;
  chatgpt?: string;
  claude?: string;
  grok?: string;
  kimi?: string;
  ollama?: string;
};

export class APIKeyStore {
  static set(provider: keyof ProviderKeys, key: string): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(`rkflow.${provider}.apiKey`, key.trim());
  }

  static get(provider: keyof ProviderKeys): string {
    if (typeof window === "undefined") {
      return "";
    }

    return localStorage.getItem(`rkflow.${provider}.apiKey`) ?? "";
  }

  static has(provider: keyof ProviderKeys): boolean {
    return this.get(provider).length > 0;
  }

  static clear(provider: keyof ProviderKeys): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(`rkflow.${provider}.apiKey`);
  }

  static clearAll(): void {
    this.clear("gemini");
    this.clear("chatgpt");
    this.clear("claude");
    this.clear("grok");
    this.clear("kimi");
    this.clear("ollama");
  }
}
