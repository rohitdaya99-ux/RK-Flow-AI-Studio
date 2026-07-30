export interface SequenceInfo {
  id: string;
  name: string;
  fps: number;
  duration: number;
}

export interface TrackInfo {
  id: string;
  type: "video" | "audio";
  clips: number;
}

export interface ClipInfo {
  id: string;
  name: string;
  start: number;
  end: number;
  duration: number;
}

export interface TimelineState {
  sequence: SequenceInfo;
  videoTracks: TrackInfo[];
  audioTracks: TrackInfo[];
  selectedClips: ClipInfo[];
}
