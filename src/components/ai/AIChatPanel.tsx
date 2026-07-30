import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { AIController } from "../../ai/ui";

const ai = new AIController();

type Message = {
  role: "user" | "assistant";
  text: string;
  time: string;
};

export default function AIChatPanel() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "👋 Welcome to RK Flow AI",
      time: new Date().toLocaleTimeString()
    }
  ]);

  const fileInput = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const send = async () => {
    const text = prompt.trim();

    if (!text || loading) return;

    setMessages((m) => [
      ...m,
      {
        role: "user",
        text,
        time: new Date().toLocaleTimeString()
      }
    ]);

    setPrompt("");
    setLoading(true);

    try {
      const reply = await ai.ask(text);

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: reply,
          time: new Date().toLocaleTimeString()
        }
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: String(e),
          time: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 12
      }}
    >
      <h2>RK Flow AI</h2>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #333",
          borderRadius: 12,
          padding: 14
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: 18,
              textAlign: m.role === "user" ? "right" : "left"
            }}
          >
            <strong>{m.role === "user" ? "You" : "RK Flow AI"}</strong>

            <div
              style={{
                opacity: 0.6,
                fontSize: 11
              }}
            >
              {m.time}
            </div>

            <div
              style={{
                marginTop: 6,
                whiteSpace: "pre-wrap"
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && <div>🤖 Thinking...</div>}

        <div ref={bottomRef} />
      </div>

      <textarea
        ref={textareaRef}
        rows={4}
        placeholder="Ask RK Flow AI..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={onKeyDown}
      />

      <div
        style={{
          display: "flex",
          gap: 8
        }}
      >
        <button onClick={() => void send()} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>

        <button onClick={() => fileInput.current?.click()}>
          Attach
        </button>

        <button
          onClick={() =>
            setMessages([
              {
                role: "assistant",
                text: "👋 Chat cleared.",
                time: new Date().toLocaleTimeString()
              }
            ])
          }
        >
          Clear
        </button>
      </div>

      <input ref={fileInput} type="file" hidden />
    </div>
  );
}
