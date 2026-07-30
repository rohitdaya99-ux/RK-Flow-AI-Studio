import { BaseProvider } from "./BaseProvider";

export class OpenAIProvider extends BaseProvider {
  readonly name = "openai";
  async chat(prompt: string) {
    return prompt;
  }
}
