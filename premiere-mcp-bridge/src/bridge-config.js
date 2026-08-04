export const defaultBridgeConfig = {
  transport: "filesystem-ipc",
  tempDirectory: "/tmp/premiere-mcp-bridge",
  pollIntervalMs: 250,
  timeoutMs: 30000,
  executionMode: "cep-extendscript",
  fallbackMode: "uxp-dom",
  allowQEDOM: true,
  allowWriteOperations: true,
  enableDiagnostics: true,
  logLevel: "info"
};
