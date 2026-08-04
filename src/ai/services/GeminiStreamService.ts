import SYSTEM_PROMPT from "../prompts/SystemPrompt";
import { runGemini } from "../GeminiService";

export class GeminiStreamService {
  async stream(
    prompt: string,
    onChunk: (text: string) => void
  ): Promise<string> {
    const output = await runGemini(prompt, {
      systemInstruction: SYSTEM_PROMPT
    });

    onChunk(output);

    return output;
  }
}

export default GeminiStreamService;
