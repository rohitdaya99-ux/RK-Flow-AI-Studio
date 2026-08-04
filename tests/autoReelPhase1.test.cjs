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
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX
    },
    fileName: filename
  }).outputText;
  module._compile(output, filename);
};

require.extensions[".tsx"] = require.extensions[".ts"];

const {
  createAutoReelJob,
  serializeAutoReelJob,
  transitionAutoReelJob
} = require("../src/features/auto-reel/models.ts");
const {
  validateAutoReelAudioExtraction,
  validateAutoReelExtractionResult,
  validateAiReelPlan,
  validateAutoReelRequest,
  validateAutoReelSetupConfig,
  validateBridgeExecutionReport,
  validatePersistedAutoReelJob
} = require("../src/features/auto-reel/validation.ts");
const { AutoReelJobMemory } = require("../src/features/auto-reel/AutoReelJobMemory.ts");
const {
  buildSetupConfig,
  createDefaultAutoReelSetupState,
  getAutoReelEffectiveWidth,
  getAutoReelLayoutMode,
  serializeAutoReelSetupIntoRequest,
  validateAutoReelSetupState
} = require("../src/features/auto-reel/autoReelSetupConfig.ts");
const {
  AutoReelScanCancelledError,
  scanAutoReelTimeline
} = require("../src/features/auto-reel/autoReelScanner.ts");
const {
  buildExtractionProgressMessage,
  buildAutoReelExtractionRequest,
  runAutoReelExtractionStage
} = require("../src/features/auto-reel/autoReelExtractionService.ts");
const {
  buildExtractionCacheKey,
  buildFrameSamplePlan
} = require("../src/features/auto-reel/autoReelExtractionUtils.ts");
const {
  AutoReelSidecarUnavailableError,
  mapSidecarHealthResponse
} = require("../src/features/auto-reel/autoReelSidecarClient.ts");
const { runVisionPipeline } = require("../src/features/auto-reel/visionPipeline.ts");
const { AUTO_REEL_LAYOUT_FIXTURE_WIDTHS } = require("../src/features/auto-reel/AutoReelLayoutFixture.tsx");
const {
  formatModuleNavLabel,
  NAV_BADGE_ROW_STYLE,
  NAV_LABEL_STACK_STYLE,
  WORKSPACE_CONTENT_COLUMN_STYLE,
  WORKSPACE_SCROLL_REGION_STYLE
} = require("../src/layout/appShellLayout.ts");

function request() {
  return {
    id: "request-1",
    prompt: "Bride entry aur varmala pe focus karo",
    mediaSelection: selection(),
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

function selection(overrides = {}) {
  return {
    mode: "selected-clips",
    projectId: "project-1",
    sequenceId: "sequence-1",
    sequenceName: "Wedding Reel Timeline",
    clipIds: ["clip-1"],
    projectItemIds: ["item-1"],
    inPointSeconds: 0,
    outPointSeconds: 30,
    usedFallback: false,
    sequenceResolution: { width: 1920, height: 1080 },
    fps: 25,
    timebase: 25,
    playheadSeconds: 6,
    selectedClipCount: 1,
    scannedClipCount: 1,
    mediaFingerprint: "fp-1",
    cacheKey: "cache-1",
    capabilityNotes: [],
    ...overrides
  };
}

function timelineClip(id, overrides = {}) {
  return {
    id,
    name: overrides.name ?? id,
    start: overrides.start ?? 0,
    end: overrides.end ?? 4,
    duration: overrides.duration ?? ((overrides.end ?? 4) - (overrides.start ?? 0)),
    trackIndex: overrides.trackIndex ?? 0,
    selected: overrides.selected ?? false,
    mediaPath: overrides.mediaPath === undefined ? `/media/${id}.mp4` : overrides.mediaPath,
    projectItemId: overrides.projectItemId === undefined ? `item-${id}` : overrides.projectItemId,
    projectItemNodeId: overrides.projectItemNodeId === undefined ? `node-${id}` : overrides.projectItemNodeId,
    mediaType: overrides.mediaType ?? "video",
    itemType: overrides.itemType ?? "clip",
    sourceIn: overrides.sourceIn === undefined ? 0 : overrides.sourceIn,
    sourceOut: overrides.sourceOut === undefined ? 4 : overrides.sourceOut,
    speed: overrides.speed === undefined ? 1 : overrides.speed,
    disabled: overrides.disabled === undefined ? false : overrides.disabled,
    linkedClipIds: overrides.linkedClipIds === undefined ? null : overrides.linkedClipIds,
    proxyState: overrides.proxyState === undefined ? null : overrides.proxyState,
    sourceFrameSize: overrides.sourceFrameSize === undefined ? null : overrides.sourceFrameSize,
    capabilityNotes: overrides.capabilityNotes ?? []
  };
}

function timelineState({
  videoClips = [],
  audioClips = [],
  fps = 25,
  timebase = 25,
  frameSize = { width: 1920, height: 1080 },
  inPoint = 0,
  outPoint = 60,
  playhead = 10,
  capabilityNotes = []
} = {}) {
  return {
    sequenceName: "Wedding Reel Timeline",
    fps,
    timebase,
    frameSize,
    duration: 60,
    playhead,
    inPoint,
    outPoint,
    videoTracks: [{ id: "video-1", name: "Video 1", type: "video", locked: null, capabilityNotes: [], clips: videoClips }],
    audioTracks: [{ id: "audio-1", name: "Audio 1", type: "audio", locked: null, capabilityNotes: [], clips: audioClips }],
    markers: [],
    capabilityNotes
  };
}

function projectItemOptions() {
  return [
    { id: "bin-ceremony", label: "Ceremony Bin", type: "bin", ancestorIds: [] },
    { id: "item-selected", label: "Selected Clip", type: "clip", projectItemId: "item-selected", ancestorIds: ["bin-ceremony"] },
    { id: "item-manual", label: "Manual Clip", type: "clip", projectItemId: "item-manual", ancestorIds: [] }
  ];
}

function extractionContext(overrides = {}) {
  return {
    connected: true,
    projectOptions: [],
    sequenceOptions: [],
    activeProjectId: "project-1",
    activeSequenceId: "sequence-1",
    projectName: "Wedding Project",
    sequenceName: "Wedding Sequence",
    clipCount: 2,
    selectedClipCount: 1,
    inPointSeconds: 0,
    outPointSeconds: 60,
    durationSeconds: 60,
    fps: 25,
    timebase: 25,
    frameSize: { width: 1920, height: 1080 },
    projectItemOptions: [
      { id: "music-item", label: "Song", mediaPath: "/approved/song.wav", projectItemId: "music-item", nodeId: "node-music", ancestorIds: [], type: "audio" }
    ],
    manualClipOptions: [],
    musicOptions: [],
    selectedClips: [],
    sequenceClips: [],
    timeline: null,
    lockedTrackSupport: "unavailable",
    ...overrides
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

test("Phase 2 setup defaults and serialization produce a strict AutoReelRequest", () => {
  const setup = createDefaultAutoReelSetupState({
    outputSequenceName: "Wedding Highlight - Baby Shower",
    musicSourceMode: "none"
  });
  const requestFromSetup = serializeAutoReelSetupIntoRequest(setup, {
    id: "request-2",
    prompt: "Prepare setup only",
    mediaSelection: selection({
      mode: "active-sequence",
      clipIds: ["clip-1", "clip-2"],
      projectItemIds: ["item-1"],
      scannedClipCount: 2
    }),
    targetDurationSeconds: 60,
    outputSequenceName: "Wedding Highlight - Baby Shower",
    styleHints: ["style:signature"],
    preferredEvents: ["Bride Entry"],
    excludedClipIds: [],
    submittedAt: "2026-08-04T00:00:00.000Z"
  });

  assert.equal(setup.createNewSequence, true);
  assert.equal(setup.includeDisabledClips, false);
  assert.equal(setup.includeAudioOnlyItems, false);
  assert.equal(setup.includeStillItems, false);
  assert.equal(setup.minimumClipCount, 8);
  assert.equal(setup.maximumClipCount, 60);
  assert.equal(requestFromSetup.setup.outputSequenceName, "Wedding Highlight - Baby Shower");
  assert.equal(validateAutoReelRequest(requestFromSetup).valid, true);
  assert.equal(validateAutoReelSetupConfig(buildSetupConfig(setup)).valid, true);
});

test("Phase 2 setup validation blocks invalid durations, URLs, and clip-count ranges", () => {
  const setup = createDefaultAutoReelSetupState({
    targetDurationSeconds: 5,
    minimumClipCount: 12,
    maximumClipCount: 3,
    musicSourceMode: "authorized-direct-url",
    musicDirectUrl: "https://example.com/not-audio.txt",
    copyrightNoticeAccepted: true,
    referenceReelUrl: "notaurl"
  });

  const result = validateAutoReelSetupState(setup, {
    availableClipCount: 24,
    selectedClipCount: 3,
    availableProjectItemIds: ["asset-1"],
    availableManualClipIds: ["clip-1"]
  });

  assert.equal(result.fields.targetDurationSeconds, "Target duration must be between 15 and 300 seconds.");
  assert.equal(result.fields.clipCountRange, "Minimum clip count cannot exceed the maximum.");
  assert.equal(result.fields.musicSource, "Enter a valid direct audio URL ending in a media file extension.");
  assert.equal(result.fields.referenceReel, "Enter a valid Instagram or YouTube URL.");
});

test("Phase 2 layout helper stays responsive across narrow and wide widths", () => {
  assert.equal(getAutoReelLayoutMode(280), "compact");
  assert.equal(getAutoReelLayoutMode(500), "medium");
  assert.equal(getAutoReelLayoutMode(900), "regular");
  assert.equal(getAutoReelLayoutMode(1146), "wide");
  assert.equal(getAutoReelLayoutMode(1400), "wide");
});

test("Phase 2 layout prefers measured workspace width over the shell viewport", () => {
  assert.equal(getAutoReelEffectiveWidth(280, 1146), 280);
  assert.equal(getAutoReelEffectiveWidth(500, 1146), 500);
  assert.equal(getAutoReelEffectiveWidth(900, 1146), 900);
  assert.equal(getAutoReelEffectiveWidth(1146, 1440), 1146);
  assert.equal(getAutoReelEffectiveWidth(null, 1440), 1440);
  assert.equal(getAutoReelLayoutMode(getAutoReelEffectiveWidth(900, 1146)), "regular");
  assert.equal(getAutoReelLayoutMode(getAutoReelEffectiveWidth(1146, 1440)), "wide");
});

test("Phase 2 layout fixture covers the audited host widths", () => {
  assert.deepEqual(Array.from(AUTO_REEL_LAYOUT_FIXTURE_WIDTHS), [280, 500, 900, 1146, 1440]);
});

test("Workspace scroll contract reserves space below the shell header", () => {
  assert.equal(WORKSPACE_CONTENT_COLUMN_STYLE.display, "flex");
  assert.equal(WORKSPACE_CONTENT_COLUMN_STYLE.flexDirection, "column");
  assert.equal(WORKSPACE_CONTENT_COLUMN_STYLE.overflow, "hidden");
  assert.equal(WORKSPACE_SCROLL_REGION_STYLE.flex, "1 1 auto");
  assert.equal(WORKSPACE_SCROLL_REGION_STYLE.minHeight, 0);
});

test("Navigation label and phase badge remain separate layout elements", () => {
  assert.equal(NAV_LABEL_STACK_STYLE.display, "flex");
  assert.equal(NAV_LABEL_STACK_STYLE.flexDirection, "column");
  assert.equal(NAV_BADGE_ROW_STYLE.display, "flex");
  assert.equal(formatModuleNavLabel("Auto Reel", 2), "Auto Reel Phase 2");
});

test("Phase 3 scanner filters source modes, manual picks, and project-item bins", async () => {
  const clips = [
    timelineClip("clip-selected", { selected: true, projectItemId: "item-selected" }),
    timelineClip("clip-manual", { start: 5, end: 9, projectItemId: "item-manual" }),
    timelineClip("clip-bin-child", { start: 10, end: 14, projectItemId: "item-selected" })
  ];
  const timeline = timelineState({ videoClips: clips });

  const selectedResult = await scanAutoReelTimeline({
    projectId: "project-1",
    sequenceId: "sequence-1",
    sequenceName: "Wedding Reel Timeline",
    timeline,
    state: createDefaultAutoReelSetupState({ sourceMode: "selected-clips", minimumClipCount: 1, maximumClipCount: 10 }),
    projectItemOptions: projectItemOptions()
  });
  assert.deepEqual(selectedResult.selection.clipIds, ["clip-selected"]);

  const manualResult = await scanAutoReelTimeline({
    projectId: "project-1",
    sequenceId: "sequence-1",
    sequenceName: "Wedding Reel Timeline",
    timeline,
    state: createDefaultAutoReelSetupState({ sourceMode: "manual-selection", manualClipIds: ["clip-manual"], minimumClipCount: 1, maximumClipCount: 10 }),
    projectItemOptions: projectItemOptions()
  });
  assert.deepEqual(manualResult.selection.clipIds, ["clip-manual"]);

  const projectItemResult = await scanAutoReelTimeline({
    projectId: "project-1",
    sequenceId: "sequence-1",
    sequenceName: "Wedding Reel Timeline",
    timeline,
    state: createDefaultAutoReelSetupState({ sourceMode: "project-items", selectedProjectItemIds: ["bin-ceremony"], minimumClipCount: 1, maximumClipCount: 10 }),
    projectItemOptions: projectItemOptions()
  });
  assert.deepEqual(projectItemResult.selection.clipIds, ["clip-selected", "clip-bin-child"]);
});

test("Phase 3 scanner applies sequence in/out filtering", async () => {
  const result = await scanAutoReelTimeline({
    projectId: "project-1",
    sequenceId: "sequence-1",
    sequenceName: "Wedding Reel Timeline",
    timeline: timelineState({
      inPoint: 10,
      outPoint: 20,
      videoClips: [
        timelineClip("clip-before", { start: 0, end: 5 }),
        timelineClip("clip-overlap-a", { start: 8, end: 12 }),
        timelineClip("clip-overlap-b", { start: 18, end: 22 }),
        timelineClip("clip-after", { start: 25, end: 28 })
      ]
    }),
    state: createDefaultAutoReelSetupState({ sourceMode: "in-out-range", minimumClipCount: 1, maximumClipCount: 10 }),
    projectItemOptions: []
  });

  assert.deepEqual(result.selection.clipIds, ["clip-overlap-a", "clip-overlap-b"]);
});

test("Phase 3 scanner supports more than 15 clips and trims only at the configured maximum", async () => {
  const clips = Array.from({ length: 20 }, (_, index) =>
    timelineClip(`clip-${index + 1}`, { start: index * 4, end: index * 4 + 3.5, projectItemId: `item-${index + 1}` })
  );
  const timeline = timelineState({ videoClips: clips });

  const fullResult = await scanAutoReelTimeline({
    projectId: "project-1",
    sequenceId: "sequence-1",
    sequenceName: "Wedding Reel Timeline",
    timeline,
    state: createDefaultAutoReelSetupState({ sourceMode: "active-sequence", minimumClipCount: 1, maximumClipCount: 20 }),
    projectItemOptions: []
  });
  assert.equal(fullResult.descriptors.length, 20);

  const trimmedResult = await scanAutoReelTimeline({
    projectId: "project-1",
    sequenceId: "sequence-1",
    sequenceName: "Wedding Reel Timeline",
    timeline,
    state: createDefaultAutoReelSetupState({ sourceMode: "active-sequence", minimumClipCount: 1, maximumClipCount: 15 }),
    projectItemOptions: []
  });
  assert.equal(trimmedResult.descriptors.length, 15);
  assert.match(trimmedResult.warnings.join(" "), /maximum clip count is 15/);
});

test("Phase 3 scanner generates stable IDs and serializable clip descriptors", async () => {
  const timeline = timelineState({
    videoClips: [timelineClip("clip-stable", { start: 12, end: 18, projectItemId: "item-stable" })]
  });
  const state = createDefaultAutoReelSetupState({ sourceMode: "active-sequence", minimumClipCount: 1, maximumClipCount: 5 });

  const first = await scanAutoReelTimeline({
    projectId: "project-1",
    sequenceId: "sequence-1",
    sequenceName: "Wedding Reel Timeline",
    timeline,
    state,
    projectItemOptions: []
  });
  const second = await scanAutoReelTimeline({
    projectId: "project-1",
    sequenceId: "sequence-1",
    sequenceName: "Wedding Reel Timeline",
    timeline,
    state,
    projectItemOptions: []
  });

  assert.equal(first.descriptors[0].id, second.descriptors[0].id);
  assert.equal(first.descriptors[0].mediaFingerprint, second.descriptors[0].mediaFingerprint);
  assert.doesNotThrow(() => JSON.parse(JSON.stringify(first.descriptors[0])));
});

test("Phase 3 scanner keeps unavailable metadata null with capability reasons", async () => {
  const result = await scanAutoReelTimeline({
    projectId: "project-1",
    sequenceId: "sequence-1",
    sequenceName: "Wedding Reel Timeline",
    timeline: timelineState({
      videoClips: [
        timelineClip("clip-nullable", {
          mediaPath: null,
          sourceIn: null,
          sourceOut: null,
          speed: null,
          disabled: null,
          capabilityNotes: [
            { field: "mediaPath", source: "unavailable", reason: "Host path unavailable." }
          ]
        })
      ],
      capabilityNotes: [{ field: "timebase", source: "unavailable", reason: "No timebase." }]
    }),
    state: createDefaultAutoReelSetupState({ sourceMode: "active-sequence", minimumClipCount: 1, maximumClipCount: 5 }),
    projectItemOptions: []
  });

  const descriptor = result.descriptors[0];
  assert.equal(descriptor.mediaPath, null);
  assert.equal(descriptor.sourceInSeconds, null);
  assert.equal(descriptor.sourceOutSeconds, null);
  assert.equal(descriptor.speed, null);
  assert.equal(descriptor.disabled, null);
  assert.equal(descriptor.linkedClipIds, null);
  assert.ok(descriptor.capabilityNotes.some((note) => note.field === "mediaPath"));
  assert.ok(descriptor.capabilityNotes.some((note) => note.field === "linkedClipIds"));
});

test("Phase 3 scanner supports cancellation", async () => {
  const controller = new AbortController();
  const clips = Array.from({ length: 6 }, (_, index) =>
    timelineClip(`clip-cancel-${index + 1}`, { start: index * 3, end: index * 3 + 2.5 })
  );

  await assert.rejects(
    scanAutoReelTimeline({
      projectId: "project-1",
      sequenceId: "sequence-1",
      sequenceName: "Wedding Reel Timeline",
      timeline: timelineState({ videoClips: clips }),
      state: createDefaultAutoReelSetupState({ sourceMode: "active-sequence", minimumClipCount: 1, maximumClipCount: 10 }),
      projectItemOptions: [],
      signal: controller.signal,
      onProgress: (progress) => {
        if (progress.phase === "scanning-clips" && progress.current === 2) {
          controller.abort();
        }
      }
    }),
    (error) => error instanceof AutoReelScanCancelledError
  );
});

test("Phase 3 scanner reports progress with readable messages", async () => {
  const updates = [];
  await scanAutoReelTimeline({
    projectId: "project-1",
    sequenceId: "sequence-1",
    sequenceName: "Wedding Reel Timeline",
    timeline: timelineState({
      videoClips: [
        timelineClip("clip-progress-a", { selected: true }),
        timelineClip("clip-progress-b", { start: 5, end: 8 })
      ]
    }),
    state: createDefaultAutoReelSetupState({ sourceMode: "active-sequence", minimumClipCount: 1, maximumClipCount: 10 }),
    projectItemOptions: [],
    onProgress: (progress) => updates.push(progress)
  });

  assert.equal(updates[0].phase, "resolving-source");
  assert.equal(updates.at(-1).phase, "complete");
  assert.equal(updates.at(-1).percent, 100);
  assert.ok(updates.some((progress) => progress.phase === "scanning-clips" && /Scanning/.test(progress.message)));
});

test("Phase 4 extraction cache keys stay deterministic for identical inputs", () => {
  const first = buildExtractionCacheKey({
    category: "clip-frames",
    mediaFingerprint: "fingerprint-a",
    version: "phase-4-extraction-v1",
    parameters: { sourceOutSeconds: 4, sourceInSeconds: 0, clipId: "clip-1" }
  });
  const second = buildExtractionCacheKey({
    category: "clip-frames",
    mediaFingerprint: "fingerprint-a",
    version: "phase-4-extraction-v1",
    parameters: { clipId: "clip-1", sourceInSeconds: 0, sourceOutSeconds: 4 }
  });

  assert.equal(first, second);
});

test("Phase 4 frame sampling always includes start middle end and sorted adaptive hooks", () => {
  const plan = buildFrameSamplePlan({
    id: "clip-1",
    sourceInSeconds: 10,
    sourceOutSeconds: 20,
    cacheKey: "cache-1"
  }, [18, 12, 18]);

  assert.deepEqual(
    plan.map((sample) => [sample.sampleKind, sample.sourceTimeSeconds]),
    [
      ["start", 10],
      ["middle", 15],
      ["end", 20],
      ["custom", 12],
      ["custom", 18]
    ]
  );
});

test("Phase 4 extraction preflight marks missing clip media paths unavailable", () => {
  const setup = createDefaultAutoReelSetupState({
    musicSourceMode: "none"
  });
  const requestValue = {
    ...request(),
    setup: buildSetupConfig(setup)
  };
  const job = createAutoReelJob(requestValue, "job-phase4");
  const preflight = buildAutoReelExtractionRequest({
    job,
    request: requestValue,
    clips: [
      {
        id: "clip-1",
        name: "Clip 1",
        mediaType: "video",
        mediaPath: null,
        sourceInSeconds: 0,
        sourceOutSeconds: 4,
        speed: 1,
        disabled: false,
        selected: true,
        linkedClipIds: null,
        mediaFingerprint: "fp-1",
        cacheKey: "cache-1",
        metadataStatus: "host-verified",
        capabilityNotes: []
      }
    ],
    context: extractionContext()
  });

  assert.equal(preflight.request.frameTasks.length, 0);
  assert.equal(preflight.preflightFrameSamples.length, 3);
  assert.equal(preflight.preflightFailures[0].status, "unavailable");
});

test("Phase 4 sidecar health mapping rejects non-localhost responses", () => {
  const mapped = mapSidecarHealthResponse(
    { status: "ok", bind: "0.0.0.0", version: "phase-4-sidecar-v1" },
    { bind: "0.0.0.0", features: ["frame-extraction"] },
    "http://127.0.0.1:43191"
  );

  assert.equal(mapped.available, false);
  assert.match(mapped.reason, /localhost-only/);
});

test("Phase 4 extraction falls back honestly when the sidecar is unavailable", async () => {
  const setup = createDefaultAutoReelSetupState({
    musicSourceMode: "project-item",
    musicProjectItemId: "music-item",
    extractClipAudio: true,
    copyrightNoticeAccepted: true
  });
  const requestValue = {
    ...request(),
    setup: buildSetupConfig(setup)
  };
  const job = createAutoReelJob(requestValue, "job-phase4");
  const stage = await runAutoReelExtractionStage({
    job,
    request: requestValue,
    clips: [
      {
        id: "clip-1",
        name: "Clip 1",
        mediaType: "video",
        mediaPath: "/approved/clip-1.mp4",
        sourceInSeconds: 0,
        sourceOutSeconds: 4,
        speed: 1,
        disabled: false,
        selected: true,
        linkedClipIds: null,
        mediaFingerprint: "fp-1",
        cacheKey: "cache-1",
        metadataStatus: "host-verified",
        capabilityNotes: []
      }
    ],
    context: extractionContext(),
    client: {
      runExtractionJob: async () => {
        throw new AutoReelSidecarUnavailableError("Sidecar offline");
      }
    }
  });

  assert.equal(stage.extraction.status, "sidecar-unavailable");
  assert.equal(stage.extraction.sidecar.status, "unavailable");
  assert.ok(stage.frameSamples.every((sample) => sample.extractionStatus !== "available"));
  assert.match(buildExtractionProgressMessage(stage.extraction), /cache/);
});

test("Phase 4 extraction serialization validator accepts structured extraction payloads", () => {
  const extraction = {
    schemaVersion: 1,
    jobId: "job-1",
    requestId: "request-1",
    status: "completed",
    sidecar: { status: "available", baseUrl: "http://127.0.0.1:43191", version: "phase-4-sidecar-v1" },
    progress: {
      completedClips: 1,
      remainingClips: 0,
      totalClips: 1,
      completedAudioTasks: 1,
      totalAudioTasks: 1,
      cacheHits: 1,
      cacheMisses: 1
    },
    clipResults: [],
    frameSamples: [],
    audioExtractions: [],
    failures: [],
    warnings: [],
    startedAt: "2026-08-04T00:00:00.000Z",
    completedAt: "2026-08-04T00:01:00.000Z"
  };

  assert.equal(validateAutoReelExtractionResult(extraction).valid, true);
});

test("Phase 4 audio metadata serialization validator accepts extracted audio payloads", () => {
  const audio = {
    id: "audio-1",
    taskId: "audio-1",
    sourceKind: "selected-song",
    cacheKey: "cache-audio",
    cacheStatus: "hit",
    extractionStatus: "available",
    durationSeconds: 45,
    sampleRate: 16000,
    channels: 1,
    codec: "pcm_s16le",
    waveform: [{ timeSeconds: 0, amplitude: 0.5 }],
    extractedAt: "2026-08-04T00:00:00.000Z"
  };

  assert.equal(validateAutoReelAudioExtraction(audio).valid, true);
});

test("Phase 5 Vision pipeline reports a truthful reason when extraction has no frames", async () => {
  const job = createAutoReelJob(request(), "vision-empty");
  const result = await runVisionPipeline({ job });
  assert.equal(result.status, "sidecar-unavailable");
  assert.match(result.warnings[0], /extracted image frames/);
  assert.equal(JSON.parse(JSON.stringify(result)).visionVersion, "phase-5-vision-v1");
});

test("Phase 5 Vision pipeline sends only available extracted frames to the existing sidecar", async () => {
  const job = createAutoReelJob(request(), "vision-frame");
  job.clips = [{ id: "clip-1", name: "Clip 1", mediaType: "video", mediaPath: "/approved/source.mp4", sourceInSeconds: 0, sourceOutSeconds: 2, speed: 1, disabled: false, selected: true, linkedClipIds: null, mediaFingerprint: "fp", cacheKey: "clip-cache", metadataStatus: "host-verified", capabilityNotes: [] }];
  job.frameSamples = [{ id: "sample-1", clipId: "clip-1", sourceTimeSeconds: 1, sampleKind: "middle", imagePath: "/approved/cache/sample.jpg", contentHash: "frame-fingerprint", cacheKey: "extract-cache", extractionStatus: "available", capturedAt: "2026-08-04T00:00:00.000Z" }, { id: "missing", clipId: "clip-1", sourceTimeSeconds: 2, sampleKind: "end", extractionStatus: "unavailable", capturedAt: "2026-08-04T00:00:00.000Z" }];
  let sent;
  const result = await runVisionPipeline({ job, client: {
    getVisionCapabilities: async () => ({ available: true, version: "v", gpuAccelerated: false, cpuFallback: true, opencvVersion: "x", numpyVersion: "x", pillowVersion: "x", onnxRuntimeProviders: [], openVinoAvailable: false, modules: ["opencv"], features: [], reason: undefined }),
    runVisionJob: async (payload) => { sent = payload; return { schemaVersion: 1, jobId: job.id, requestId: "r", status: "completed", sidecar: { status: "available" }, visionVersion: "phase-5-vision-v1", gpuAccelerated: false, progress: { completedFrames: 1, totalFrames: 1, completedClips: 1, totalClips: 1, cacheHits: 0, cacheMisses: 1 }, clips: [], failures: [], warnings: [], startedAt: "2026-08-04T00:00:00.000Z", completedAt: "2026-08-04T00:00:01.000Z" }; }
  }});
  assert.equal(result.status, "completed");
  assert.equal(sent.frames.length, 1);
  assert.equal(sent.frames[0].contentHash, "frame-fingerprint");
  assert.equal(sent.approvedRoots[0], "/approved/cache");
});
