import React from "react";

const detection = [
  "Face Detection",
  "Face Recognition",
  "Person Tracking",
  "Bride Recognition",
  "Groom Recognition",
  "Family Recognition",
  "Smile Detection",
  "Emotion Detection",
  "Eye Contact",
  "Group Detection",
  "Child Detection",
  "Portrait Detection",
];

const tools = [
  "Find Person",
  "Best Expressions",
  "Auto Close-up",
  "Emotion Timeline",
  "Reaction Detection",
  "Guest Priority",
  "Family Highlights",
  "Hero Shot Finder",
];

const FaceAI: React.FC = () => {
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
          Face AI Studio
        </h1>

        <p
          style={{
            color: "#8FAAFF",
            marginTop: 10,
          }}
        >
          AI Face Recognition & Emotion Analysis
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
            Detection Modules
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 16,
              marginTop: 22,
            }}
          >
            {detection.map((item) => (
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
          <h2 style={{ marginTop: 0 }}>Live Scan</h2>

          <div
            style={{
              marginTop: 18,
              lineHeight: 2,
            }}
          >
            Faces : 18
            <br />
            Bride : Found
            <br />
            Groom : Found
            <br />
            Family : 12
            <br />
            Smiles : 47
            <br />
            AI : Active
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
          Face AI Tools
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
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
    </div>
  );
};

export default FaceAI;