import React from "react";

const events = [
  "Bride Entry",
  "Groom Entry",
  "Pre Wedding",
  "Haldi",
  "Mehndi",
  "Sangeet",
  "Baraat",
  "Varmala",
  "Pheras",
  "Sindoor",
  "Reception",
  "Vidaai",
  "Engagement",
  "Baby Shower",
  "Anniversary",
  "Birthday",
  "Couple Story",
  "Family Moments",
];

const features = [
  "Best Moments AI",
  "Emotion Detection",
  "Bride Priority",
  "Groom Priority",
  "Family Detection",
  "Slow Motion Detection",
  "Fireworks Detection",
  "Confetti Detection",
  "Drone Shot Detection",
  "Portrait Detection",
  "Close-up Detection",
  "Wide Shot Detection",
];

const WeddingAI: React.FC = () => {
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
          Wedding AI Studio
        </h1>

        <p
          style={{
            color: "#8FAAFF",
            marginTop: 10,
          }}
        >
          AI Designed For Indian Wedding Editors
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
            Wedding Events
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 16,
              marginTop: 22,
            }}
          >
            {events.map((item) => (
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
            AI Workflow
          </h2>

          <div
            style={{
              marginTop: 18,
              lineHeight: 2,
            }}
          >
            ✔ Detect Bride
            <br />
            ✔ Detect Groom
            <br />
            ✔ Detect Family
            <br />
            ✔ Emotion Analysis
            <br />
            ✔ Story Timeline
            <br />
            ✔ Best Highlight
            <br />
            ✔ Auto Reel
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
          Wedding AI Modules
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 16,
            marginTop: 22,
          }}
        >
          {features.map((item) => (
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

export default WeddingAI;