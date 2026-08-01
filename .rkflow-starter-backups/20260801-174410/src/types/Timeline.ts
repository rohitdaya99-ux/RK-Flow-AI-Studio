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
  type: "video" | "audio";
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