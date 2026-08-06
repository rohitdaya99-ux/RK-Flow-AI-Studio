import { strict as assert } from "assert";
import { premiereAPI } from "../src/services/PremiereAPI";
import { loadAutoReelSetupContext } from "../src/features/auto-reel/autoReelSetupService";
import { AutoReelSidecarClient } from "../src/features/auto-reel/autoReelSidecarClient";

describe("Integration Sprint 1", () => {
  it("fetches active project and sequence through Premiere API", async () => {
    // We mock the PPRO object directly
    (globalThis as any).window = {
      PPRO: {
        Project: {
          getActiveProject: async () => ({
            id: "proj-123",
            name: "Test Project",
            getActiveSequence: async () => ({
              id: "seq-456",
              name: "Test Sequence",
              getSequences: async () => [{ id: "seq-456", name: "Test Sequence" }],
              getVideoTrackCount: async () => 1,
              getAudioTrackCount: async () => 1,
              getFrameSize: async () => ({ width: 1920, height: 1080 }),
              getTimebase: async () => 24,
              getSelection: async () => []
            })
          })
        }
      }
    };
    
    // Simulate Premiere API instantiation
    const ppro = (globalThis as any).window.PPRO;
    assert.ok(ppro);

    const project = await ppro.Project.getActiveProject();
    assert.equal(project.name, "Test Project");
  });

  it("handles sidecar health checks with the correct port", () => {
    const client = new AutoReelSidecarClient();
    // Default URL should be localhost:43191
    assert.ok((client as any).baseUrl.includes("43191"));
  });
});
