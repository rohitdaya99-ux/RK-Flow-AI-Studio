import { FunctionCallingMode, GoogleGenerativeAI, ResponseSchema } from "@google/generative-ai";
import { resolveGeminiConfig } from "../config";
import { loggerService } from "../services/loggerService";
import { GeminiToolSchema, toFunctionDeclaration, validateSchemaValue } from "./schemas";

export const GEMINI_MODEL = "gemini-3.6-flash";
const MAX_USAGE_RECORDS = 20;

const FALLBACK_MODELS = [
  "gemini-3.5-flash",
  "gemini-flash-latest"
] as const;

const RETRY_DELAYS_MS = [350, 900, 1800];
const responseCache = new Map<string, string>();
let cacheHits = 0;
let lastGeminiError = "";
let lastQuotaMessage = "";

let client: GoogleGenerativeAI | null = null;
let cachedApiKey = "";
let resolvedModel: string | null = null;
let warnedFallback = false;
const usageRecords: GeminiUsageRecord[] = [];

export interface GeminiUsageRecord {
  id: string;
  kind: "text" | "vision";
  model: string;
  cacheHit: boolean;
  promptText: string;
  promptPreview: string;
  startedAt: string;
  durationMs: number;
  success: boolean;
  errorMessage?: string;
  responseText?: string;
  responsePreview?: string;
}

export function getRecentGeminiCalls(): GeminiUsageRecord[] {
  return [...usageRecords].reverse();
}

export function getGeminiUsageStats() {
  const totalCalls = usageRecords.length;
  const successfulCalls = usageRecords.filter((record) => record.success).length;
  const failedCalls = totalCalls - successfulCalls;
  const totalDurationMs = usageRecords.reduce((sum, record) => sum + record.durationMs, 0);

  return {
    totalCalls,
    successfulCalls,
    failedCalls,
    averageDurationMs: totalCalls > 0 ? Math.round(totalDurationMs / totalCalls) : 0,
    cacheHits
  };
}

export function getGeminiRuntimeStatus() {
  return {
    cacheEntries: responseCache.size,
    cacheHits,
    lastError: lastGeminiError,
    lastQuotaMessage
  };
}

export async function runGeminiStructured<T>(
  prompt: string,
  schema: ResponseSchema,
  options: {
    systemInstruction?: string;
    context?: unknown;
  } = {}
): Promise<T> {
  const apiKey = resolveGeminiConfig().apiKey;

  if (!apiKey) {
    throw new Error("Add your Gemini API key in Settings.");
  }

  const modelName = await resolveModel(apiKey, {
    json: true,
    systemInstruction: options.systemInstruction
  });
  const cacheKey = buildCacheKey(
    "text",
    modelName,
    buildContextualPrompt(prompt, options.context),
    options.systemInstruction,
    [`responseSchema:${JSON.stringify(schema)}`]
  );
  const cachedResponse = responseCache.get(cacheKey);

  if (cachedResponse) {
    cacheHits += 1;
    return validateSchemaValue<T>(JSON.parse(cachedResponse), schema);
  }

  const model = getClient(apiKey).getGenerativeModel({
    model: modelName,
    systemInstruction: options.systemInstruction,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  const result = await model.generateContent(buildContextualPrompt(prompt, options.context));
  const response = await result.response;
  const text = response.text().trim();

  if (!text) {
    throw new Error("Gemini returned an empty structured response.");
  }

  responseCache.set(cacheKey, text);
  return validateSchemaValue<T>(JSON.parse(text), schema);
}

export async function runGeminiTool<T extends object = Record<string, unknown>>(
  prompt: string,
  toolSchemas: GeminiToolSchema[],
  context?: unknown,
  options: {
    systemInstruction?: string;
  } = {}
): Promise<{ name: string; args: T }> {
  const apiKey = resolveGeminiConfig().apiKey;

  if (!apiKey) {
    throw new Error("Add your Gemini API key in Settings.");
  }

  if (toolSchemas.length === 0) {
    throw new Error("runGeminiTool requires at least one tool schema.");
  }

  const modelName = await resolveModel(apiKey, options);
  const fullPrompt = buildContextualPrompt(prompt, context);
  const cacheKey = buildCacheKey(
    "text",
    modelName,
    fullPrompt,
    options.systemInstruction,
    [`tools:${JSON.stringify(toolSchemas)}`]
  );
  const cachedResponse = responseCache.get(cacheKey);

  if (cachedResponse) {
    cacheHits += 1;
    return JSON.parse(cachedResponse) as { name: string; args: T };
  }

  const declarations = toolSchemas.map(toFunctionDeclaration);
  const model = getClient(apiKey).getGenerativeModel({
    model: modelName,
    systemInstruction: options.systemInstruction,
    tools: [{ functionDeclarations: declarations }],
    toolConfig: {
      functionCallingConfig: {
        mode: FunctionCallingMode.ANY,
        allowedFunctionNames: toolSchemas.map((tool) => tool.name)
      }
    }
  });

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  const functionCalls = response.functionCalls();
  const firstCall = functionCalls?.[0];

  if (!firstCall) {
    throw new Error("Gemini did not return a function call.");
  }

  const schema = toolSchemas.find((tool) => tool.name === firstCall.name);

  if (!schema) {
    throw new Error(`Gemini returned an unknown function call: ${firstCall.name}`);
  }

  const validatedArgs = validateSchemaValue<T>(
    firstCall.args,
    {
      type: schema.parameters?.type ?? "object",
      properties: schema.parameters?.properties ?? {},
      required: schema.parameters?.required
    } as ResponseSchema
  );
  const payload = { name: firstCall.name, args: validatedArgs };
  responseCache.set(cacheKey, JSON.stringify(payload));
  return payload;
}

export async function runGemini(
  prompt: string,
  options: {
    json?: boolean;
    systemInstruction?: string;
  } = {}
): Promise<string> {
  const apiKey = resolveGeminiConfig().apiKey;
  const startedAt = Date.now();

  if (!apiKey) {
    throw new Error("Add your Gemini API key in Settings.");
  }

  const modelName = await resolveModel(apiKey, options);
  const cacheKey = buildCacheKey("text", modelName, prompt, options.systemInstruction, []);
  const cachedResponse = responseCache.get(cacheKey);

  if (cachedResponse) {
    cacheHits += 1;
    trackUsage({
      kind: "text",
      model: modelName,
      prompt,
      startedAt,
      success: true,
      responseText: cachedResponse,
      cacheHit: true
    });
    loggerService.log(`Gemini text request served from session cache for model ${modelName}.`, "info");
    return cachedResponse;
  }

  loggerService.log(`Gemini text request started with model ${modelName}.`, "info");

  let lastError: unknown;

  for (let attempt = 0; attempt < RETRY_DELAYS_MS.length + 1; attempt += 1) {
    try {
      const model = getClient(apiKey).getGenerativeModel({
        model: modelName,
        systemInstruction: options.systemInstruction,
        generationConfig: options.json
          ? { responseMimeType: "application/json" }
          : undefined
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();

      if (!text) {
        throw new Error("Gemini returned an empty response.");
      }

      responseCache.set(cacheKey, text);
      trackUsage({
        kind: "text",
        model: modelName,
        prompt,
        startedAt,
        success: true,
        responseText: text,
        cacheHit: false
      });
      lastGeminiError = "";
      lastQuotaMessage = "";
      loggerService.log(`Gemini text request completed in ${Date.now() - startedAt} ms.`, "success");
      return text;
    } catch (error) {
      lastError = error;

      if (attempt >= RETRY_DELAYS_MS.length || !isRetryableError(error)) {
        break;
      }

      await delay(RETRY_DELAYS_MS[attempt]);
    }
  }

  trackUsage({
    kind: "text",
    model: modelName,
    prompt,
    startedAt,
    success: false,
    error: lastError,
    cacheHit: false
  });
  lastGeminiError = formatGeminiError(lastError);
  lastQuotaMessage = formatQuotaMessage(lastError);
  loggerService.log(`Gemini text request failed: ${formatGeminiError(lastError)}`, "error");
  throw new Error(formatGeminiError(lastError));
}

export async function runGeminiVision(
  prompt: string,
  images: Array<{ mimeType: string; base64: string }>,
  options: {
    json?: boolean;
    systemInstruction?: string;
  } = {}
): Promise<string> {
  const apiKey = resolveGeminiConfig().apiKey;
  const startedAt = Date.now();

  if (!apiKey) {
    throw new Error("Add your Gemini API key in Settings.");
  }

  if (images.length === 0) {
    throw new Error("Gemini vision request requires at least one image.");
  }

  const modelName = await resolveModel(apiKey, options);
  const cacheKey = buildCacheKey(
    "vision",
    modelName,
    prompt,
    options.systemInstruction,
    images.map((image) => `${image.mimeType}:${image.base64.slice(0, 32)}`)
  );
  const cachedResponse = responseCache.get(cacheKey);

  if (cachedResponse) {
    cacheHits += 1;
    trackUsage({
      kind: "vision",
      model: modelName,
      prompt,
      startedAt,
      success: true,
      responseText: cachedResponse,
      cacheHit: true
    });
    loggerService.log(`Gemini vision request served from session cache for model ${modelName}.`, "info");
    return cachedResponse;
  }

  loggerService.log(`Gemini vision request started with model ${modelName}.`, "info");
  let lastError: unknown;

  for (let attempt = 0; attempt < RETRY_DELAYS_MS.length + 1; attempt += 1) {
    try {
      const model = getClient(apiKey).getGenerativeModel({
        model: modelName,
        systemInstruction: options.systemInstruction,
        generationConfig: options.json
          ? { responseMimeType: "application/json" }
          : undefined
      });

      const result = await model.generateContent([
        { text: prompt },
        ...images.map((image) => ({
          inlineData: {
            mimeType: image.mimeType,
            data: image.base64
          }
        }))
      ]);
      const response = await result.response;
      const text = response.text().trim();

      if (!text) {
        throw new Error("Gemini returned an empty vision response.");
      }

      responseCache.set(cacheKey, text);
      trackUsage({
        kind: "vision",
        model: modelName,
        prompt,
        startedAt,
        success: true,
        responseText: text,
        cacheHit: false
      });
      lastGeminiError = "";
      lastQuotaMessage = "";
      loggerService.log(`Gemini vision request completed in ${Date.now() - startedAt} ms.`, "success");
      return text;
    } catch (error) {
      lastError = error;

      if (attempt >= RETRY_DELAYS_MS.length || !isRetryableError(error)) {
        break;
      }

      await delay(RETRY_DELAYS_MS[attempt]);
    }
  }

  trackUsage({
    kind: "vision",
    model: modelName,
    prompt,
    startedAt,
    success: false,
    error: lastError,
    cacheHit: false
  });
  lastGeminiError = formatGeminiError(lastError);
  lastQuotaMessage = formatQuotaMessage(lastError);
  loggerService.log(`Gemini vision request failed: ${formatGeminiError(lastError)}`, "error");
  throw new Error(formatGeminiError(lastError));
}

function trackUsage({
  kind,
  model,
  prompt,
  startedAt,
  success,
  error,
  responseText,
  cacheHit
}: {
  kind: "text" | "vision";
  model: string;
  prompt: string;
  startedAt: number;
  success: boolean;
  error?: unknown;
  responseText?: string;
  cacheHit: boolean;
}) {
  usageRecords.push({
    id: `${startedAt}-${usageRecords.length + 1}`,
    kind,
    model,
    cacheHit,
    promptText: prompt,
    promptPreview: summarizeText(prompt),
    startedAt: new Date(startedAt).toISOString(),
    durationMs: Math.max(0, Date.now() - startedAt),
    success,
    errorMessage: error ? formatGeminiError(error) : undefined,
    responseText,
    responsePreview: responseText ? summarizeText(responseText) : undefined
  });

  if (usageRecords.length > MAX_USAGE_RECORDS) {
    usageRecords.splice(0, usageRecords.length - MAX_USAGE_RECORDS);
  }
}

function buildCacheKey(
  kind: "text" | "vision",
  model: string,
  prompt: string,
  systemInstruction: string | undefined,
  extra: string[]
) {
  return JSON.stringify({
    kind,
    model,
    prompt,
    systemInstruction: systemInstruction ?? "",
    extra
  });
}

function buildContextualPrompt(prompt: string, context: unknown) {
  if (context === undefined) {
    return prompt;
  }

  return [prompt, "", "Context JSON:", JSON.stringify(context)].join("\n");
}

function getClient(apiKey: string) {
  if (client === null || cachedApiKey !== apiKey) {
    client = new GoogleGenerativeAI(apiKey);
    cachedApiKey = apiKey;
    resolvedModel = null;
    warnedFallback = false;
  }

  return client;
}

async function resolveModel(
  apiKey: string,
  options: {
    json?: boolean;
    systemInstruction?: string;
  }
) {
  if (resolvedModel) {
    return resolvedModel;
  }

  const candidates = [GEMINI_MODEL, ...FALLBACK_MODELS];

  for (const candidate of candidates) {
    try {
      const model = getClient(apiKey).getGenerativeModel({
        model: candidate,
        systemInstruction: options.systemInstruction,
        generationConfig: options.json
          ? { responseMimeType: "application/json" }
          : undefined
      });

      const result = await model.generateContent("Reply with OK.");
      const response = await result.response;

      if (!response.text().trim()) {
        throw new Error(`Model ${candidate} returned an empty response.`);
      }

      resolvedModel = candidate;

      if (candidate !== GEMINI_MODEL && !warnedFallback) {
        warnedFallback = true;
        console.warn(
          `[RK Flow] Gemini model "${GEMINI_MODEL}" was not resolvable for this API key. Falling back to "${candidate}".`
        );
      }

      return candidate;
    } catch (error) {
      if (!isModelResolutionError(error)) {
        throw error;
      }
    }
  }

  throw new Error(
    `Gemini model "${GEMINI_MODEL}" is not available for this API key, and no fallback flash model resolved.`
  );
}

function isRetryableError(error: unknown) {
  const message = extractErrorMessage(error).toLowerCase();

  return (
    message.includes("429") ||
    message.includes("500") ||
    message.includes("502") ||
    message.includes("503") ||
    message.includes("504") ||
    message.includes("rate limit") ||
    message.includes("timeout")
  );
}

function isModelResolutionError(error: unknown) {
  const message = extractErrorMessage(error).toLowerCase();

  return (
    message.includes("404") ||
    message.includes("not found") ||
    message.includes("unsupported") ||
    message.includes("not available") ||
    message.includes("not exist")
  );
}

function formatGeminiError(error: unknown) {
  const message = extractErrorMessage(error);

  if (isRateLimitError(error)) {
    return formatQuotaMessage(error);
  }

  if (message) {
    return `Gemini request failed: ${message}`;
  }

  return "Gemini request failed for an unknown reason.";
}

function formatQuotaMessage(error: unknown) {
  const message = extractErrorMessage(error);
  const retryAfter = extractRetryAfterSeconds(message);
  const suffix = retryAfter !== null ? ` Try again in about ${retryAfter}s.` : " Try again later.";
  return `Gemini daily limit reached or rate limit hit.${suffix}`;
}

function extractErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "";
}

function isRateLimitError(error: unknown) {
  const message = extractErrorMessage(error).toLowerCase();
  return message.includes("429") || message.includes("rate limit") || message.includes("quota");
}

function extractRetryAfterSeconds(message: string): number | null {
  const match = message.match(/(\d+)\s*s(?:ec(?:ond)?s?)?/i);

  if (!match) {
    return null;
  }

  const seconds = Number(match[1]);
  return Number.isFinite(seconds) ? seconds : null;
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function summarizeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length > 220 ? `${normalized.slice(0, 217)}...` : normalized;
}
