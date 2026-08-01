export interface TimelineSnapshot {
  projectName: string;
  sequenceName: string;
  videoTracks: number;
  audioTracks: number;
  frameSize: unknown;
  timebase: unknown;
  selection: unknown[];
  timestamp: number;
}
