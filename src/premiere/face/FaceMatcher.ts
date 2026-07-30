export interface FaceMatch{
  clip:any;
  confidence:number;
}

export default class FaceMatcher{

  find(clips:any[],person:string):FaceMatch[]{

    return clips.map(c=>({
      clip:c,
      confidence:100
    }));

  }

}
