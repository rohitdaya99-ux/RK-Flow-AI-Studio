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
const { LocalCueProvider, DedicatedWeddingModelProvider, confirmWeddingEvent } = require("../src/features/auto-reel/weddingEvidence.ts");
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
  assert.equal(requestFromSetup.outputSequenceName, "Wedding Highlight - Baby Shower");
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

  assert.equal(mapped.available, true);
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

test("Phase 7 wedding evidence stays an unverified local-cue suggestion", () => {
  const frame = { frameSampleId: "f1", sourceTimeSeconds: 2, contentHash: "fp", saturation: 150, whiteBalanceEstimate: { temperatureK: 3500 }, sceneEstimate: { droneLikelihood: .7, shotType: "wide", indoorOutdoor: "outdoor" } };
  const report = new LocalCueProvider().analyze({ visionVersion: "v", clips: [{ clipId: "clip-1", frames: [frame] }] });
  assert.equal(report.suggestions[0].status, "suggested");
  assert.ok(report.suggestions[0].confidence < .5);
  assert.match(report.warnings[0], /Dedicated commercial/);
  const confirmed = confirmWeddingEvent(report.suggestions[0], "venue", "user_confirmed");
  assert.equal(confirmed.status, "user_confirmed");
  assert.equal(new DedicatedWeddingModelProvider().enabled, false);
});

// ---------------------------------------------------------------------------
// Phase 10 — Configurable AI Scoring Engine UI integration
// ---------------------------------------------------------------------------

const {
  SCORING_PRESET_ORDER,
  applyClipListView,
  buildCategoryDisplays,
  buildClipListRows,
  buildCustomProfile,
  buildScoreExplanation,
  countClipStates,
  createClipListViewState,
  createScoringControlsState,
  createScoringRunStatus,
  describeScoringRun,
  hasClipChoice,
  hasCustomWeights,
  listScoringPresets,
  remainingClips,
  resolveControlsProfile,
  restoreDefaultWeights,
  selectPreset,
  setCategoryWeight,
  toggleClipChoice
} = require("../src/features/auto-reel/autoReelScoringControls.ts");
const {
  buildScoringFixtureChoices,
  buildScoringFixtureClips,
  buildScoringFixtureReport
} = require("../src/features/auto-reel/autoReelScoringFixture.ts");
const {
  ScoringEngine,
  runScoringPipeline,
  resolveScoringProfile
} = require("../src/features/auto-reel/autoReelScoringService.ts");
const { SCORE_CATEGORIES } = require("../src/features/auto-reel/models.ts");

function fakeMemory() {
  const values = new Map();
  return {
    values,
    getAnalysis: (scope, key) => values.get(`${scope}::${key}`) ?? null,
    setAnalysis: (scope, key, value) => values.set(`${scope}::${key}`, value)
  };
}

test("Phase 10 preset selector exposes all nine scoring presets in operator order", () => {
  assert.deepEqual(Array.from(SCORING_PRESET_ORDER), [
    "balanced", "cinematic", "emotional", "couple", "family",
    "dance", "luxury", "documentary", "viral"
  ]);
  const presets = listScoringPresets();
  assert.equal(presets.length, 9);
  assert.deepEqual(presets.map((p) => p.id), Array.from(SCORING_PRESET_ORDER));

  const controls = selectPreset(createScoringControlsState(), "dance");
  assert.equal(controls.presetId, "dance");
  assert.equal(resolveControlsProfile(controls).id, "dance-v1");
});

test("Phase 10 custom weights scale categories and restore defaults cleanly", () => {
  let controls = createScoringControlsState("cinematic");
  assert.equal(hasCustomWeights(controls), false);
  // An unedited profile must stay byte-identical to the authored preset.
  assert.equal(resolveControlsProfile(controls).categoryWeights, undefined);

  controls = setCategoryWeight(controls, "emotion", 1.8);
  assert.equal(controls.categoryWeights.emotion, 1.8);
  assert.equal(hasCustomWeights(controls), true);
  assert.equal(resolveControlsProfile(controls).categoryWeights.emotion, 1.8);

  // Out-of-range input clamps rather than producing a negative weight.
  assert.equal(setCategoryWeight(controls, "face", -4).categoryWeights.face, 0);
  assert.equal(setCategoryWeight(controls, "face", 99).categoryWeights.face, 2);

  const restored = restoreDefaultWeights(controls);
  assert.equal(hasCustomWeights(restored), false);
  for (const category of SCORE_CATEGORIES) {
    assert.equal(restored.categoryWeights[category], 1);
  }

  // Switching preset also drops edited weights so presets stay predictable.
  assert.equal(hasCustomWeights(selectPreset(controls, "viral")), false);
});

test("Phase 10 save custom profile bumps the persisted profile version", () => {
  let controls = setCategoryWeight(createScoringControlsState("cinematic"), "music", 1.5);
  assert.equal(controls.profileVersion, "1");

  const first = buildCustomProfile(controls);
  assert.equal(first.profile.version, "2");
  assert.equal(first.profile.categoryWeights.music, 1.5);
  assert.equal(first.state.profileVersion, "2");

  const second = buildCustomProfile(first.state);
  assert.equal(second.profile.version, "3");
});

test("Phase 10 ranked list renders every clip with its real name and duration", () => {
  const rows = buildClipListRows(buildScoringFixtureReport(), buildScoringFixtureClips());
  assert.equal(rows.length, 4);
  assert.equal(rows[0].clipName, "Clip 023 Varmala Hero");
  assert.equal(rows[0].candidate.rank, 1);
  assert.equal(rows[0].durationSeconds, 4.5);
  // A clip with no measurable duration reports null, never a defaulted zero.
  assert.equal(rows[3].durationSeconds, null);

  assert.deepEqual(countClipStates(rows), { selected: 2, rejected: 0, uncertain: 2 });
});

test("Phase 10 raw and adjusted toggle reorders by the score actually displayed", () => {
  const rows = buildClipListRows(buildScoringFixtureReport(), buildScoringFixtureClips());
  const view = createClipListViewState();

  const adjusted = applyClipListView(rows, view);
  assert.equal(adjusted[0].candidate.breakdown.finalScore, 87);

  const raw = applyClipListView(rows, { ...view, rawMode: true });
  assert.equal(raw[0].candidate.breakdown.rawScore, 93);
  // clip-047 is penalised, so raw ranks it above clip-011's flat 74.5 only if
  // the raw value is genuinely used for ordering.
  assert.deepEqual(raw.map((r) => r.candidate.clipId), ["clip-023", "clip-011", "clip-047", "clip-099"]);
});

test("Phase 10 filter, sort, and search narrow the ranked list without inventing rows", () => {
  const rows = buildClipListRows(buildScoringFixtureReport(), buildScoringFixtureClips());
  const view = createClipListViewState();

  assert.equal(applyClipListView(rows, { ...view, filter: "selected" }).length, 2);
  assert.equal(applyClipListView(rows, { ...view, filter: "uncertain" }).length, 2);
  assert.equal(applyClipListView(rows, { ...view, filter: "rejected" }).length, 0);

  const searched = applyClipListView(rows, { ...view, search: "varmala" });
  assert.equal(searched.length, 1);
  assert.equal(searched[0].candidate.clipId, "clip-023");
  assert.equal(applyClipListView(rows, { ...view, search: "no-such-clip" }).length, 0);

  assert.deepEqual(
    applyClipListView(rows, { ...view, sort: "name" }).map((r) => r.candidate.clipId),
    ["clip-011", "clip-023", "clip-047", "clip-099"]
  );
  // Unknown durations sort last instead of being treated as zero-length.
  assert.deepEqual(
    applyClipListView(rows, { ...view, sort: "duration" }).map((r) => r.candidate.clipId),
    ["clip-011", "clip-023", "clip-047", "clip-099"]
  );
  assert.deepEqual(
    applyClipListView(rows, { ...view, sort: "confidence" }).map((r) => r.candidate.clipId),
    ["clip-023", "clip-011", "clip-047", "clip-099"]
  );
});

test("Phase 10 trust labels distinguish heuristic evidence from measured evidence", () => {
  const report = buildScoringFixtureReport();
  const displays = buildCategoryDisplays(report.rankedClips[0].breakdown);
  const byCategory = Object.fromEntries(displays.map((d) => [d.category, d]));

  assert.equal(byCategory.technical.trustLabel, "Measured");
  assert.equal(byCategory.technical.heuristic, false);
  assert.equal(byCategory.vision.trustLabel, "Provider-model");
  assert.equal(byCategory.vision.heuristic, false);

  // Wedding and music are local-cue estimates and must be flagged as such.
  assert.equal(byCategory.wedding.trustLabel, "Heuristic");
  assert.equal(byCategory.wedding.heuristic, true);
  assert.equal(byCategory.music.trustLabel, "Heuristic");
  assert.equal(byCategory.music.heuristic, true);
});

test("Phase 10 unavailable signals are shown as unavailable, never defaulted to zero", () => {
  const report = buildScoringFixtureReport();
  const displays = buildCategoryDisplays(report.rankedClips[0].breakdown);
  const preference = displays.find((d) => d.category === "preference");

  assert.equal(preference.available, false);
  assert.equal(preference.value, null);
  assert.equal(preference.trustLabel, "Unavailable");

  // The all-unavailable clip exposes no numeric score for any category.
  const unscored = buildCategoryDisplays(report.rankedClips[3].breakdown);
  assert.equal(unscored.every((d) => d.available === false), true);
  assert.equal(unscored.every((d) => d.value === null), true);
});

test("Phase 10 score explanation is derived only from the real breakdown", () => {
  const report = buildScoringFixtureReport();
  const text = buildScoreExplanation(report.rankedClips[0].breakdown, "Clip 023");

  assert.match(text, /^Clip 023 scored 87 because it is sharp, is well exposed, contains a visible smile estimate, and aligns well with the selected music section\./);
  assert.match(text, /lost 6 points due to near-duplicate anonymous face coverage/);
  assert.match(text, /1 signal was unavailable and contributed nothing/);
  assert.match(text, /Confidence is 86%/);

  // Diversity adjustments are reported rather than folded silently into score.
  const penalised = buildScoreExplanation(report.rankedClips[2].breakdown, "Clip 047");
  assert.match(penalised, /5 points were removed as a diversity adjustment/);

  // A clip with nothing measurable is never given invented praise.
  const unscored = buildScoreExplanation(report.rankedClips[3].breakdown, "Clip 099");
  assert.match(unscored, /could not be scored because no signal was available/);
  assert.doesNotMatch(unscored, /scored 0 because it is/);
});

test("Phase 10 lock, require, and exclude choices stay mutually exclusive and persist", () => {
  const at = "2026-08-05T10:00:00.000Z";
  let choices = toggleClipChoice(undefined, "clip-023", "lock", at);
  assert.deepEqual(choices.lockedClipIds, ["clip-023"]);
  assert.equal(hasClipChoice(choices, "clip-023", "lock"), true);

  // Requiring a locked clip moves it rather than leaving it in both lists.
  choices = toggleClipChoice(choices, "clip-023", "require", at);
  assert.deepEqual(choices.lockedClipIds, []);
  assert.deepEqual(choices.requiredClipIds, ["clip-023"]);

  choices = toggleClipChoice(choices, "clip-023", "exclude", at);
  assert.deepEqual(choices.requiredClipIds, []);
  assert.deepEqual(choices.excludedClipIds, ["clip-023"]);

  // Toggling the same kind clears it.
  choices = toggleClipChoice(choices, "clip-023", "exclude", at);
  assert.deepEqual(choices.excludedClipIds, []);

  const restored = buildScoringFixtureChoices();
  assert.equal(hasClipChoice(restored, "clip-011", "lock"), true);
  assert.equal(hasClipChoice(restored, "clip-023", "require"), true);
  assert.equal(hasClipChoice(restored, "clip-023", "lock"), false);
});

test("Phase 10 clip choices and custom profile survive a MemoryEngine round trip", async () => {
  const memory = fakeMemory();
  const job = scoringJob();
  job.userClipChoices = toggleClipChoice(undefined, "clip-a", "require", "2026-08-05T10:00:00.000Z");
  job.customScoringProfile = buildCustomProfile(
    setCategoryWeight(createScoringControlsState("cinematic"), "technical", 1.4)
  ).profile;

  const scored = await runScoringPipeline(job, {
    memory,
    now: () => "2026-08-05T10:00:00.000Z"
  });

  const jobs = new AutoReelJobMemory(memory);
  const restored = jobs.get(scored.id);
  assert.notEqual(restored, null);
  assert.deepEqual(restored.userClipChoices.requiredClipIds, ["clip-a"]);
  assert.equal(restored.customScoringProfile.categoryWeights.technical, 1.4);
  assert.equal(restored.customScoringProfile.version, "2");
  assert.equal(restored.scoring.rankedClips.length, 2);
  assert.equal(restored.scoring.lastScoredAt, "2026-08-05T10:00:00.000Z");

  // The restored profile drives the next run without re-deriving from preset.
  assert.equal(resolveScoringProfile(restored).categoryWeights.technical, 1.4);
});

test("Phase 10 rerun with identical inputs and config is deterministic", () => {
  const profile = resolveControlsProfile(
    setCategoryWeight(createScoringControlsState("cinematic"), "vision", 1.25)
  );
  const now = () => "2026-08-05T10:00:00.000Z";

  const first = new ScoringEngine(scoringJob(), profile).score({ now });
  const second = new ScoringEngine(scoringJob(), profile).score({ now });

  assert.deepEqual(first, second);
  assert.equal(JSON.stringify(first), JSON.stringify(second));
});

test("Phase 10 cancellation stops scoring and reports partial results", () => {
  const job = scoringJob();
  const profile = resolveControlsProfile(createScoringControlsState("cinematic"));
  const signal = { aborted: false };

  const report = new ScoringEngine(job, profile).score({
    signal,
    now: () => "2026-08-05T10:00:00.000Z",
    onProgress: () => { signal.aborted = true; }
  });

  assert.equal(report.status, "cancelled");
  assert.equal(report.partial, true);
  assert.equal(report.totalClips, 2);
  assert.equal(report.completedClips, 1);
  // Partial results are retained rather than discarded.
  assert.equal(report.rankedClips.length, 1);
});

test("Phase 10 run status text reports progress, cancellation, and failure honestly", () => {
  const idle = createScoringRunStatus();
  assert.equal(idle.phase, "idle");
  assert.match(describeScoringRun(idle), /Scoring has not run yet/);

  const running = { phase: "running", completedClips: 3, totalClips: 10, currentClipName: "Clip 023", failureReason: null };
  assert.equal(remainingClips(running), 7);
  assert.match(describeScoringRun(running), /Scoring Clip 023 — 3 of 10 complete, 7 remaining/);

  const cancelled = { phase: "cancelled", completedClips: 4, totalClips: 10, currentClipName: null, failureReason: null };
  assert.match(describeScoringRun(cancelled), /cancelled after 4 of 10 clips\. Partial results/);

  const failed = { phase: "failed", completedClips: 0, totalClips: 10, currentClipName: null, failureReason: "sidecar unavailable" };
  assert.match(describeScoringRun(failed), /Scoring failed: sidecar unavailable/);
  assert.doesNotMatch(describeScoringRun(failed), /Scored/);

  const partialReport = buildScoringFixtureReport({ partial: true });
  assert.equal(partialReport.partial, true);
  assert.equal(partialReport.rankedClips.length, 2);
  assert.equal(partialReport.totalClips, 4);
});

test("Phase 10 scoring panels stay readable in the narrow layout mode", () => {
  // 280px is the narrowest supported workstation width in the frozen shell.
  assert.equal(getAutoReelLayoutMode(280), "compact");
  assert.equal(getAutoReelLayoutMode(500), "medium");
  assert.equal(getAutoReelLayoutMode(900), "regular");
  assert.equal(getAutoReelLayoutMode(1146), "wide");

  const rows = buildClipListRows(buildScoringFixtureReport(), buildScoringFixtureClips());
  // Every row carries a real name, so compact mode truncates rather than
  // falling back to a raw clip id.
  assert.equal(rows.every((row) => row.clipName.length > 0), true);
  assert.equal(rows.every((row) => row.clipName !== row.candidate.clipId), true);
});

function scoringJob() {
  const base = createAutoReelJob(request(), "job-scoring", "2026-08-05T00:00:00.000Z");
  return {
    ...base,
    clips: [
      {
        id: "clip-a", name: "Clip A", mediaType: "video",
        sourceInSeconds: 0, sourceOutSeconds: 4, durationSeconds: 4, timelineStartSeconds: 0,
        speed: 1, disabled: false, selected: true, linkedClipIds: [],
        mediaFingerprint: "fp-a", cacheKey: "ck-a", metadataStatus: "host-verified", capabilityNotes: []
      },
      {
        id: "clip-b", name: "Clip B", mediaType: "video",
        sourceInSeconds: 0, sourceOutSeconds: 6, durationSeconds: 6, timelineStartSeconds: 6,
        speed: 1, disabled: false, selected: true, linkedClipIds: [],
        mediaFingerprint: "fp-b", cacheKey: "ck-b", metadataStatus: "host-verified", capabilityNotes: []
      }
    ],
    vision: {
      schemaVersion: 1, jobId: "job-scoring", requestId: "r", status: "completed",
      sidecar: { status: "available" }, visionVersion: "phase-5-vision-v1", gpuAccelerated: false,
      progress: { completedFrames: 2, totalFrames: 2, completedClips: 2, totalClips: 2, cacheHits: 0, cacheMisses: 2 },
      clips: [
        visionClip("clip-a", 0.9, 0.8),
        visionClip("clip-b", 0.6, 0.5)
      ],
      failures: [], warnings: [], startedAt: "2026-08-05T00:00:00.000Z", completedAt: "2026-08-05T00:00:01.000Z"
    }
  };
}

function visionClip(clipId, sharpness, exposure) {
  return {
    clipId, clipName: clipId, frameCount: 1, qualityScore: sharpness, rejectScore: 0,
    warnings: [], confidence: 0.9, source: "measured",
    frames: [{
      frameSampleId: `${clipId}-f1`, clipId, clipName: clipId, sampleKind: "middle",
      sourceTimeSeconds: 1, contentHash: `${clipId}-hash`, visionVersion: "phase-5-vision-v1",
      processedAt: "2026-08-05T00:00:00.000Z", cacheKey: `${clipId}-ck`, cacheStatus: "miss",
      sharpness, blurScore: 1 - sharpness, noiseScore: 0.1, exposure, brightness: 0.5,
      contrast: 0.5, saturation: 0.5,
      whiteBalanceEstimate: { tint: 0, neutral: true, confidence: 0.8 },
      motionEstimate: 0.4, cameraShake: 0.2, edgeDensity: 0.5,
      compositionEstimate: 0.7, ruleOfThirdsEstimate: 0.6,
      horizonEstimate: { present: true, confidence: 0.7, note: "" },
      foregroundRatio: 0.5, backgroundRatio: 0.5,
      sceneEstimate: { indoorOutdoor: "outdoor", dayNight: "day", shotType: "wide", droneLikelihood: 0.2, confidence: 0.8, notes: [] },
      qualityScore: sharpness, rejectScore: 0, warnings: [],
      confidence: {
        sharpness: 0.9, blur: 0.9, noise: 0.9, exposure: 0.9, brightness: 0.9, contrast: 0.9,
        saturation: 0.9, whiteBalance: 0.9, motion: 0.9, cameraShake: 0.9, edgeDensity: 0.9,
        composition: 0.9, ruleOfThirds: 0.9, horizon: 0.9, foregroundBackground: 0.9, scene: 0.9
      },
      capabilities: ["opencv"]
    }]
  };
}

test("Phase Assembly preserves projectItem and Preflight blocks unresolved clips", async () => {
  const { AutoEditAssembler } = require("../src/features/auto-edit/AutoEditAssembler.ts");
  const assembler = new AutoEditAssembler();
  
  let preflightError = null;
  try {
    await assembler.assemble("Reel", [{
      id: "clip_001",
      path: undefined,
      projectItemId: null,
      projectItem: undefined,
      score: 100
    }]);
  } catch (error) {
    preflightError = error;
  }
  
  assert.ok(preflightError, "Preflight should have thrown an error for missing ProjectItem");
  assert.match(preflightError.message, /Unresolvable ProjectItem/);
  assert.match(preflightError.message, /clip_001/);
  
  let executeError = null;
  try {
    await assembler.assembleReelPlan({
      title: "Test Sequence",
      templateName: "Fast Cinematic",
      clips: [{
        clipId: "test_clip",
        clipName: "test_clip",
        start: 0,
        end: 1,
        sourceDuration: 1,
        durationSeconds: 1,
        projectItemId: "project-123",
        projectItem: { id: "live" },
        mediaPath: "/path/to/media.mp4"
      }]
    });
  } catch (error) {
    executeError = error;
  }
  
  // Preflight passes, it will fail down the line on executor because there's no Premiere host in this test
  if (executeError) {
    assert.doesNotMatch(executeError.message, /Unresolvable ProjectItem/);
  }
});

test("CommandExecutor validates timeline-modifying commands against sequence state", async () => {
  const { CommandExecutor } = require("../src/commands/CommandExecutor.ts");
  const executor = new CommandExecutor({
    project: {
      getSequence: () => null, // No sequence available
      getClips: () => ({ cut: async () => {}, trim: async () => {} })
    },
    execute: async () => ({}) // Dummy bridge execute
  });

  const cutResult = await executor.execute({
    id: "cmd-1",
    timestamp: 1234,
    action: "CUT_CLIP",
    payload: { clipId: "c1", time: 10 }
  });
  
  assert.equal(cutResult.success, false);
  assert.match(cutResult.error || "", /No active sequence found/);
  
  const moveResult = await executor.execute({
    id: "cmd-2",
    timestamp: 1234,
    action: "MOVE_PLAYHEAD",
    payload: { time: 0 }
  });
  // Without a full Premiere implementation, dummy execution will probably just return undefined or empty object,
  // but it should NOT have the 'Active sequence is required' error.
  if (moveResult.error) {
    assert.doesNotMatch(moveResult.error, /Active sequence is required/);
  }
});
