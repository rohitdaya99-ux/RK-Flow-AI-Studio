import { defaultBridgeConfig } from './bridge-config.js';
import { BridgeClient } from './bridge-client.js';
import { createPlanner } from './planner.js';
import { buildDiagnostics } from './diagnostics.js';

export function createRuntime(config = {}) {
  const merged = { ...defaultBridgeConfig, ...config };
  const bridge = new BridgeClient({ tempDirectory: merged.tempDirectory });
  const planner = createPlanner();
  const diagnostics = buildDiagnostics(merged);

  return {
    config: merged,
    bridge,
    planner,
    diagnostics
  };
}
