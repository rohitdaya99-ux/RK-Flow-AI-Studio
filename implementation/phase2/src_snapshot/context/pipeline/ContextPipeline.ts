import { ContextEngine } from "../ContextEngine";
import { ContextValidator } from "../validators/ContextValidator";
import { ContextFormatter } from "../utils/ContextFormatter";

export class ContextPipeline {
  private engine = new ContextEngine();
  private validator = new ContextValidator();
  private formatter = new ContextFormatter();

  async execute(prompt: string): Promise<string> {
    const context = await this.engine.build(prompt);

    if (!this.validator.validate(context)) {
      throw new Error("Invalid context");
    }

    return this.formatter.format(context);
  }
}
