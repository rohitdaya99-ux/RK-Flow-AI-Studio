import { premiereService } from "./premiereService";

export interface TimelineAnalysis {
  project: string;
  sequence: string;
  resolution: string;
  videoTracks: number;
  audioTracks: number;
  duration: string;
  score: number;
}

export async function analyzeTimeline(): Promise<TimelineAnalysis> {

  const info = await premiereService.getTimelineInfo();

  let score = 0;

  if (info.connected) score += 20;
  if (info.projectName) score += 20;
  if (info.sequenceName) score += 20;
  if (info.videoTracks > 0) score += 20;
  if (info.audioTracks > 0) score += 20;

  return {
    project: info.projectName || "--",
    sequence: info.sequenceName || "--",
    resolution: info.frameSize
      ? `${info.frameSize.width} × ${info.frameSize.height}`
      : "--",
    videoTracks: info.videoTracks,
    audioTracks: info.audioTracks,
    duration: info.duration,
    score
  };
}
