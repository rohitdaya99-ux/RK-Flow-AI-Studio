import { SchemaType } from "@google/generative-ai";
import { GeminiToolSchema } from "./schemaUtils";

const stringField = { type: SchemaType.STRING } as const;
const numberField = { type: SchemaType.NUMBER } as const;

const storySegmentSchema = {
  type: SchemaType.OBJECT,
  properties: {
    type: stringField,
    segment: stringField,
    clipId: stringField,
    duration: numberField,
    content: stringField
  },
  required: ["type", "duration"] as string[]
} as const;

export const aiDirectorToolSchemas: GeminiToolSchema[] = [
  {
    name: "SELECT_SONG",
    description: "Choose the best soundtrack for the wedding film from available audio assets.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        songId: stringField,
        reasoning: stringField
      },
      required: ["songId", "reasoning"]
    }
  },
  {
    name: "SELECT_HERO_SHOTS",
    description: "Select the strongest hero shots from available video assets.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        heroShotIds: {
          type: SchemaType.ARRAY,
          items: stringField
        },
        reasoning: stringField
      },
      required: ["heroShotIds", "reasoning"]
    }
  },
  {
    name: "BUILD_STORY_STRUCTURE",
    description: "Build a story structure for the film using hero shots and wedding beats.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        segments: {
          type: SchemaType.ARRAY,
          items: storySegmentSchema
        },
        reasoning: stringField
      },
      required: ["segments", "reasoning"]
    }
  },
  {
    name: "ASSEMBLE_SEQUENCE",
    description: "Submit the edit plan to Premiere for assembly once the structure is ready.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        templateName: stringField,
        clipIds: {
          type: SchemaType.ARRAY,
          items: stringField
        },
        reasoning: stringField
      },
      required: ["templateName", "clipIds", "reasoning"]
    }
  },
  {
    name: "ASSEMBLE_COMPLETE",
    description: "Return this only after assembly has completed or no more steps are needed.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        summary: stringField,
        sequenceName: stringField
      },
      required: ["summary"]
    }
  }
];
