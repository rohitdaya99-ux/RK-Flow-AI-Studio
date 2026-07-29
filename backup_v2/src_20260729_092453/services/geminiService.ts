import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

// 1. APNI API KEY YAHAN DAALEIN
const GEMINI_API_KEY = "AQ.Ab8RN6JXg6ceuewVMR6D3PzEnOPfU8CBnGkL0jsvwMJTAhqZ2g"; 
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Aapne jo latest model bataya hai, wahi use kar rahe hain
const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

// 2. AAPKA EXACT MCP BRIDGE FOLDER PATH
const bridgeFolder = "/Users/rohitvishwakarma/Documents/RV_MCP";

export async function executeRKAIFeature(featureName: string, parameters: any = {}) {
    console.log(`🚀 Executing RK Flow Feature: ${featureName}`);
    
    // AI ke liye task define kar rahe hain
    let userTask = `Perform task: ${featureName}. Parameters: ${JSON.stringify(parameters)}`;
    
    const systemPrompt = `
    You are an expert Adobe Premiere Pro ExtendScript developer building a high-end wedding video automation tool.
    The user wants to execute: ${userTask}
    
    Write the exact Adobe ExtendScript code to achieve this in Premiere Pro.
    CRITICAL RULES:
    1. Use ONLY ES3 syntax (use 'var', manual 'for' loops, NO arrow functions, NO 'let' or 'const').
    2. To manipulate the timeline, sequence, or clips, use the standard Premiere Pro DOM (app.project.activeSequence, etc.).
    3. Only return the raw JavaScript/ExtendScript code. 
    4. Do NOT wrap the code in markdown formatting (no \`\`\`jsx or \`\`\`).
    `;

    try {
        const result = await model.generateContent(systemPrompt);
        let aiResponse = result.response.text();
        
        // Faltu ki formatting hata rahe hain
        aiResponse = aiResponse.replace(/```javascript/g, "").replace(/```jsx/g, "").replace(/```/g, "").trim();

        // 3. .jsx file MCP bridge folder mein save kar rahe hain
        const commandId = Date.now();
        const commandFilePath = path.join(bridgeFolder, `cmd_${commandId}.jsx`);
        
        fs.writeFileSync(commandFilePath, aiResponse);
        console.log(`✅ ${featureName} command sent to MCP Bridge: cmd_${commandId}.jsx`);
        
        return { success: true, message: `Command sent: ${featureName}!` };
    } catch (error) {
        console.error(`❌ Error in ${featureName}:`, error);
        return { success: false, message: "AI generation failed. Check console." };
    }
}