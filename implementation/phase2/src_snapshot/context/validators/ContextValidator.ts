import { ProjectContext } from "../types/ContextTypes";

export class ContextValidator {
  validate(context: ProjectContext): boolean {
    return (
      context.timeline !== undefined &&
      context.user !== undefined &&
      typeof context.timeline.fps === "number"
    );
  }
}
