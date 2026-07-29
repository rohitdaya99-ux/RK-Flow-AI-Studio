export interface BeatMarker {
  time: number;
  strength: number;
}

export interface MusicAnalysis {
  bpm: number;
  duration: number;
  beats: BeatMarker[];
  drops: number[];
  chorus: number[];
  intro: number;
  outro: number;
}

export class MusicEngine {
  private analysis: MusicAnalysis | null = null;

  load(data: MusicAnalysis) {
    this.analysis = data;
  }

  getAnalysis() {
    return this.analysis;
  }

  getBPM() {
    return this.analysis?.bpm ?? 0;
  }

  getBeatMarkers() {
    return this.analysis?.beats ?? [];
  }

  getDrops() {
    return this.analysis?.drops ?? [];
  }

  clear() {
    this.analysis = null;
  }
}

export const musicEngine = new MusicEngine();