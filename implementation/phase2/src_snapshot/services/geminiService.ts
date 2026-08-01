import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildWeddingPrompt } from "./promptBuilder";

const API_KEY =
(window as any).__RKFLOW_GEMINI_API_KEY__ ||
localStorage.getItem("rkflow.gemini.apiKey") ||
"";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateWeddingPlan(userPrompt = "") {

  if (!API_KEY) {
    return {
      success:false,
      message:"Gemini API Key Missing"
    };
  }

  const model = genAI.getGenerativeModel({
    model:"gemini-3.6-flash"
  });

  const prompt =
    await buildWeddingPrompt() +
    "\n\nUSER REQUEST:\n" +
    userPrompt;

  try{

    const response =
      await model.generateContent(prompt);

    return{

      success:true,

      text:response.response.text()

    };

  }catch(e:any){

    return{

      success:false,

      message:e.message

    };

  }

}
