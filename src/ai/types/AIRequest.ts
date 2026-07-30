import { ProjectContext } from "../../context";

export interface AIRequest {
  prompt: string;
  context: ProjectContext;
  model: string;
}
