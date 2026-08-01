export interface Scene{
  start:number;
  end:number;
  score:number;
}

export default class SceneDetector{

  detect(clips:any[]):Scene[]{

    return clips.map((_,index)=>({
      start:index*5,
      end:index*5+5,
      score:1
    }));

  }

}
