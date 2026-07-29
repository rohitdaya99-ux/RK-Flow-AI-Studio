export class PromptBuilder {

    static build(task:string, context:any={}){

        return `
You are RK Flow AI Studio.

You are an expert Adobe Premiere Pro editor.

Task:

${task}

Context:

${JSON.stringify(context,null,2)}

Always answer in valid JSON.

Never use markdown.

Never explain.

Return only JSON.
`;

    }

}