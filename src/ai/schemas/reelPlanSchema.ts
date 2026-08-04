import { ResponseSchema, SchemaType } from "@google/generative-ai";

const clipPlanSchema = {
  type: SchemaType.OBJECT,
  properties: {
    clipId: { type: SchemaType.STRING },
    durationSeconds: { type: SchemaType.NUMBER },
    reason: { type: SchemaType.STRING },
    emotionWeight: { type: SchemaType.NUMBER },
    musicEnergyWeight: { type: SchemaType.NUMBER },
    shotWeight: { type: SchemaType.NUMBER }
  },
  required: [
    "clipId",
    "durationSeconds",
    "reason",
    "emotionWeight",
    "musicEnergyWeight",
    "shotWeight"
  ] as string[]
} satisfies ResponseSchema;

export const reelPlanSchema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    title: { type: SchemaType.STRING },
    templateName: { type: SchemaType.STRING },
    intentSummary: { type: SchemaType.STRING },
    targetDurationSeconds: { type: SchemaType.NUMBER },
    clips: {
      type: SchemaType.ARRAY,
      items: clipPlanSchema
    },
    notes: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING }
    }
  },
  required: [
    "title",
    "templateName",
    "intentSummary",
    "targetDurationSeconds",
    "clips",
    "notes"
  ]
};
