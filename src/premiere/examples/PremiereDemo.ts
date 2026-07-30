import { PremiereContext } from "../context/PremiereContext";

(async () => {
  const ctx = new PremiereContext();
  console.log(await ctx.build());
})();
