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

const { buildDurationPlan } = require("../src/features/auto-reel/durationPipeline.ts");

function createMockJob(clips = [], storyPlanSections = [], jobMetadata = {}) {
  return {
    clips,
    storyPlan: {
      id: "sp1",
      mode: "Wedding Film",
      sequence: {
        id: "seq1",
        sections: storyPlanSections
      }
    },
    ...jobMetadata
  };
}

test("Phase 12: Dynamic Duration AI", async (t) => {
  await t.test("Empty story plan completes cleanly", () => {
    const job = createMockJob();
    const newJob = buildDurationPlan(job);
    assert.ok(newJob.durationPlan);
    assert.equal(newJob.durationPlan.decisions.length, 0);
  });

  await t.test("Single clip standard cut", () => {
    const job = createMockJob(
      [{ id: "c1", durationSeconds: 10.0 }],
      [
        {
          id: "sec1",
          type: "Opening",
          timing: "Build-up", // multiplier 1.0 -> 2.5s base
          segments: [
            { id: "seg1", clips: [{ clipId: "c1", confidence: 0.9, durationEstimate: "medium" }] }
          ]
        }
      ]
    );

    const newJob = buildDurationPlan(job);
    const decision = newJob.durationPlan.decisions[0];
    assert.equal(decision.clipId, "c1");
    assert.equal(decision.targetDuration, 2.5);
    assert.equal(decision.reason, "standard_cut");
  });

  await t.test("Low quality clamps to minimum", () => {
    const job = createMockJob(
      [{ id: "c1", durationSeconds: 10.0 }],
      [
        {
          type: "Opening",
          timing: "Beginning",
          segments: [{ clips: [{ clipId: "c1", confidence: 0.9 }] }]
        }
      ],
      {
        scoring: { rankedClips: [{ clipId: "c1", score: 20 }] }
      }
    );

    const newJob = buildDurationPlan(job);
    const decision = newJob.durationPlan.decisions[0];
    assert.equal(decision.targetDuration, 0.5); // Min duration
    assert.equal(decision.reason, "low_quality_trim");
  });

  await t.test("High emotion applies emotion hold", () => {
    const job = createMockJob(
      [{ id: "c1", durationSeconds: 10.0 }],
      [
        {
          type: "Emotional Moments",
          timing: "Emotional",
          segments: [{ clips: [{ clipId: "c1", confidence: 0.9 }] }]
        }
      ],
      {
        emotion: { clips: [{ clipId: "c1", moodEstimate: { dominant_mood: "emotional" } }] }
      }
    );

    const newJob = buildDurationPlan(job);
    const decision = newJob.durationPlan.decisions[0];
    assert.equal(decision.targetDuration, 4.0); // emotion hold maxes at 4.0
    assert.equal(decision.reason, "emotion_hold");
  });

  await t.test("Drone reveal logic holds long", () => {
    const job = createMockJob(
      [{ id: "c1", durationSeconds: 10.0 }],
      [
        {
          type: "Venue",
          timing: "Beginning",
          segments: [{ clips: [{ clipId: "c1", confidence: 0.9 }] }]
        }
      ],
      {
        vision: { clips: [{ clipId: "c1", frames: [{ sceneEstimate: { droneLikelihood: 0.9 } }] }] }
      }
    );

    const newJob = buildDurationPlan(job);
    const decision = newJob.durationPlan.decisions[0];
    assert.equal(decision.targetDuration, 5.0); // drone hold maxes at 5.0
    assert.equal(decision.reason, "drone_reveal");
  });

  await t.test("Peak music / Fast Dance reaction", () => {
    const job = createMockJob(
      [{ id: "c1", durationSeconds: 10.0 }],
      [
        {
          type: "Ending",
          timing: "Ending",
          segments: [{ clips: [{ clipId: "c1", confidence: 0.9 }] }]
        }
      ],
      {
        weddingEventSignals: [{ clipId: "c1", primaryEvent: "dance" }]
      }
    );

    const newJob = buildDurationPlan(job);
    const decision = newJob.durationPlan.decisions[0];
    assert.equal(decision.targetDuration, 1.5);
    assert.equal(decision.reason, "music_rhythm");
  });

  await t.test("Maximum duration clamped to source limit", () => {
    const job = createMockJob(
      [{ id: "c1", durationSeconds: 2.0 }], // Source is only 2 seconds
      [
        {
          type: "Venue",
          timing: "Beginning",
          segments: [{ clips: [{ clipId: "c1", confidence: 0.9 }] }]
        }
      ],
      {
        vision: { clips: [{ clipId: "c1", frames: [{ sceneEstimate: { droneLikelihood: 0.9 } }] }] }
      }
    );

    const newJob = buildDurationPlan(job);
    const decision = newJob.durationPlan.decisions[0];
    
    // Even though drone reveal wants 5.0s, it MUST clamp to 2.0s
    assert.equal(decision.targetDuration, 2.0);
    assert.equal(decision.reason, "source_limit");
  });

});
