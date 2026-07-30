import PremiereActions from "../actions/PremiereActions";

export default class PremiereExecutor {

  private actions = new PremiereActions();

  async execute(plan:any){

    for(const step of plan.actions){

      switch(step){

        case "Apply Motion":
          await this.actions.center();
          break;

      }

    }

  }

}
