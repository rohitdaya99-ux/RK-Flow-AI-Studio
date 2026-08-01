export default class EditReport{

  create(plan:any){

    return{
      created:new Date().toISOString(),
      steps:plan.actions ?? [],
      totalSteps:(plan.actions ?? []).length
    };

  }

}
