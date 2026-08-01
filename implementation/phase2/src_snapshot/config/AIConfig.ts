export class AIConfig {

  private static readonly KEY = "AQ.Ab8RN6JXg6ceuewVMR6D3PzEnOPfU8CBnGkL0jsvwMJTAhqZ2g";

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.KEY, apiKey);
  }

  static getApiKey(): string {
    return localStorage.getItem(this.KEY) ?? "";
  }

  static hasApiKey(): boolean {
    return this.getApiKey().length > 0;
  }

  static clearApiKey(): void {
    localStorage.removeItem(this.KEY);
  }

}
