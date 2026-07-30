import { PlanExecutor } from "../plans/PlanExecutor";
import { WeddingPlans } from "../plans/WeddingPlans";

(async () => {
  const executor = new PlanExecutor();
  await executor.execute(WeddingPlans.reel());
})();
