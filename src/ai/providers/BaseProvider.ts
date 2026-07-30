export abstract class BaseProvider {
  abstract readonly id: string;
  abstract readonly name: string;

  async initialize(): Promise<void> {}

  async isAvailable(): Promise<boolean> {
    return true;
  }

  abstract chat(prompt: string): Promise<string>;
}
