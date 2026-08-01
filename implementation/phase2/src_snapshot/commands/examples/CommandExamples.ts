import { CommandDispatcher } from "../dispatcher/CommandDispatcher";

const dispatcher = new CommandDispatcher();

const prompts = [
  "Create cinematic wedding reel",
  "Create teaser",
  "Create highlight",
  "Trim silence",
  "Sync music with beat",
  "Add cinematic transitions",
  "Export Instagram Reel",
  "Unknown command"
];

for (const prompt of prompts) {
  console.log("\n>", prompt);
  console.log(dispatcher.dispatch(prompt));
}
