import fs from "node:fs/promises";
import path from "node:path";

export class BridgeClient {
  constructor({ tempDirectory, log = console }) {
    this.tempDirectory = tempDirectory;
    this.log = log;
  }

  async ensureReady() {
    await fs.mkdir(this.tempDirectory, { recursive: true });
  }

  async run(tool, args = {}) {
    await this.ensureReady();

    const id = `job_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const commandPath = path.join(this.tempDirectory, `${id}.command.json`);
    const responsePath = path.join(this.tempDirectory, `${id}.response.json`);

    const payload = { id, tool, args, createdAt: new Date().toISOString() };
    await fs.writeFile(commandPath, JSON.stringify(payload, null, 2), "utf8");

    return { ok: true, id, tool, commandPath, responsePath, status: "queued" };
  }
}
