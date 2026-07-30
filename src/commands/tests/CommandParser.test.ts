import { CommandParser } from "../parser/CommandParser";

const parser = new CommandParser();

console.log(parser.parse("Create cinematic wedding reel"));
console.log(parser.parse("Create teaser"));
console.log(parser.parse("Create highlight"));
console.log(parser.parse("Trim silence"));
console.log(parser.parse("Sync music to beat"));
console.log(parser.parse("Add transitions"));
console.log(parser.parse("Export Instagram Reel"));
