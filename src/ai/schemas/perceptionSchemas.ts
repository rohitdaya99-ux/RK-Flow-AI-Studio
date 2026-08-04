import { ResponseSchema, SchemaType } from "@google/generative-ai";

export const weddingSegmentSchema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    id: { type: SchemaType.STRING },
    label: { type: SchemaType.STRING },
    confidence: { type: SchemaType.NUMBER },
    start: { type: SchemaType.NUMBER },
    end: { type: SchemaType.NUMBER },
    source: { type: SchemaType.STRING }
  },
  required: ["id", "label", "confidence", "start", "end", "source"]
};

export const weddingSegmentsSchema: ResponseSchema = {
  type: SchemaType.ARRAY,
  items: weddingSegmentSchema
};

export const faceClusterSchema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    id: { type: SchemaType.STRING },
    label: { type: SchemaType.STRING },
    role: { type: SchemaType.STRING, format: "enum", enum: ["bride", "groom", "family", "guest", "unknown"] },
    confidence: { type: SchemaType.NUMBER },
    clipIds: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    emotionTags: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    source: { type: SchemaType.STRING }
  },
  required: ["id", "label", "role", "confidence", "clipIds", "emotionTags", "source"]
};

export const faceClustersSchema: ResponseSchema = {
  type: SchemaType.ARRAY,
  items: faceClusterSchema
};

export const emotionClipSchema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    clipId: { type: SchemaType.STRING },
    clipName: { type: SchemaType.STRING },
    emotions: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    confidence: { type: SchemaType.NUMBER },
    source: { type: SchemaType.STRING }
  },
  required: ["clipId", "clipName", "emotions", "confidence", "source"]
};

export const emotionClipsSchema: ResponseSchema = {
  type: SchemaType.ARRAY,
  items: emotionClipSchema
};

export const cameraClipSchema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    clipId: { type: SchemaType.STRING },
    clipName: { type: SchemaType.STRING },
    shotType: { type: SchemaType.STRING },
    movement: { type: SchemaType.STRING },
    confidence: { type: SchemaType.NUMBER },
    source: { type: SchemaType.STRING }
  },
  required: ["clipId", "clipName", "shotType", "movement", "confidence", "source"]
};

export const cameraClipsSchema: ResponseSchema = {
  type: SchemaType.ARRAY,
  items: cameraClipSchema
};
