import { createRuntime } from './runtime.js';

const runtime = createRuntime();

export async function run(prompt, context = {}) {
  const plan = runtime.planner.plan(prompt, context);
  return runtime.bridge.run(plan.tool, plan.args);
}
