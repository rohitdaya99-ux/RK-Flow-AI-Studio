import TimelineAnalyzer from "../analyzers/TimelineAnalyzer";

export default class EditPlanner {

  private analyzer = new TimelineAnalyzer();

  async createPlan(prompt:string){

    const analysis = await this.analyzer.analyze();

    return {
      prompt,
      analysis,
      actions:[
        "Analyze Timeline",
        "Find Selection",
        "Apply Motion",
        "Finish"
      ]
    };

  }

}
