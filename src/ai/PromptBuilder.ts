import { COMMAND_ACTIONS } from "../types/Command";
import { TimelineState } from "../types/Timeline";

export class PromptBuilder {
  public buildCommandPrompt(
    userRequest: string,
    timeline?: TimelineState | null
  ): string {
    const timelineContext =
      timeline === undefined || timeline === null
        ? "No timeline data is available. Do not invent clip, track, or marker IDs."
        : JSON.stringify(timeline, null, 2);

    return [
      "You translate RK Flow editing requests into one safe Premiere command.",
      "Return only a JSON object. Do not include markdown, explanations, or code fences.",
      'The JSON shape must be: {"action":"COMMAND_NAME","payload":{}}.',
      `Supported actions: ${COMMAND_ACTIONS.join(", ")}.`,
      "Only use values supported by the timeline context. Never claim that a command has run.",
      `Timeline context:\n${timelineContext}`,
      `User request:\n${userRequest}`
    ].join("\n\n");
  }
}
