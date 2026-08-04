import { AIRouter } from "../router/AIRouter";
import { ChatRequest } from "../models/ChatTypes";
import { AICopilot } from "../copilot/AICopilot";
import { CommandParsingService } from "./CommandParsingService";
import { CommandValidator } from "../../commands/CommandValidator";
import { CommandExecutor } from "../../commands/CommandExecutor";

export class AIChatService {
  private readonly router = new AIRouter();
  private readonly commandParser = new CommandParsingService();
  private readonly commandValidator = new CommandValidator();
  private readonly commandExecutor = new CommandExecutor();
  private readonly copilot = new AICopilot();

  async ask(prompt: string): Promise<string> {
    const resolved = await this.copilot.resolve<string>({
      intent: "assistant:chat",
      context: prompt,
      localResolver: async (snapshot, value) => {
        const parsedLocalCommand = this.commandParser.parseLocal(String(value), snapshot);

        if (!parsedLocalCommand) {
          return null;
        }

        const validationResult = this.commandValidator.validate(parsedLocalCommand);
        if (!validationResult.valid) {
          return `[local] Command validation failed: ${validationResult.errors.join(", ")}`;
        }

        const executionResult = await this.commandExecutor.execute(parsedLocalCommand);
        return executionResult.success
          ? `[local] Command executed successfully: ${executionResult.message}`
          : `[local] Command failed: ${executionResult.error}`;
      },
      geminiResolver: async (snapshot, value) => {
        const promptText = String(value);
        const parsedGeminiCommand = await this.commandParser.parseWithGemini(promptText);

        if (parsedGeminiCommand) {
          const validationResult = this.commandValidator.validate(parsedGeminiCommand);
          if (validationResult.valid) {
            const executionResult = await this.commandExecutor.execute(parsedGeminiCommand);
            return executionResult.success
              ? `[gemini] Command executed successfully: ${executionResult.message}`
              : `[gemini] Command failed: ${executionResult.error}`;
          }
        }

        const request: ChatRequest = {
          prompt: [
            "Premiere context snapshot JSON:",
            JSON.stringify(snapshot),
            "",
            `User request: ${promptText}`
          ].join("\n")
        };
        const response = await this.router.chat(request);
        return `[gemini] ${response.text}`;
      }
    });

    return resolved.value;
  }
}
