import HighlightSelector from "../highlights/HighlightSelector";

export default class StoryBuilder{

  private selector=new HighlightSelector();

  build(clips:any[]){

    return {
      intro:[],
      story:this.selector.select(clips),
      ending:[]
    };

  }

}
