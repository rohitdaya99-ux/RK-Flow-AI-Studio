const fs = require("node:fs");
const test = require("node:test");
const assert = require("node:assert/strict");
const ts = require("typescript");

require.extensions[".ts"] = function compileTypeScript(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true
    },
    fileName: filename
  }).outputText;
  module._compile(output, filename);
};

const {
  createAutoReelJob,
  serializeAutoReelJob,
  transitionAutoReelJob
} = require("../src/features/auto-reel/models.ts");
const {
  validateAiReelPlan,
  validateAutoReelRequest,
  validateBridgeExecutionReport,
  validatePersistedAutoReelJob
} = require("../src/features/auto-reel/validation.ts");
const { AutoReelJobMemory } = require("../src/features/auto-reel/AutoReelJobMemory.ts");

function request() {
  return {
    id: "request-1",
    prompt: "Bride entry aur varmala pe focus karo",
    mediaSelection: {
      mode: "selected-clips",
      clipIds: ["clip-1"],
      projectItemIds: ["item-1"],
      usedFallback: false
    },
    targetDurationSeconds: 60,
    aspectRatio: "9:16",
    outputSequenceName: "Wedding Reel",
    createNewSequence: true,
    styleHints: ["cinematic"],
    preferredEvents: ["bride-entry", "varmala"],
    excludedClipIds: [],
    submittedAt: "2026-08-04T00:00:00.000Z"
  };
}

function plan() {
  return {
    id: "plan-1",
    jobId: "job-1",
    requestId: "request-1",
    version: 1,
    title: "Wedding Reel",
    intentSummary: "Bride entry and varmala story",
    targetDurationSeconds: 60,
    totalDurationSeconds: 5,
    segments: [{
      id: "segment-1",
      order: 1,
      storyBeatId: "beat-1",
      clipId: "clip-1",
      projectItemId: "item-1",
      sourceInSeconds: 0,
      sourceOutSeconds: 5,
      timelineStartSeconds: 0,
      durationSeconds: 5,
      score: 92,
      reason: "Bride smile during entry",
      locked: false
    }],
    storyBeats: [],
    transitions: [],
    motionDecisions: [],
    sfxDecisions: [],
    colorSuggestions: [],
    rejectedClipIds: [],
    warnings: [],
    generatedAt: "2026-08-04T00:00:00.000Z"
  };
}

test("Auto Reel job only permits ordered state transitions", () => {
  const job = createAutoReelJob(request(), "job-1", "2026-08-04T00:00:00.000Z");
  assert.throws(() => transitionAutoReelJob(job, "executing"), /Invalid Auto Reel job transition/);

  const validating = transitionAutoReelJob(job, "validating", { at: "2026-08-04T00:00:01.000Z" });
  const scanning = transitionAutoReelJob(validating, "scanning", { at: "2026-08-04T00:00:02.000Z" });
  const scoring = transitionAutoReelJob(scanning, "scoring", { at: "2026-08-04T00:00:03.000Z" });
  const planning = transitionAutoReelJob(scoring, "planning", { at: "2026-08-04T00:00:04.000Z" });
  const review = transitionAutoReelJob(planning, "awaiting_review", { at: "2026-08-04T00:00:05.000Z" });

  assert.equal(review.state, "awaiting_review");
  assert.equal(review.transitions.length, 5);
});

test("Auto Reel job serialization remains resumable through MemoryEngine", () => {
  const values = new Map();
  const memory = {
    getAnalysis(scope, key) {
      return values.get(`${scope}::${key}`) ?? null;
    },
    setAnalysis(scope, key, value) {
      values.set(`${scope}::${key}`, value);
    }
  };
  const job = createAutoReelJob(request(), "job-1", "2026-08-04T00:00:00.000Z");
  const serialized = serializeAutoReelJob(job);
  const restored = JSON.parse(serialized);

  assert.equal(validatePersistedAutoReelJob(restored).valid, true);
  const jobs = new AutoReelJobMemory(memory);
  jobs.save(job);
  assert.deepEqual(jobs.get("job-1"), job);
  assert.equal(jobs.list().length, 1);
});

test("AI plan and Premiere bridge reports reject unsafe or malformed values", () => {
  assert.equal(validateAutoReelRequest(request()).valid, true);
  assert.equal(validateAiReelPlan(plan()).valid, true);
  assert.equal(validateBridgeExecutionReport({
    id: "report-1",
    jobId: "job-1",
    planId: "plan-1",
    outputSequenceName: "Wedding Reel",
    createdNewSequence: true,
    sourceTimelineModified: false,
    actions: [{
      commandId: "command-1",
      action: "ADD_CLIP_TO_SEQUENCE",
      success: true,
      message: "Inserted clip",
      completedAt: "2026-08-04T00:00:00.000Z"
    }],
    startedAt: "2026-08-04T00:00:00.000Z",
    status: "completed"
  }).valid, true);

  const unsafeRequest = { ...request(), createNewSequence: false };
  const malformedPlan = { ...plan(), segments: [{ ...plan().segments[0], durationSeconds: 0 }] };
  const unsafeReport = {
    id: "report-1",
    jobId: "job-1",
    planId: "plan-1",
    outputSequenceName: "Wedding Reel",
    createdNewSequence: true,
    sourceTimelineModified: true,
    actions: [],
    startedAt: "2026-08-04T00:00:00.000Z",
    status: "completed"
  };

  assert.equal(validateAutoReelRequest(unsafeRequest).valid, false);
  assert.equal(validateAiReelPlan(malformedPlan).valid, false);
  assert.equal(validateBridgeExecutionReport(unsafeReport).valid, false);
});
