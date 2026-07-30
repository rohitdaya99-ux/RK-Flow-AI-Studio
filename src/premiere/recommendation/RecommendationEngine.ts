import ClipScorer from "../scoring/ClipScorer";

export default class RecommendationEngine{

  private scorer=new ClipScorer();

  recommend(clips:any[]){

    return clips
      .map(c=>({
        clip:c,
        score:this.scorer.score(c)
      }))
      .sort((a,b)=>b.score.overall-a.score.overall);

  }

}
