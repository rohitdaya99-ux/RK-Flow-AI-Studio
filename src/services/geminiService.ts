import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "../ai/prompts/SystemPrompt";

const GEMINI_API_KEY = "AQ.Ab8RN6JXg6ceuewVMR6D3PzEnOPfU8CBnGkL0jsvwMJTAhqZ2g";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.6-flash"
});

export interface AIChatRequest {
  prompt: string;
  context?: string;
}

export interface AIChatResponse {
  success: boolean;
  text: string;
  error?: string;
}

export async function chatWithGemini(
  request: AIChatRequest
): Promise<AIChatResponse> {

  try {

    const prompt = [
      SYSTEM_PROMPT,
      request.context ?? "",
      request.prompt
    ]
      .filter(Boolean)
      .join("\n\n");

    const result = await model.generateContent(prompt);

    return {
      success: true,
      text: result.response.text()
    };

  } catch (error) {

    return {
      success: false,
      text: "",
      error:
        error instanceof Error
          ? error.message
          : String(error)
    };

  }

}
