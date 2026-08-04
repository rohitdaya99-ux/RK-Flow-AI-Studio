import { SchemaType } from "@google/generative-ai";
import { GeminiToolSchema } from "./schemaUtils";

const stringField = { type: SchemaType.STRING } as const;
const numberField = { type: SchemaType.NUMBER } as const;

export const commandToolSchemas: GeminiToolSchema[] = [
  {
    name: "READ_TIMELINE",
    description: "Read the active Premiere timeline.",
    parameters: { type: SchemaType.OBJECT, properties: {} }
  },
  {
    name: "READ_SELECTED_CLIPS",
    description: "Read selected clips from the active Premiere sequence.",
    parameters: { type: SchemaType.OBJECT, properties: {} }
  },
  {
    name: "GET_IN_OUT",
    description: "Read current In and Out points.",
    parameters: { type: SchemaType.OBJECT, properties: {} }
  },
  {
    name: "GET_PLAYHEAD",
    description: "Read current playhead position.",
    parameters: { type: SchemaType.OBJECT, properties: {} }
  },
  {
    name: "MOVE_PLAYHEAD",
    description: "Move the playhead to a given time in seconds.",
    parameters: { type: SchemaType.OBJECT, properties: { time: numberField }, required: ["time"] }
  },
  {
    name: "CREATE_MARKER",
    description: "Create a timeline marker.",
    parameters: { type: SchemaType.OBJECT, properties: { name: stringField, time: numberField }, required: ["name", "time"] }
  },
  {
    name: "DELETE_MARKER",
    description: "Delete a marker by id.",
    parameters: { type: SchemaType.OBJECT, properties: { markerId: stringField }, required: ["markerId"] }
  },
  {
    name: "CUT_CLIP",
    description: "Cut a clip at a given time.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField, time: numberField }, required: ["clipId", "time"] }
  },
  {
    name: "TRIM_CLIP",
    description: "Trim a clip to a start and end time.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField, start: numberField, end: numberField }, required: ["clipId", "start", "end"] }
  },
  {
    name: "MOVE_CLIP",
    description: "Move a clip to another track/time.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField, targetTrackIndex: numberField, start: numberField }, required: ["clipId", "targetTrackIndex", "start"] }
  },
  {
    name: "CREATE_SEQUENCE",
    description: "Create a Premiere sequence.",
    parameters: { type: SchemaType.OBJECT, properties: { name: stringField }, required: ["name"] }
  },
  {
    name: "IMPORT_MEDIA",
    description: "Import media into the project.",
    parameters: { type: SchemaType.OBJECT, properties: { mediaPath: stringField }, required: ["mediaPath"] }
  },
  {
    name: "EXPORT_SEQUENCE",
    description: "Export the active sequence.",
    parameters: { type: SchemaType.OBJECT, properties: { destinationPath: stringField, preset: stringField }, required: ["destinationPath"] }
  },
  {
    name: "CREATE_REEL",
    description: "Create a reel from the current context.",
    parameters: { type: SchemaType.OBJECT, properties: { duration: numberField }, required: ["duration"] }
  },
  {
    name: "RIPPLE_DELETE",
    description: "Ripple delete a timeline range.",
    parameters: { type: SchemaType.OBJECT, properties: { start: numberField, end: numberField }, required: ["start", "end"] }
  },
  {
    name: "AUTO_TRIM",
    description: "Automatically trim selected clips.",
    parameters: { type: SchemaType.OBJECT, properties: {} }
  },
  {
    name: "BEAT_CUT",
    description: "Cut on detected beats.",
    parameters: { type: SchemaType.OBJECT, properties: {} }
  },
  {
    name: "SILENCE_REMOVE",
    description: "Remove silence from selected clips.",
    parameters: { type: SchemaType.OBJECT, properties: {} }
  },
  {
    name: "SPEED_RAMP",
    description: "Apply a speed ramp to a clip.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField, from: numberField, to: numberField }, required: ["clipId", "from", "to"] }
  },
  {
    name: "AUTO_ZOOM",
    description: "Apply auto zoom to a clip.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField, start: numberField, end: numberField }, required: ["clipId"] }
  },
  {
    name: "REFRAME",
    description: "Auto reframe a clip or sequence.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField } }
  },
  {
    name: "ADD_CLIP_TO_SEQUENCE",
    description: "Insert a video project item into the active sequence.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField, mediaPath: stringField, start: numberField, targetTrackIndex: numberField }, required: ["start"] }
  },
  {
    name: "ADD_AUDIO_TO_SEQUENCE",
    description: "Insert an audio project item into the active sequence.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField, mediaPath: stringField, assetId: stringField, start: numberField, targetTrackIndex: numberField }, required: ["start"] }
  },
  {
    name: "ADD_TRANSITION",
    description: "Add a transition to the timeline.",
    parameters: { type: SchemaType.OBJECT, properties: { type: stringField, start: numberField, duration: numberField }, required: ["type", "start", "duration"] }
  },
  {
    name: "APPLY_COLOR_MATCH",
    description: "Apply color match using source and target clips.",
    parameters: { type: SchemaType.OBJECT, properties: { sourceClipId: stringField, targetClipId: stringField }, required: ["sourceClipId", "targetClipId"] }
  },
  {
    name: "APPLY_SKIN_TONE_PROTECTION",
    description: "Apply skin tone protection.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
  },
  {
    name: "APPLY_FILM_LUT",
    description: "Apply a film LUT to a clip.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
  },
  {
    name: "AUTO_GRADE",
    description: "Auto grade a clip.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
  },
  {
    name: "APPLY_PAN_AND_ZOOM",
    description: "Apply pan and zoom motion.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
  },
  {
    name: "APPLY_PARALLAX",
    description: "Apply parallax motion.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
  },
  {
    name: "APPLY_MOTION_BLUR",
    description: "Apply motion blur.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
  },
  {
    name: "REMOVE_NOISE",
    description: "Remove noise from an audio clip.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
  },
  {
    name: "ENHANCE_VOICE",
    description: "Enhance voice in an audio clip.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
  },
  {
    name: "AUTO_DUCK",
    description: "Auto duck background music beneath speech.",
    parameters: { type: SchemaType.OBJECT, properties: { mainClipId: stringField, musicClipId: stringField }, required: ["mainClipId", "musicClipId"] }
  },
  {
    name: "CLEANUP_SPEECH",
    description: "Cleanup speech audio.",
    parameters: { type: SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
  },
  {
    name: "INSERT_CAPTIONS",
    description: "Insert captions into the timeline.",
    parameters: { type: SchemaType.OBJECT, properties: { captions: stringField }, required: ["captions"] }
  }
];
