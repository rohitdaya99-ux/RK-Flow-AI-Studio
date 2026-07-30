export interface ProjectAnalysis{
  clips:number;
  duration:number;
  sequences:number;
}

export default class ProjectAnalysis{

  analyze(project:any):ProjectAnalysis{

    return{
      clips:project?.clips?.length ?? 0,
      duration:project?.duration ?? 0,
      sequences:project?.sequences?.length ?? 0
    };

  }

}
