import { AIController } from "./ui";

async function main() {
  const ai = new AIController();

  ai.setProvider("gemini");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  ai.setApiKey(apiKey);

  const reply = await ai.ask(
    "Introduce yourself as RK Flow AI in one short paragraph."
  );

  console.log("\n===== AI RESPONSE =====\n");
  console.log(reply);
}

main().catch(console.error);
