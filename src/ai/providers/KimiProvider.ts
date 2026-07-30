import { BaseProvider } from "./BaseProvider";

export class KimiProvider extends BaseProvider {
  readonly id = "kimi";
  readonly name = "Kimi";

  async initialize(): Promise<void> {}

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async chat(prompt: string): Promise<string> {
    return prompt;
  }
}

export default KimiProvider;
