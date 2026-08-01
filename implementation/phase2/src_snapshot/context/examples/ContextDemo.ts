import { ContextEngine } from "../ContextEngine";
import { ContextSerializer } from "../serializers/ContextSerializer";

(async () => {
  const engine = new ContextEngine();
  const serializer = new ContextSerializer();

  const context = await engine.build("Create cinematic wedding reel");
  console.log(serializer.serialize(context));
})();
