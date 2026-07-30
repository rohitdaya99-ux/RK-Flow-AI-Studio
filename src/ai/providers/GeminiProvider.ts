import { BaseProvider } from "./BaseProvider";

export class GeminiProvider extends BaseProvider {
  readonly name = "gemini";
  async chat(prompt: string) {
    return prompt;
  }
}
