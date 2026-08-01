export interface TimelineContext {
  sequenceName: string;
  fps: number;
  duration: number;
  selectedClips: number;
}

export interface MusicContext {
  bpm?: number;
  beats?: number[];
  energy?: number[];
}

export interface UserContext {
  prompt: string;
  language: string;
}

export interface ProjectContext {
  timeline: TimelineContext;
  music?: MusicContext;
  user: UserContext;
}
