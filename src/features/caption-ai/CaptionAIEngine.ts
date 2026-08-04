import { runGemini } from '../../ai/GeminiService';
import { PremiereExecutor } from '../../core/execution/PremiereExecutor';

export class CaptionAIEngine {
  private readonly executor = new PremiereExecutor();

  async generateCaptions(text: string, language: 'hindi' | 'english' | 'hinglish', style: 'standard' | 'karaoke'): Promise<string> {
    console.log(`Generating ${style} captions in ${language} for: "${text}"`);
    
    const prompt = `Generate captions for the following text in ${language}. The desired style is ${style}. If the style is 'karaoke', provide timestamps for each word. Text: "${text}"`;

    try {
      const result = await runGemini(prompt, { json: style === 'karaoke' });
      return result;
    } catch (error) {
      console.error("Error generating captions with Gemini:", error);
      return `Error generating captions: ${error}`;
    }
  }

  async insertCaptions(captions: string): Promise<string> {
    const result = await this.executor.runAction("INSERT_CAPTIONS", { captions });
    return result.success
      ? "Caption insertion submitted to Premiere."
      : `Caption insertion failed: ${result.error ?? result.message}`;
  }
}
