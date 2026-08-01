export interface ProjectAnalysisResult {
  clips: number;
  duration: number;
  sequences: number;
}

class ProjectAnalysis {

  analyze(project: any): ProjectAnalysisResult {

    return {
      clips: project?.clips?.length ?? 0,
      duration: project?.duration ?? 0,
      sequences: project?.sequences?.length ?? 0
    };

  }

}

export default ProjectAnalysis;
