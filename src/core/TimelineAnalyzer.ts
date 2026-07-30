import { getSelectedClips, TimelineClip } from "../services/timelineService";

export interface TimelineAnalysis {
  totalClips: number;
  totalDuration: number;
  shortestClip: number;
  longestClip: number;
  averageDuration: number;
  tracks: number[];
  clips: TimelineClip[];
}

export async function analyzeTimeline(): Promise<TimelineAnalysis> {
  const clips = await getSelectedClips();

  const durations = clips.map(c => c.duration);

  return {
    totalClips: clips.length,
    totalDuration: durations.reduce((a, b) => a + b, 0),
    shortestClip: durations.length ? Math.min(...durations) : 0,
    longestClip: durations.length ? Math.max(...durations) : 0,
    averageDuration: durations.length
      ? durations.reduce((a, b) => a + b, 0) / durations.length
      : 0,
    tracks: [...new Set(clips.map(c => c.track))].sort((a,b)=>a-b),
    clips
  };
}
