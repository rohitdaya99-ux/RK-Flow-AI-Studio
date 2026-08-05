import { COMMAND_ACTIONS } from "../../types/Command";
import {
  AUTO_REEL_JOB_STATES,
  AutoReelJob,
  AutoReelRequest,
  AutoReelSetupConfig,
  ExecutionReport,
  ReelPlan
} from "./models";

export interface ValidationIssue {
  path: string;
  message: string;
}

export interface ValidationResult<T> {
  valid: boolean;
  value?: T;
  issues: ValidationIssue[];
}

export function validateAutoReelRequest(input: unknown): ValidationResult<AutoReelRequest> {
  if (!isRecord(input)) {
    return invalid("request", "Expected an object.");
  }

  const issues: ValidationIssue[] = [];
  requireNonEmptyString(input, "id", issues);
  requireNonEmptyString(input, "prompt", issues);
  requireNonEmptyString(input, "outputSequenceName", issues);
  requireNonEmptyString(input, "submittedAt", issues);

  if (input.createNewSequence !== true) {
    issues.push({ path: "createNewSequence", message: "Auto Reel must create a new sequence." });
  }

  if (!isRecord(input.mediaSelection)) {
    issues.push({ path: "mediaSelection", message: "Expected media selection metadata." });
  } else {
    const selection = input.mediaSelection;
    if (!isStringArray(selection.clipIds)) {
      issues.push({ path: "mediaSelection.clipIds", message: "Expected a clip ID array." });
    }
    if (!isStringArray(selection.projectItemIds)) {
      issues.push({ path: "mediaSelection.projectItemIds", message: "Expected a project item ID array." });
    }
    if (typeof selection.usedFallback !== "boolean") {
      issues.push({ path: "mediaSelection.usedFallback", message: "Expected a fallback flag." });
    }
  }

  if (input.targetDurationSeconds !== undefined && !isPositiveNumber(input.targetDurationSeconds)) {
    issues.push({ path: "targetDurationSeconds", message: "Expected a positive duration." });
  }

  if (!isString(input.aspectRatio) || !["9:16", "16:9", "1:1", "4:5", "custom"].includes(input.aspectRatio)) {
    issues.push({ path: "aspectRatio", message: "Expected a supported aspect ratio." });
  }

  if (input.setup !== undefined) {
    const setupResult = validateAutoReelSetupConfig(input.setup);
    issues.push(...prefixIssues("setup", setupResult.issues));
  }

  return issues.length === 0
    ? { valid: true, value: input as unknown as AutoReelRequest, issues }
    : { valid: false, issues };
}

export function validateAutoReelSetupConfig(input: unknown): ValidationResult<AutoReelSetupConfig> {
  if (!isRecord(input)) {
    return invalid("setup", "Expected an object.");
  }

  const issues: ValidationIssue[] = [];

  if (!isString(input.scoringPresetId) || !input.scoringPresetId) {
    issues.push({ path: "scoringPresetId", message: "Expected a scoring preset ID." });
  }

  if (input.musicSource !== undefined) {
    if (!isRecord(input.musicSource)) {
      issues.push({ path: "musicSource", message: "Expected a music source object." });
    } else {
      const type = input.musicSource.type;
      if (!isString(type) || !["local_file", "premiere_project_item", "authorized_direct_url", "social_reference", "no_music"].includes(type)) {
        issues.push({ path: "musicSource.type", message: "Expected a supported music source type." });
      }
    }
  }

  return issues.length === 0
    ? { valid: true, value: input as unknown as AutoReelSetupConfig, issues }
    : { valid: false, issues };
}

export function validateAiReelPlan(input: unknown): ValidationResult<ReelPlan> {
  if (!isRecord(input)) {
    return invalid("plan", "Expected an object.");
  }

  const issues: ValidationIssue[] = [];
  ["id", "jobId", "requestId", "title", "intentSummary", "generatedAt"].forEach((field) => {
    requireNonEmptyString(input, field, issues);
  });
  requirePositiveNumber(input, "version", issues);
  requirePositiveNumber(input, "targetDurationSeconds", issues);
  requirePositiveNumber(input, "totalDurationSeconds", issues);

  if (!Array.isArray(input.segments) || input.segments.length === 0) {
    issues.push({ path: "segments", message: "Expected at least one planned segment." });
  } else {
    const segmentIds = new Set<string>();
    input.segments.forEach((segment, index) => {
      const path = `segments[${index}]`;
      if (!isRecord(segment)) {
        issues.push({ path, message: "Expected a segment object." });
        return;
      }
      ["id", "storyBeatId", "clipId", "reason"].forEach((field) => {
        requireNonEmptyString(segment, field, issues, path);
      });
      ["order", "sourceInSeconds", "sourceOutSeconds", "timelineStartSeconds", "durationSeconds", "score"].forEach((field) => {
        requireFiniteNumber(segment, field, issues, path);
      });
      if (isString(segment.id)) {
        if (segmentIds.has(segment.id)) {
          issues.push({ path: `${path}.id`, message: "Segment IDs must be unique." });
        }
        segmentIds.add(segment.id);
      }
      if (isFiniteNumber(segment.sourceInSeconds) && isFiniteNumber(segment.sourceOutSeconds) && segment.sourceOutSeconds <= segment.sourceInSeconds) {
        issues.push({ path, message: "Source out must be after source in." });
      }
      if (!isPositiveNumber(segment.durationSeconds)) {
        issues.push({ path: `${path}.durationSeconds`, message: "Duration must be positive." });
      }
      if (typeof segment.locked !== "boolean") {
        issues.push({ path: `${path}.locked`, message: "Expected a lock flag." });
      }
    });
  }

  ["storyBeats", "transitions", "motionDecisions", "sfxDecisions", "colorSuggestions", "rejectedClipIds", "warnings"].forEach((field) => {
    if (!Array.isArray(input[field])) {
      issues.push({ path: field, message: "Expected an array." });
    }
  });

  return issues.length === 0
    ? { valid: true, value: input as unknown as ReelPlan, issues }
    : { valid: false, issues };
}

export function validateBridgeExecutionReport(input: unknown): ValidationResult<ExecutionReport> {
  if (!isRecord(input)) {
    return invalid("executionReport", "Expected an object.");
  }

  const issues: ValidationIssue[] = [];
  ["id", "jobId", "planId", "outputSequenceName", "startedAt", "status"].forEach((field) => {
    requireNonEmptyString(input, field, issues);
  });
  if (input.createdNewSequence !== true) {
    issues.push({ path: "createdNewSequence", message: "Execution must target a new sequence." });
  }
  if (input.sourceTimelineModified !== false) {
    issues.push({ path: "sourceTimelineModified", message: "Source timeline must remain untouched." });
  }
  if (!Array.isArray(input.actions)) {
    issues.push({ path: "actions", message: "Expected an action report array." });
  } else {
    input.actions.forEach((action, index) => {
      const path = `actions[${index}]`;
      if (!isRecord(action)) {
        issues.push({ path, message: "Expected an action report object." });
        return;
      }
      if (!isString(action.action) || !COMMAND_ACTIONS.includes(action.action as (typeof COMMAND_ACTIONS)[number])) {
        issues.push({ path: `${path}.action`, message: "Unknown command action." });
      }
      requireNonEmptyString(action, "commandId", issues, path);
      requireNonEmptyString(action, "message", issues, path);
      requireNonEmptyString(action, "completedAt", issues, path);
      if (typeof action.success !== "boolean") {
        issues.push({ path: `${path}.success`, message: "Expected a success flag." });
      }
    });
  }

  return issues.length === 0
    ? { valid: true, value: input as unknown as ExecutionReport, issues }
    : { valid: false, issues };
}

export function validatePersistedAutoReelJob(input: unknown): ValidationResult<AutoReelJob> {
  if (!isRecord(input)) {
    return invalid("job", "Expected an object.");
  }

  const issues: ValidationIssue[] = [];
  if (input.schemaVersion !== 1) {
    issues.push({ path: "schemaVersion", message: "Unsupported Auto Reel job schema." });
  }
  requireNonEmptyString(input, "id", issues);
  requireNonEmptyString(input, "createdAt", issues);
  requireNonEmptyString(input, "updatedAt", issues);
  if (!isString(input.state) || !AUTO_REEL_JOB_STATES.includes(input.state as (typeof AUTO_REEL_JOB_STATES)[number])) {
    issues.push({ path: "state", message: "Unknown Auto Reel job state." });
  }
  const requestResult = validateAutoReelRequest(input.request);
  issues.push(...prefixIssues("request", requestResult.issues));
  if (!isRecord(input.progress) || !isFiniteNumber(input.progress.current) || !isFiniteNumber(input.progress.total) || !isString(input.progress.message)) {
    issues.push({ path: "progress", message: "Invalid job progress." });
  }
  ["clips", "frameSamples", "audioExtractions", "visionSignals", "faceSignals", "expressionSignals", "weddingEventSignals", "extractionFailures", "scoreBreakdowns", "storyBeats", "revisions", "transitions", "warnings"].forEach((field) => {
    if (!Array.isArray(input[field])) {
      issues.push({ path: field, message: "Expected an array." });
    }
  });
  if (input.extraction !== undefined) {
    const extractionResult = validateAutoReelExtractionResult(input.extraction);
    issues.push(...prefixIssues("extraction", extractionResult.issues));
  }
  if (input.plan !== undefined) {
    const planResult = validateAiReelPlan(input.plan);
    issues.push(...prefixIssues("plan", planResult.issues));
  }
  if (input.executionReport !== undefined) {
    const reportResult = validateBridgeExecutionReport(input.executionReport);
    issues.push(...prefixIssues("executionReport", reportResult.issues));
  }

  if (input.scoring !== undefined) {
    if (!isRecord(input.scoring)) {
      issues.push({ path: "scoring", message: "Expected a scoring report object." });
    } else {
      requireNonEmptyString(input.scoring, "jobId", issues, "scoring");
      requireNonEmptyString(input.scoring, "scoringProfileId", issues, "scoring");
      requireNonEmptyString(input.scoring, "scoringEngineVersion", issues, "scoring");
      requireNonEmptyString(input.scoring, "startedAt", issues, "scoring");
      if (!Array.isArray(input.scoring.rankedClips)) {
        issues.push({ path: "scoring.rankedClips", message: "Expected a ranked clips array." });
      }
      if (!Array.isArray(input.scoring.warnings)) {
        issues.push({ path: "scoring.warnings", message: "Expected a warnings array." });
      }
    }
  }
  if (input.music !== undefined) {
    if (!isRecord(input.music)) {
      issues.push({ path: "music", message: "Expected a music analysis report object." });
    } else {
      requireNonEmptyString(input.music, "jobId", issues, "music");
      requireNonEmptyString(input.music, "musicAnalysisVersion", issues, "music");
    }
  }

  return issues.length === 0
    ? { valid: true, value: input as unknown as AutoReelJob, issues }
    : { valid: false, issues };
}

export function validateAutoReelAudioExtraction(input: unknown): ValidationResult<AutoReelJob["audioExtractions"][number]> {
  if (!isRecord(input)) {
    return invalid("audioExtraction", "Expected an object.");
  }

  const issues: ValidationIssue[] = [];
  ["id", "taskId", "sourceKind", "cacheKey", "cacheStatus", "extractionStatus", "extractedAt"].forEach((field) => {
    requireNonEmptyString(input, field, issues);
  });
  if (!Array.isArray(input.waveform)) {
    issues.push({ path: "waveform", message: "Expected a waveform array." });
  }

  return issues.length === 0
    ? { valid: true, value: input as unknown as AutoReelJob["audioExtractions"][number], issues }
    : { valid: false, issues };
}

export function validateAutoReelExtractionResult(input: unknown): ValidationResult<NonNullable<AutoReelJob["extraction"]>> {
  if (!isRecord(input)) {
    return invalid("extraction", "Expected an object.");
  }

  const issues: ValidationIssue[] = [];
  if (input.schemaVersion !== 1) {
    issues.push({ path: "schemaVersion", message: "Unsupported extraction schema." });
  }
  ["jobId", "requestId", "status", "startedAt", "completedAt"].forEach((field) => {
    requireNonEmptyString(input, field, issues);
  });
  if (!isRecord(input.sidecar)) {
    issues.push({ path: "sidecar", message: "Expected sidecar status metadata." });
  } else {
    requireNonEmptyString(input.sidecar, "status", issues, "sidecar");
  }
  if (!isRecord(input.progress)) {
    issues.push({ path: "progress", message: "Expected extraction progress metadata." });
  } else {
    const progress = input.progress;
    [
      "completedClips",
      "remainingClips",
      "totalClips",
      "completedAudioTasks",
      "totalAudioTasks",
      "cacheHits",
      "cacheMisses"
    ].forEach((field) => requireFiniteNumber(progress, field, issues, "progress"));
  }
  ["clipResults", "frameSamples", "audioExtractions", "failures", "warnings"].forEach((field) => {
    if (!Array.isArray(input[field])) {
      issues.push({ path: field, message: "Expected an array." });
    }
  });
  if (Array.isArray(input.audioExtractions)) {
    input.audioExtractions.forEach((entry, index) => {
      const result = validateAutoReelAudioExtraction(entry);
      issues.push(...prefixIssues(`audioExtractions[${index}]`, result.issues));
    });
  }

  return issues.length === 0
    ? { valid: true, value: input as unknown as NonNullable<AutoReelJob["extraction"]>, issues }
    : { valid: false, issues };
}

function invalid(path: string, message: string): ValidationResult<never> {
  return { valid: false, issues: [{ path, message }] };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isPositiveNumber(value: unknown): value is number {
  return isFiniteNumber(value) && value > 0;
}



function requireNonEmptyString(record: Record<string, unknown>, field: string, issues: ValidationIssue[], prefix = ""): void {
  const value = record[field];
  if (!isString(value) || value.trim().length === 0) {
    issues.push({ path: prefix ? `${prefix}.${field}` : field, message: "Expected a non-empty string." });
  }
}

function requireFiniteNumber(record: Record<string, unknown>, field: string, issues: ValidationIssue[], prefix = ""): void {
  if (!isFiniteNumber(record[field])) {
    issues.push({ path: prefix ? `${prefix}.${field}` : field, message: "Expected a finite number." });
  }
}

function requirePositiveNumber(record: Record<string, unknown>, field: string, issues: ValidationIssue[]): void {
  if (!isPositiveNumber(record[field])) {
    issues.push({ path: field, message: "Expected a positive number." });
  }
}

function prefixIssues(prefix: string, issues: ValidationIssue[]): ValidationIssue[] {
  return issues.map((issue) => ({ path: `${prefix}.${issue.path}`, message: issue.message }));
}
