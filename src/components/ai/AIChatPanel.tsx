import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import Send from "lucide-react/dist/esm/icons/send.mjs";
import Sparkles from "lucide-react/dist/esm/icons/sparkles.mjs";
import { AIController } from "../../ai/ui";
import { Button, Card, ScrollArea, StatusChip } from "../../ui/theme/primitives";
import { colors, spacing, typography } from "../../ui/theme";

const ai = new AIController();

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  time: string;
};

export default function AIChatPanel({
  title = "RK Assistant",
  greeting = "Namaste. I can help plan edits, explain the timeline, and prepare the next action.",
  suggestedActions = [],
  onAction
}: {
  title?: string;
  greeting?: string;
  suggestedActions?: string[];
  onAction?: (value: string) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: greeting,
      time: timestamp()
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function submit(value = prompt) {
    const text = value.trim();

    if (!text || loading) {
      return;
    }

    setMessages((current) => [
      ...current,
      { role: "user", text, time: timestamp() }
    ]);
    setPrompt("");
    setLoading(true);

    try {
      const reply = await ai.ask(text);
      setMessages((current) => [
        ...current,
        { role: "assistant", text: reply, time: timestamp() }
      ]);
      onAction?.(text);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: error instanceof Error ? error.message : String(error),
          time: timestamp()
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submit();
    }
  };

  return (
    <Card title={title} subtitle="Persistent AI copilot for your current workspace." style={{ height: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.md, height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: spacing.sm }}>
          <StatusChip label={loading ? "Thinking" : "Ready"} tone={loading ? "warning" : "success"} />
          <StatusChip label="Gemini 3.6 Flash" />
        </div>

        <div>
          <div style={{ color: colors.inkMuted, fontSize: typography.sizes.sm, marginBottom: spacing.xs }}>
            Suggested Actions
          </div>
          <div style={{ display: "flex", gap: spacing.xs, flexWrap: "wrap" }}>
            {suggestedActions.map((action) => (
              <Button
                key={action}
                variant="secondary"
                onClick={() => void submit(action)}
                disabled={loading}
                style={{ display: "inline-flex", alignItems: "center", gap: spacing.xs }}
              >
                <Sparkles size={14} />
                {action}
              </Button>
            ))}
          </div>
        </div>

        <ScrollArea
          style={{
            flex: "1 1 auto",
            maxHeight: "100%",
            border: `1px solid ${colors.border}`,
            borderRadius: 10,
            background: colors.white,
            padding: spacing.md
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
            {messages.map((message, index) => (
              <div
                key={`${message.time}-${index}`}
                style={{
                  alignSelf: message.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "92%"
                }}
              >
                <div
                  style={{
                    fontSize: typography.sizes.xs,
                    color: colors.inkMuted,
                    marginBottom: spacing.xs
                  }}
                >
                  {message.role === "user" ? "You" : "RK Assistant"} • {message.time}
                </div>
                <div
                  style={{
                    background: message.role === "user" ? colors.maroon : colors.panelMuted,
                    color: message.role === "user" ? colors.white : colors.ink,
                    borderRadius: 10,
                    padding: spacing.sm,
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.6
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
          <textarea
            rows={4}
            placeholder="Bride entry ko slow motion karo, or ask for a dashboard summary..."
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={onKeyDown}
            style={{
              width: "100%",
              boxSizing: "border-box",
              borderRadius: 10,
              border: `1px solid ${colors.border}`,
              background: colors.white,
              color: colors.ink,
              padding: `${spacing.sm}px ${spacing.md}px`,
              fontSize: typography.sizes.sm,
              resize: "vertical"
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm }}>
            <Button variant="ghost" onClick={() => setMessages([{ role: "assistant", text: greeting, time: timestamp() }])}>
              Reset Chat
            </Button>
            <Button
              onClick={() => void submit()}
              disabled={loading}
              style={{ display: "inline-flex", alignItems: "center", gap: spacing.xs }}
            >
              <Send size={14} />
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function timestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}
