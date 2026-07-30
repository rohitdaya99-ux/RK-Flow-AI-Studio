export interface Job {
  id: string;
  run: () => Promise<void>;
}

export default class JobQueue {

  private jobs: Job[] = [];

  add(job: Job) {
    this.jobs.push(job);
  }

  async execute() {
    for (const job of this.jobs) {
      await job.run();
    }
  }

  clear() {
    this.jobs = [];
  }

}
