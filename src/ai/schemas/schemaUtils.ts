import { FunctionDeclaration, ResponseSchema, Schema, SchemaType } from "@google/generative-ai";

export interface GeminiToolSchema {
  name: string;
  description: string;
  parameters: FunctionDeclaration["parameters"];
}

export function toFunctionDeclaration(schema: GeminiToolSchema): FunctionDeclaration {
  return {
    name: schema.name,
    description: schema.description,
    parameters: schema.parameters
  };
}

export function validateSchemaValue<T>(value: unknown, schema: ResponseSchema): T {
  if (!matchesSchema(value, schema)) {
    throw new Error("Gemini structured response did not match the expected schema.");
  }

  return value as T;
}

function matchesSchema(value: unknown, schema: Schema): boolean {
  switch (schema.type) {
    case SchemaType.STRING:
      return typeof value === "string" || (schema.nullable === true && value === null);
    case SchemaType.NUMBER:
      return typeof value === "number" || (schema.nullable === true && value === null);
    case SchemaType.INTEGER:
      return Number.isInteger(value) || (schema.nullable === true && value === null);
    case SchemaType.BOOLEAN:
      return typeof value === "boolean" || (schema.nullable === true && value === null);
    case SchemaType.ARRAY:
      return (
        Array.isArray(value) &&
        value.every((entry) => matchesSchema(entry, schema.items))
      ) || (schema.nullable === true && value === null);
    case SchemaType.OBJECT:
      if ((schema.nullable === true && value === null)) {
        return true;
      }

      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return false;
      }

      for (const key of schema.required ?? []) {
        if (!(key in value)) {
          return false;
        }
      }

      return Object.entries(schema.properties).every(([key, propertySchema]) => {
        if (!(key in value)) {
          return !(schema.required ?? []).includes(key);
        }

        return matchesSchema((value as Record<string, unknown>)[key], propertySchema);
      });
    default:
      return false;
  }
}
