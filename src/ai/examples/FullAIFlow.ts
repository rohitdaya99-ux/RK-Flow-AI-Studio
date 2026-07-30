import { AIOrchestrator } from "../orchestrator/AIOrchestrator";

(async () => {
    const ai = new AIOrchestrator();

    console.log(
        await ai.execute(
            "Create cinematic Indian wedding teaser with beat sync and smooth transitions."
        )
    );
})();
