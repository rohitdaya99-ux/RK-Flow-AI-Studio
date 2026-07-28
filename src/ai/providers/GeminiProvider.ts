import { GoogleGenerativeAI } from "@google/generative-ai";
import { resolveGeminiConfig } from "../../config";

export class GeminiProvider {
    private model;

    constructor() {
        const config = resolveGeminiConfig();

        const genAI = new GoogleGenerativeAI(config.apiKey);

        this.model = genAI.getGenerativeModel({
            model: "gemini-3.6-flash"
        });
    }

    async generate(prompt: string): Promise<string> {
        const result = await this.model.generateContent(prompt);
        return result.response.text();
    }
}

export const geminiProvider = new GeminiProvider();