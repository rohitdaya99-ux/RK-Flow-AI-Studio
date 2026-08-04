import { createCommand } from "../../types/Command";
import { TimelineClip } from "../../types/Timeline";
import { TimelineReader } from "../../premiere/TimelineReader";
import { PremiereBridge } from "../../premiere/PremiereBridge";
import { PremiereExecutor } from "../../core/execution/PremiereExecutor";

function formatFailures(results: Array<{ success: boolean; error?: string }>): string {
  return results
    .filter((result) => !result.success)
    .map((result) => result.error ?? "Unknown execution failure.")
    .join(" ");
}

export class TimelineAIExecution {
  private readonly executor = new PremiereExecutor();
  private readonly timelineReader = new TimelineReader(new PremiereBridge());

  public async autoTrim(): Promise<string> {
    const clips = await this.getSelectedVideoClips();
    const results =
      clips.length > 0
        ? await this.executor.runBatch(
            clips.map((clip) =>
              createCommand("AUTO_TRIM", {
                clipId: clip.id,
                start: clip.start,
                end: clip.end
              })
            )
          )
        : [await this.executor.runAction("AUTO_TRIM")];

    return summarize("Auto Trim", results);
  }

  public async beatCut(): Promise<string> {
    const clips = await this.getSelectedVideoClips();
    const results =
      clips.length > 0
        ? await this.executor.runBatch(
            clips.map((clip) =>
              createCommand("BEAT_CUT", { clipId: clip.id, start: clip.start, end: clip.end })
            )
          )
        : [await this.executor.runAction("BEAT_CUT")];

    return summarize("Beat Cut", results);
  }

  public async silenceRemove(): Promise<string> {
    const clips = await this.getSelectedAudioClips();
    const results =
      clips.length > 0
        ? await this.executor.runBatch(
            clips.map((clip) =>
              createCommand("SILENCE_REMOVE", {
                clipId: clip.id,
                start: clip.start,
                end: clip.end
              })
            )
          )
        : [await this.executor.runAction("SILENCE_REMOVE")];

    return summarize("Silence Remove", results);
  }

  public async gapRemove(gaps?: Array<{ start: number; end: number }>): Promise<string> {
    const ranges = gaps && gaps.length > 0 ? gaps : await this.getRangeFromInOut();
    const results = await this.executor.runBatch(
      ranges.map((gap) => createCommand("RIPPLE_DELETE", gap))
    );
    return summarize("Gap Remove", results);
  }

  public async rippleDelete(start?: number, end?: number): Promise<string> {
    const fallback = await this.getRangeFromInOut();
    const range = start !== undefined && end !== undefined ? [{ start, end }] : fallback;
    const results = await this.executor.runBatch(
      range.map((item) => createCommand("RIPPLE_DELETE", item))
    );
    return summarize("Ripple Delete", results);
  }

  public async speedRamp(from = 100, to = 180): Promise<string> {
    const clips = await this.getSelectedVideoClips();
    const results = await this.executor.runBatch(
      clips.map((clip) => createCommand("SPEED_RAMP", { clipId: clip.id, from, to }))
    );
    return summarize("Speed Ramp", results, clips.length === 0);
  }

  public async autoZoom(start = 0, end = 1): Promise<string> {
    const clips = await this.getSelectedVideoClips();
    const results = await this.executor.runBatch(
      clips.map((clip) => createCommand("AUTO_ZOOM", { clipId: clip.id, start, end }))
    );
    return summarize("Auto Zoom", results, clips.length === 0);
  }

  public async reframe(): Promise<string> {
    const clips = await this.getSelectedVideoClips();
    const results = await this.executor.runBatch(
      clips.map((clip) => createCommand("REFRAME", { clipId: clip.id }))
    );
    return summarize("Reframe", results, clips.length === 0);
  }

  private async getSelectedVideoClips(): Promise<TimelineClip[]> {
    const clips = await this.timelineReader.getSelectedClips();
    return clips.filter((clip) => clip.trackIndex >= 0);
  }

  private async getSelectedAudioClips(): Promise<TimelineClip[]> {
    return this.timelineReader.getSelectedClips();
  }

  private async getRangeFromInOut(): Promise<Array<{ start: number; end: number }>> {
    const range = await this.timelineReader.getInOut();

    if (range === null || range.inPoint >= range.outPoint) {
      return [];
    }

    return [{ start: range.inPoint, end: range.outPoint }];
  }
}

function summarize(
  label: string,
  results: Array<{ success: boolean; error?: string }>,
  missingSelection = false
): string {
  if (missingSelection) {
    return `${label} requires a selected clip or a valid In/Out range in Premiere.`;
  }

  if (results.length === 0) {
    return `${label} requires a selected clip or a valid In/Out range in Premiere.`;
  }

  const failures = formatFailures(results);

  if (failures.length > 0) {
    return `${label} submitted with ${results.length} action(s), but Premiere reported: ${failures}`;
  }

  return `${label} submitted to Premiere with ${results.length} action(s).`;
}
