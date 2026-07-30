import { ContextEngine } from "../ContextEngine";

(async () => {
  const engine = new ContextEngine();
  const ctx = await engine.build("Create cinematic wedding reel");
  console.log(ctx);
})();
