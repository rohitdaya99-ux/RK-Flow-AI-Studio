import { AutoReelJob, MusicAnalysisRequest } from "./models";
import { AutoReelSidecarClient } from "./autoReelSidecarClient";

/**
 * Phase 9 music analysis pipeline.
 * Calls the sidecar for music analysis and returns the updated job.
 * Does NOT mutate job state — state transitions are managed by autoReelSetupService.
 */
export async function runMusicAnalysisPipeline(job: AutoReelJob): Promise<AutoReelJob> {
  const sidecarClient = new AutoReelSidecarClient();

  const capabilities = await sidecarClient.getMusicCapabilities();
  if (!capabilities.available) {
    const reason = `Music analysis sidecar unavailable: ${capabilities.reason || "Unknown reason"}`;
    return {
      ...job,
      warnings: [...job.warnings, reason],
    };
  }

  const musicSource = job.request.setup?.musicSource;
  if (!musicSource || musicSource.type === "no_music") {
    return {
      ...job,
      warnings: [...job.warnings, "No music source provided. Music scoring signals will contribute zero weight."],
    };
  }

  const request: MusicAnalysisRequest = {
    jobId: job.id,
    requestId: job.request.id,
    musicSource: musicSource,
    analysisRangeStartSeconds: 0,
    analysisRangeEndSeconds: 0,
    enableBeatSnapping: true,
    firstBeatOffsetSeconds: 0,
    manualBeatMarkers: [],
    musicImportance: 1.0,
    parameters: {},
  };

  try {
    const report = await sidecarClient.analyzeMusic(request);
    return {
      ...job,
      music: report,
    };
  } catch (error) {
    const errorMessage = `Music analysis failed: ${(error as Error).message}`;
    return {
      ...job,
      warnings: [...job.warnings, errorMessage],
    };
  }
}
