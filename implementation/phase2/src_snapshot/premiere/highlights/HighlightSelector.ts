import RecommendationEngine from "../recommendation/RecommendationEngine";

export default class HighlightSelector{

  private engine=new RecommendationEngine();

  select(clips:any[]){

    return this.engine
      .recommend(clips)
      .slice(0,20);

  }

}
