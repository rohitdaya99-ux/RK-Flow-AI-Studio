export type TimelineTrackType = "video" | "audio";

export interface TimelineClip {
  id: string;
  name: string;
  start: number;
  end: number;
  duration: number;
  trackIndex: number;
  selected: boolean;
  mediaPath?: string;
}

export interface TimelineTrack {
  id: string;
  name: string;
  type: TimelineTrackType;
  clips: TimelineClip[];
}

export interface TimelineMarker {
  id: string;
  name: string;
  time: number;
  color?: string;
}

export interface TimelineState {
  sequenceName: string;
  fps: number;
  duration: number;
  playhead: number;
  inPoint: number;
  outPoint: number;
  videoTracks: TimelineTrack[];
  audioTracks: TimelineTrack[];
  markers: TimelineMarker[];
}

export interface InOutRange {
  inPoint: number;
  outPoint: number;
}

export function createEmptyTimeline(): TimelineState {
  return {
    sequenceName: "",
    fps: 0,
    duration: 0,
    playhead: 0,
    inPoint: 0,
    outPoint: 0,
    videoTracks: [],
    audioTracks: [],
    markers: []
  };
}
