export interface BeatAnalysis {
  bpm: number;
  beats: number[];
  energy: number[];
}

export default class BeatAnalyzer {

  analyze(_audio: unknown): BeatAnalysis {

    return {
      bpm: 120,
      beats: [],
      energy: []
    };

  }

}
