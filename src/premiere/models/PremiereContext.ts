export interface PremiereClip {
  name: string;
  start: number;
  end: number;
  duration: number;
}

export interface PremiereSequence {
  name: string;
  videoTracks: number;
  audioTracks: number;
  frameSize: unknown;
  timebase: unknown;
}

export interface PremiereContext {
  projectName: string;
  sequence: PremiereSequence;
  selectedClips: PremiereClip[];
}
