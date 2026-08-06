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

const { buildStory } = require("../src/features/auto-reel/storyPipeline.ts");

function createMockJob(rankedClips = [], visionClips = [], eventSignals = []) {
  return {
    scoring: { rankedClips },
    vision: { clips: visionClips },
    weddingEventSignals: eventSignals
  };
}

test("Phase 11: Story Builder AI", async (t) => {
  await t.test("Handles empty timeline gracefully", () => {
    const job = createMockJob();
    const newJob = buildStory(job, "Wedding Film");
    assert.ok(newJob.storyPlan);
    assert.equal(newJob.storyPlan.sequence.sections.length, 0);
    assert.equal(newJob.storyPlan.confidence, 0);
  });

  await t.test("Single clip is placed appropriately", () => {
    const job = createMockJob(
        [{ clipId: "c1", score: 95, breakdown: { confidence: 0.9 } }],
        [{ clipId: "c1", frames: [{ sceneEstimate: { shotType: "wide" } }] }],
        [{ clipId: "c1", primaryEvent: "decor" }]
    );
    const newJob = buildStory(job, "Wedding Film");
    const plan = newJob.storyPlan;
    assert.ok(plan);
    assert.equal(plan.sequence.sections.length, 1);
    assert.equal(plan.sequence.sections[0].type, "Opening");
    assert.equal(plan.sequence.sections[0].segments[0].clips.length, 1);
  });

  await t.test("Filters duplicate clips and jump cuts", () => {
    const job = createMockJob(
        [
            { clipId: "c1", score: 90, breakdown: { confidence: 0.9 } },
            { clipId: "c2", score: 85, breakdown: { confidence: 0.8 } }, // duplicate angle
            { clipId: "c1", score: 80, breakdown: { confidence: 0.7 } } // exact duplicate ID
        ],
        [
            { clipId: "c1", frames: [{ sceneEstimate: { shotType: "close" } }] },
            { clipId: "c2", frames: [{ sceneEstimate: { shotType: "close" } }] }
        ],
        [
            { clipId: "c1", primaryEvent: "decor" },
            { clipId: "c2", primaryEvent: "decor" }
        ]
    );

    const newJob = buildStory(job, "Wedding Film");
    const plan = newJob.storyPlan;
    const openingSection = plan.sequence.sections.find(s => s.type === "Opening");
    
    // Only c1 should be placed. c2 is filtered for angle repetition (jump cut).
    // The second c1 is filtered as a duplicate clip ID.
    assert.equal(openingSection.segments[0].clips.length, 1);
    assert.equal(openingSection.segments[0].clips[0].clipId, "c1");
  });

  await t.test("Multiple events handled correctly (Cinematic Mode vs Documentary)", () => {
    const job = createMockJob(
        [
            { clipId: "c1", score: 90, breakdown: { confidence: 0.9 } },
            { clipId: "c2", score: 95, breakdown: { confidence: 0.9 } }
        ],
        [
            { clipId: "c1", frames: [{ sceneEstimate: { shotType: "medium" } }] },
            { clipId: "c2", frames: [{ sceneEstimate: { shotType: "wide" } }] }
        ],
        [
            { clipId: "c1", primaryEvent: "bride-entry" },
            { clipId: "c2", primaryEvent: "varmala" }
        ]
    );
    
    // Both Cinematic Film and Documentary should resolve the sections
    const cinematicJob = buildStory(job, "Cinematic Film");
    assert.equal(cinematicJob.storyPlan.sequence.sections.length, 2);
    
    const docJob = buildStory(job, "Documentary");
    assert.equal(docJob.storyPlan.sequence.sections.length, 2);
  });

  await t.test("Duration estimation is applied", () => {
    const job = createMockJob(
        [
            { clipId: "high", score: 95, breakdown: { confidence: 0.9 } },
            { clipId: "low", score: 40, breakdown: { confidence: 0.9 } }
        ],
        [],
        [
            { clipId: "high", primaryEvent: "bride-entry" }, // Peak timing
            { clipId: "low", primaryEvent: "decor" } // Beginning timing
        ]
    );

    const newJob = buildStory(job, "Wedding Film");
    
    const brideEntry = newJob.storyPlan.sequence.sections.find(s => s.type === "Bride Entry");
    assert.equal(brideEntry.segments[0].clips[0].durationEstimate, "long"); // high score, peak

    const opening = newJob.storyPlan.sequence.sections.find(s => s.type === "Opening");
    assert.equal(opening.segments[0].clips[0].durationEstimate, "short"); // low score, not peak
  });

});
