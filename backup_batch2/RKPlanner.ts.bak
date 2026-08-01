import { RKCommand } from "../types/RKCommand";

export default class RKPlanner {

  async create(prompt: string): Promise<RKCommand> {

    const text = prompt.toLowerCase();

    if (text.includes("transition")) {
      return {
        id: crypto.randomUUID(),
        action: "ADD_TRANSITIONS" as any,
        payload: {},
        timestamp: Date.now()
      };
    }

    if (text.includes("timeline")) {
      return {
        id: crypto.randomUUID(),
        action: "READ_TIMELINE",
        payload: {},
        timestamp: Date.now()
      };
    }

    if (text.includes("project")) {
      return {
        id: crypto.randomUUID(),
        action: "READ_PROJECT" as any,
        payload: {},
        timestamp: Date.now()
      };
    }

    if (text.includes("sequence")) {
      return {
        id: crypto.randomUUID(),
        action: "READ_SEQUENCE" as any,
        payload: {},
        timestamp: Date.now()
      };
    }

    if (text.includes("selection")) {
      return {
        id: crypto.randomUUID(),
        action: "READ_SELECTION" as any,
        payload: {},
        timestamp: Date.now()
      };
    }

    if (text.includes("trim")) {
      return {
        id: crypto.randomUUID(),
        action: "TRIM_SELECTED" as any,
        payload: {},
        timestamp: Date.now()
      };
    }

    return {
      id: crypto.randomUUID(),
      action: "READ_TIMELINE",
      payload: {},
      timestamp: Date.now()
    };

  }

}