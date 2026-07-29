import React from "react";

const tools = [
  "Console",
  "Logs",
  "Diagnostics",
  "Performance",
  "Memory",
  "AI Debugger",
  "Prompt Inspector",
  "API Monitor",
  "Plugin Inspector",
  "Timeline Inspector",
  "Workflow Engine",
  "Command Engine",
];

const services = [
  "Gemini API",
  "ChatGPT API",
  "Claude API",
  "Grok API",
  "Kimi API",
  "RK AI Engine",
  "Premiere UXP",
  "Cloud Services",
];

const Developer: React.FC = () => {
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
          Developer Center
        </h1>

        <p
          style={{
            color: "#8FAAFF",
            marginTop: 10,
          }}
        >
          Internal Tools, Diagnostics & AI Development
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 22,
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
            Developer Tools
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 16,
              marginTop: 22,
            }}
          >
            {tools.map((item) => (
              <div
                key={item}
                style={{
                  padding: 18,
                  borderRadius: 16,
                  color: "#fff",
                  background: "rgba(255,255,255,.05)",
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
            background: "linear-gradient(135deg,#6B63FF,#4988FF)",
            color: "#fff",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Runtime
          </h2>

          <div
            style={{
              marginTop: 18,
              lineHeight: 2,
            }}
          >
            Build : Alpha
            <br />
            UXP : Connected
            <br />
            AI : Online
            <br />
            GPU : Active
            <br />
            Logs : Running
            <br />
            Debug : Enabled
          </div>
        </div>
      </div>

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
          Connected Services
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 16,
            marginTop: 22,
          }}
        >
          {services.map((item) => (
            <div
              key={item}
              style={{
                padding: 18,
                borderRadius: 16,
                color: "#fff",
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.06)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Developer;