import { useState } from "react";
import { aiEngine } from "../../ai/core/AIEngine";

interface AIAssistantProps {
  onStatusChange: (status: string) => void;
}

export const AIAssistant = ({
  onStatusChange,
}: AIAssistantProps) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    if (!prompt.trim()) return;

    try {
      onStatusChange("RK AI Thinking...");

      const result = await aiEngine.execute({
        feature: "RK Assistant",
        prompt,
      });

      setResponse(result.result);

      onStatusChange("AI Response Ready ✓");
    } catch (e: any) {
      console.error(e);
      setResponse(e?.message || "Unknown Error");
      onStatusChange("ERROR");
    }
  };

  return (
    <div
      style={{
        marginTop: 20,
        padding: 15,
        background: "#2b2b2b",
        border: "1px solid #444",
        borderRadius: 8,
      }}
    >
      <h3 style={{ marginTop: 0 }}>🤖 RK AI Assistant</h3>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask RK AI..."
        rows={5}
        style={{
          width: "100%",
          padding: 10,
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={askAI}
        style={{
          marginTop: 10,
          width: "100%",
          height: 45,
          background: "#6c5ce7",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🚀 Ask RK AI
      </button>

      <pre
        style={{
          marginTop: 15,
          background: "#1b1b1b",
          color: "#00ff99",
          padding: 10,
          borderRadius: 6,
          minHeight: 150,
          whiteSpace: "pre-wrap",
          overflowX: "auto",
          fontSize: 12,
        }}
      >
        {response || "Waiting for prompt..."}
      </pre>
    </div>
  );
}