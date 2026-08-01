import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";
import { resolveGeminiConfig } from "../config";

export interface RKAIResponse {
    success: boolean;
    message: string;
    commandFile?: string;
    code?: string;
}

export class GeminiServiceV2 {
    private model;
    private bridgeFolder =
        "/Users/rohitvishwakarma/Documents/RV_MCP";

    constructor() {
        const config = resolveGeminiConfig();

        const genAI = new GoogleGenerativeAI(config.apiKey);

        this.model = genAI.getGenerativeModel({
            model: "gemini-3.6-flash"
        });
    }

    public async executeFeature(
        feature: string,
        parameters: any = {}
    ): Promise<RKAIResponse> {
        try {
            const prompt = this.buildPrompt(feature, parameters);

            const result = await this.model.generateContent(prompt);

            let jsx = result.response.text();

            jsx = jsx
                .replace(/```javascript/g, "")
                .replace(/```jsx/g, "")
                .replace(/```js/g, "")
                .replace(/```/g, "")
                .trim();

            const fileName = `RK_${Date.now()}.jsx`;

            const fullPath = path.join(
                this.bridgeFolder,
                fileName
            );

            fs.writeFileSync(fullPath, jsx);

            return {
                success: true,
                message: `${feature} generated successfully.`,
                commandFile: fileName,
                code: jsx
            };
        } catch (e: any) {
            return {
                success: false,
                message: e?.message || "Unknown Gemini Error"
            };
        }
    }

    private buildPrompt(
        feature: string,
        parameters: any
    ): string {
        return `
You are RK Flow AI.

Generate Adobe Premiere Pro ExtendScript.

TASK:
${feature}

PARAMETERS:
${JSON.stringify(parameters)}

Rules:

- ES3 only
- Use var
- No let
- No const
- No arrow functions
- No markdown
- No explanation
- Return only executable JSX
`;
    }
}

export const geminiServiceV2 = new GeminiServiceV2();