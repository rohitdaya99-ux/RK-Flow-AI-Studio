import RKDispatcher from "./commands/RKDispatcher";

const dispatcher = new RKDispatcher();

export async function runRKFlow(prompt: string) {
  return await dispatcher.dispatch(prompt);
}
