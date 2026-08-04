export function createRegistry() {
  return {
    "project.inspect": async (args, ctx) => ({ ok: true, tool: "project.inspect", args, ctx }),
    "reel.autoSfx": async (args, ctx) => ({ ok: true, tool: "reel.autoSfx", args, ctx }),
    "reel.matchReference": async (args, ctx) => ({ ok: true, tool: "reel.matchReference", args, ctx }),
    "reel.applyReferenceEnergy": async (args, ctx) => ({ ok: true, tool: "reel.applyReferenceEnergy", args, ctx })
  };
}
