import { useState } from "react";
import { runRKFlow } from "../../rkflow-v2";

export default function AICommandConsole() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  async function run() {
  try {
    setOutput("Running...");

    const result = await runRKFlow(prompt);

    setOutput(JSON.stringify(result, null, 2));
  } catch (err: any) {
    console.error(err);

    setOutput(
      err?.stack ||
      err?.message ||
      JSON.stringify(err, null, 2)
    );
  }
}

  return (
    <div>

      <textarea
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        placeholder="Type command here..."
        style={{
          width:"100%",
          height:220,
          backgroundColor:"#11161D",
          color:"#FFFFFF",
          border:"2px solid #333",
          borderRadius:12,
          padding:16,
          fontSize:16,
          resize:"none",
          outline:"none",
          appearance:"none",
          WebkitAppearance:"none"
        }}
      />

      <button
        onClick={run}
        style={{
          width:"100%",
          marginTop:16,
          height:52,
          background:"#2563EB",
          color:"#fff",
          border:"none",
          borderRadius:12,
          fontWeight:700
        }}
      >
        Run RK Flow
      </button>

      <pre
        style={{
          marginTop:20,
          minHeight:300,
          background:"#111",
          color:"#7DD3FC",
          padding:16,
          overflow:"auto"
        }}
      >
{output}
      </pre>

    </div>
  );
}
