import { AIController } from "./AIController";

async function run() {
  const ai = new AIController();

  ai.setProvider("gemini");

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("Please export GEMINI_API_KEY first.");
  }

  ai.setApiKey(key);

  console.log("Provider:", ai.getProvider());
  console.log("Model:", ai.getModel());

  const response = await ai.ask(
    "Reply with exactly: RK Flow AI is working."
  );

  console.log("\nResponse:");
  console.log(response);
}

run().catch(console.error);
