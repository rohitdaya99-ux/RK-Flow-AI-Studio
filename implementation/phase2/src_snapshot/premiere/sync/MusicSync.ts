import BeatAnalyzer from "../music/BeatAnalyzer";

export default class MusicSync{

  private beats=new BeatAnalyzer();

  sync(clips:any[],audio:any){

    return{
      clips,
      beats:this.beats.analyze(audio)
    };

  }

}
