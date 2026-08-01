import {
  CommandAction,
  CommandPayload,
  RKCommand,
  createCommand
} from "../types/Command";
import { TimelineState } from "../types/Timeline";
import { CommandRegistry } from "../commands/CommandRegistry";
import { CommandValidator } from "../commands/CommandValidator";
import { PromptBuilder } from "./PromptBuilder";

export interface GeminiTextGenerator {
  generate(prompt: string): Promise<string>;
}

export class GeminiJSONService {
  private readonly registry = new CommandRegistry();
  private readonly validator = new CommandValidator(this.registry);

  public constructor(
    private readonly generator: GeminiTextGenerator,
    private readonly promptBuilder = new PromptBuilder()
  ) {}

  public async createCommand(
    userRequest: string,
    timeline?: TimelineState | null
  ): Promise<RKCommand> {
    const prompt = this.promptBuilder.buildCommandPrompt(userRequest, timeline);
    const response = await this.generator.generate(prompt);
    const command = this.parseCommand(response);
    const validation = this.validator.validate(command);

    if (!validation.valid) {
      throw new Error(`Gemini returned an invalid command: ${validation.errors.join(" ")}`);
    }

    return command;
  }

  public parseCommand(response: string): RKCommand {
    const parsed = JSON.parse(extractJsonObject(response)) as unknown;

    if (!isRecord(parsed) || typeof parsed.action !== "string") {
      throw new Error("Gemini response must contain an action.");
    }

    if (!this.registry.has(parsed.action)) {
      throw new Error(`Unsupported command action: ${parsed.action}`);
    }

    const payload = isRecord(parsed.payload) ? parsed.payload : {};
    return createCommand(parsed.action as CommandAction, payload);
  }
}

function extractJsonObject(response: string): string {
  const withoutFences = response
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  const firstBrace = withoutFences.indexOf("{");
  const lastBrace = withoutFences.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    throw new Error("Gemini response did not contain a JSON object.");
  }

  return withoutFences.slice(firstBrace, lastBrace + 1);
}

function isRecord(value: unknown): value is CommandPayload {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
