import React from "react";

const RightPanel: React.FC = () => {
  const aiCards = [
    {
      name: "RK AI",
      color: "#7B61FF",
      status: "Ready",
    },
    {
      name: "ChatGPT",
      color: "#10A37F",
      status: "Connected",
    },
    {
      name: "Gemini",
      color: "#4285F4",
      status: "Connected",
    },
    {
      name: "Claude",
      color: "#D97706",
      status: "Ready",
    },
    {
      name: "Grok",
      color: "#111827",
      status: "Offline",
    },
    {
      name: "Kimi",
      color: "#3B82F6",
      status: "Ready",
    },
  ];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 28,
        overflow: "hidden",
        background: "rgba(255,255,255,.07)",
        backdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 30px 80px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          padding: 24,
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          AI Command Center
        </div>

        <div
          style={{
            marginTop: 6,
            color: "#93A9FF",
            fontSize: 14,
          }}
        >
          All AI Engines
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 20,
        }}
      >
        {aiCards.map((ai) => (
          <div
            key={ai.name}
            style={{
              marginBottom: 14,
              padding: 18,
              borderRadius: 18,
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.08)",
              transition: ".25s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: ai.color,
                    boxShadow: `0 0 20px ${ai.color}`,
                  }}
                />

                <div
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {ai.name}
                </div>
              </div>

              <div
                style={{
                  color: "#8FD6A8",
                  fontSize: 13,
                }}
              >
                {ai.status}
              </div>
            </div>
          </div>
        ))}

        <div
          style={{
            marginTop: 30,
            padding: 22,
            borderRadius: 20,
            background:
              "linear-gradient(135deg,#6B63FF,#4E88FF)",
            color: "#fff",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            Team Mode
          </div>

          <div
            style={{
              marginTop: 8,
              opacity: .9,
              lineHeight: 1.6,
            }}
          >
            RK AI + ChatGPT + Gemini + Claude +
            Grok + Kimi
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            padding: 22,
            borderRadius: 20,
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Upcoming AI Features
          </div>

          <div style={{ color: "#C8D5FF", lineHeight: 2 }}>
            • Compare Mode
            <br />
            • Voice Commands
            <br />
            • Prompt Library
            <br />
            • AI Memory
            <br />
            • AI Director
            <br />
            • Learn My Style
            <br />
            • Reference Match AI
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;