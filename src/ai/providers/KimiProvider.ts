import { BaseProvider } from "./BaseProvider";

export class KimiProvider extends BaseProvider {
  readonly name = "kimi";
  async chat(prompt: string) {
    return prompt;
  }
}
