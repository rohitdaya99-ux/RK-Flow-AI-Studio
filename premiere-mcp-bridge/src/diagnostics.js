export function buildDiagnostics(config) {
  return {
    tempDirectory: config.tempDirectory,
    transport: config.transport,
    executionMode: config.executionMode,
    allowWriteOperations: config.allowWriteOperations,
    enableDiagnostics: config.enableDiagnostics,
    status: "not-run"
  };
}
