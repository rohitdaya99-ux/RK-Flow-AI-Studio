import React from "react";

const aiModels = [
  {
    name: "RK AI",
    color: "#7C5CFF",
    status: "ONLINE",
    description: "Workflow Brain",
  },
  {
    name: "ChatGPT",
    color: "#10A37F",
    status: "CONNECTED",
    description: "General Intelligence",
  },
  {
    name: "Gemini",
    color: "#4285F4",
    status: "CONNECTED",
    description: "Google AI",
  },
  {
    name: "Claude",
    color: "#D97706",
    status: "READY",
    description: "Long Context",
  },
  {
    name: "Grok",
    color: "#ffffff",
    status: "OFFLINE",
    description: "Reasoning",
  },
  {
    name: "Kimi",
    color: "#3B82F6",
    status: "READY",
    description: "Fast Assistant",
  },
];

const features = [
  "Compare Mode",
  "Team Mode",
  "Prompt Library",
  "Voice Commands",
  "AI Memory",
  "Timeline AI",
  "Wedding AI",
  "Director AI",
  "Learn My Style",
  "Reference Match AI",
  "Auto Color AI",
  "Export Assistant",
];

const AICommandCenter: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div>
        <h1
          style={{
            color: "#fff",
            fontSize: 34,
            margin: 0,
          }}
        >
          AI Command Center
        </h1>

        <p
          style={{
            color: "#8EA8FF",
            marginTop: 10,
          }}
        >
          Control every AI engine from one place.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 18,
        }}
      >
        {aiModels.map((model) => (
          <div
            key={model.name}
            style={{
              padding: 24,
              borderRadius: 22,
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.08)",
              backdropFilter: "blur(25px)",
              cursor: "pointer",
              transition: ".25s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  background: model.color,
                  boxShadow: `0 0 20px ${model.color}`,
                }}
              />

              <span
                style={{
                  color: "#88F3A8",
                  fontSize: 12,
                }}
              >
                {model.status}
              </span>
            </div>

            <h2
              style={{
                color: "#fff",
                marginTop: 28,
                marginBottom: 8,
              }}
            >
              {model.name}
            </h2>

            <div
              style={{
                color: "#9DB5FF",
              }}
            >
              {model.description}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
        }}
      >
        <div
          style={{
            borderRadius: 24,
            padding: 24,
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <h2
            style={{
              color: "#fff",
              marginTop: 0,
            }}
          >
            AI Features
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 14,
              marginTop: 24,
            }}
          >
            {features.map((item) => (
              <div
                key={item}
                style={{
                  padding: 18,
                  borderRadius: 16,
                  background: "rgba(255,255,255,.05)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,.06)",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderRadius: 24,
            padding: 24,
            background:
              "linear-gradient(135deg,#6B63FF,#4988FF)",
            color: "#fff",
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            Team Mode
          </h2>

          <div
            style={{
              marginTop: 24,
              lineHeight: 2,
            }}
          >
            ✔ RK AI
            <br />
            ✔ ChatGPT
            <br />
            ✔ Gemini
            <br />
            ✔ Claude
            <br />
            ✔ Grok
            <br />
            ✔ Kimi
            <br />
            ✔ Auto Best Answer
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICommandCenter;