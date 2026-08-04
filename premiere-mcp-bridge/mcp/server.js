import { createRegistry } from "./registry.js";
import { routeTool } from "./router.js";

const registry = createRegistry();

export async function handleRequest(request, context = {}) {
  return routeTool(request, { registry, context });
}
