import WeddingWorkflow from "../workflows/WeddingWorkflow";

export default class PremiereAI{

  private workflow=new WeddingWorkflow();

  async generate(prompt:string,audio:any){

    return this.workflow.run(prompt,audio);

  }

}
