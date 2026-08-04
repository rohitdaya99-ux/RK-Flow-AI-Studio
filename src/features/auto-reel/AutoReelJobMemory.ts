import { MemoryEngine } from "../../core/brain/MemoryEngine";
import { AutoReelJob, AutoReelJobState, transitionAutoReelJob } from "./models";
import { validatePersistedAutoReelJob } from "./validation";

const JOB_SCOPE = "auto-reel:jobs";
const JOB_INDEX_KEY = "index";

export class AutoReelJobMemory {
  public constructor(private readonly memory: MemoryEngine = new MemoryEngine()) {}

  public save(job: AutoReelJob): void {
    const validation = validatePersistedAutoReelJob(job);
    if (!validation.valid || !validation.value) {
      throw new Error(`Refusing to persist invalid Auto Reel job: ${validation.issues.map((issue) => issue.path).join(", ")}`);
    }

    this.memory.setAnalysis(JOB_SCOPE, job.id, validation.value);
    const ids = this.listIds().filter((id) => id !== job.id);
    this.memory.setAnalysis(JOB_SCOPE, JOB_INDEX_KEY, [job.id, ...ids].slice(0, 25));
  }

  public get(jobId: string): AutoReelJob | null {
    const stored = this.memory.getAnalysis<unknown>(JOB_SCOPE, jobId);
    const validation = validatePersistedAutoReelJob(stored);

    return validation.valid && validation.value ? validation.value : null;
  }

  public list(): AutoReelJob[] {
    return this.listIds()
      .map((jobId) => this.get(jobId))
      .filter((job): job is AutoReelJob => job !== null);
  }

  public transition(
    jobId: string,
    nextState: AutoReelJobState,
    reason?: string
  ): AutoReelJob {
    const job = this.get(jobId);
    if (!job) {
      throw new Error(`Auto Reel job not found: ${jobId}`);
    }

    const updated = transitionAutoReelJob(job, nextState, { reason });
    this.save(updated);
    return updated;
  }

  private listIds(): string[] {
    const stored = this.memory.getAnalysis<unknown>(JOB_SCOPE, JOB_INDEX_KEY);
    return Array.isArray(stored) && stored.every((value) => typeof value === "string")
      ? stored
      : [];
  }
}
