import { describe, it, mock } from "node:test";
import * as assert from "node:assert";
import { AutoReelSidecarClient } from "../src/features/auto-reel/autoReelSidecarClient";

describe("RK Flow Integration Sprint 1.1 Hotfix", () => {
  it("AutoReelSidecarClient initializes token lazily and fetches correctly without /api/v1 prefix", async () => {
    const client = new AutoReelSidecarClient("http://127.0.0.1:43191");
    
    // Mock the fetch function globally for this test
    const mockFetch = mock.fn(async (url: string, options: any) => {
      // Must not contain /api/v1
      assert.ok(!url.includes("/api/v1"), "URL should not contain /api/v1");
      
      // Must have Authorization header
      const headers = new Headers(options.headers);
      assert.ok(headers.has("Authorization"), "Request must include Authorization header");
      
      if (url.endsWith("/health")) {
        return {
          ok: true,
          json: async () => ({ status: "ok" })
        };
      }
      
      if (url.endsWith("/extraction/jobs")) {
        return {
          ok: true,
          json: async () => ({ jobId: "job-123" })
        };
      }
      
      if (url.endsWith("/extraction/jobs/job-123")) {
        return {
          ok: true,
          json: async () => ({
            status: "completed",
            schemaVersion: 1,
            jobId: "job-123"
          })
        };
      }
      
      return { ok: false, status: 404 };
    });
    
    (global as any).fetch = mockFetch;
    
    await client.checkHealth();
    
    const result = await client.runExtractionJob({ foo: "bar" }, {});
    assert.strictEqual(result.jobId, "job-123");
    assert.strictEqual(result.status, "completed");
    
    // Cleanup
    mock.restoreAll();
  });
});
