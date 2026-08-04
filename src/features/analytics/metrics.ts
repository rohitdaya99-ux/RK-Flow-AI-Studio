import { PremiereBridge } from "../../premiere/PremiereBridge";
import { TimelineState } from "../../types/Timeline";

const bridge = new PremiereBridge();

export interface TimelineReadMetrics {
  timeline: TimelineState | null;
  latencyMs: number;
  error: string | null;
  clipCount: number;
}

export async function measureTimelineRead(): Promise<TimelineReadMetrics> {
  const started = performance.now();

  try {
    const timeline = await bridge.readTimeline();

    return {
      timeline,
      latencyMs: Math.round(performance.now() - started),
      error: null,
      clipCount: countTimelineClips(timeline)
    };
  } catch (error) {
    return {
      timeline: null,
      latencyMs: Math.round(performance.now() - started),
      error: error instanceof Error ? error.message : String(error),
      clipCount: 0
    };
  }
}

function countTimelineClips(timeline: TimelineState | null) {
  if (!timeline) {
    return 0;
  }

  return [...timeline.videoTracks, ...timeline.audioTracks].reduce(
    (count, track) => count + track.clips.length,
    0
  );
}
