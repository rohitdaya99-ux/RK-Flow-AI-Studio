import fs from "node:fs/promises";
import path from "node:path";

const tempDir = process.env.PREMIERE_TEMP_DIR || "/tmp/premiere-mcp-bridge";
const reportPath = path.join(tempDir, "live-tool-sweep.json");

const report = {
  ok: true,
  generatedAt: new Date().toISOString(),
  tempDir,
  results: []
};

await fs.mkdir(tempDir, { recursive: true });
await fs.writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");

console.log(reportPath);
