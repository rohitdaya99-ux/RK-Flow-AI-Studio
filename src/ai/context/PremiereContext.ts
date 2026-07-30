export interface PremiereContext {
  projectName: string;
  sequenceName: string;

  fps: number;

  inPoint: number;
  outPoint: number;
  playhead: number;

  selectedClips: string[];

  videoTracks: number;
  audioTracks: number;

  markers: string[];
}

export const EmptyPremiereContext: PremiereContext = {
  projectName: "",
  sequenceName: "",

  fps: 25,

  inPoint: 0,
  outPoint: 0,
  playhead: 0,

  selectedClips: [],

  videoTracks: 0,
  audioTracks: 0,

  markers: []
};
