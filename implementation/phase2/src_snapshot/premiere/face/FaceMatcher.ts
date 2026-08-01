export interface FaceMatch {
  clip: any;
  confidence: number;
}

export default class FaceMatcher {

  find(clips: any[], _person: string): FaceMatch[] {

    return clips.map((clip) => ({
      clip,
      confidence: 100
    }));

  }

}
