import { TimelineState } from "../types/PremiereTypes";

export class PremiereFormatter {
  format(state: TimelineState): string {
    return JSON.stringify(state, null, 2);
  }
}
