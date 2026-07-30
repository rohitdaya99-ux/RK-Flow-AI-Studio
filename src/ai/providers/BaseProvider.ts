export abstract class BaseProvider {
  abstract readonly name: string;
  abstract chat(prompt: string): Promise<string>;
}
