import React from "react";

const cards = [
  {
    title: "Instagram Reel",
    subtitle: "Vertical 30-90 sec",
    color: "#6B63FF",
  },
  {
    title: "Wedding Highlight",
    subtitle: "5-15 min Film",
    color: "#4F8CFF",
  },
  {
    title: "Cinematic Teaser",
    subtitle: "60-120 sec",
    color: "#00C896",
  },
  {
    title: "Baby Shower Reel",
    subtitle: "Auto AI Edit",
    color: "#F59E0B",
  },
];

const tools = [
  "Best Clip Detection",
  "Beat Sync",
  "Auto Transition",
  "AI Director",
  "Smart Crop",
  "Emotion Detection",
  "Face Priority",
  "Scene Detection",
  "Story Builder",
  "Reference Match AI",
  "Learn My Style",
  "Auto Export",
];

const AutoEdit: React.FC = () => {
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
            margin: 0,
            fontSize: 34,
          }}
        >
          Auto Edit Studio
        </h1>

        <p
          style={{
            color: "#8EA8FF",
            marginTop: 10,
          }}
        >
          AI Powered Editing Workspace
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 18,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              padding: 24,
              borderRadius: 24,
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.08)",
              backdropFilter: "blur(25px)",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: card.color,
                boxShadow: `0 0 22px ${card.color}`,
              }}
            />

            <h2
              style={{
                color: "#fff",
                marginTop: 24,
                marginBottom: 8,
              }}
            >
              {card.title}
            </h2>

            <div
              style={{
                color: "#A6BAFF",
              }}
            >
              {card.subtitle}
            </div>
          </div>
        ))}
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
            Auto Edit Modules
          </h2>

          <div
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 16,
            }}
          >
            {tools.map((tool) => (
              <div
                key={tool}
                style={{
                  padding: 18,
                  borderRadius: 16,
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.06)",
                  color: "#fff",
                }}
              >
                {tool}
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
          <h2 style={{ marginTop: 0 }}>
            AI Workflow
          </h2>

          <div
            style={{
              marginTop: 20,
              lineHeight: 2,
            }}
          >
            ✔ Detect Best Clips
            <br />
            ✔ Analyze Music
            <br />
            ✔ Detect Faces
            <br />
            ✔ Sync Beat
            <br />
            ✔ Build Story
            <br />
            ✔ Apply Transitions
            <br />
            ✔ Auto Export
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoEdit;