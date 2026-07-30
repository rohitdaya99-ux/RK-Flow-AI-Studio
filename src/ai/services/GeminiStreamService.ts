import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_CONFIG } from "../config/GeminiConfig";
import SYSTEM_PROMPT from "../prompts/SystemPrompt";

export class GeminiStreamService {
  private client = new GoogleGenerativeAI(GEMINI_CONFIG.API_KEY);

  async stream(
    prompt: string,
    onChunk: (text: string) => void
  ): Promise<string> {

    const model = this.client.getGenerativeModel({
      model: GEMINI_CONFIG.MODEL
    });

    const result = await model.generateContentStream(
      SYSTEM_PROMPT + "\n\n" + prompt
    );

    let output = "";

    for await (const chunk of result.stream) {

      const text = chunk.text();

      if (!text) continue;

      output += text;

      onChunk(text);
    }

    return output;
  }
}

export default GeminiStreamService;
