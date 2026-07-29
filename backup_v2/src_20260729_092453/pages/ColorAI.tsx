import React from "react";

const analysis = [
  "Auto Color Match",
  "Skin Tone Detection",
  "White Balance",
  "Exposure Analysis",
  "Highlight Recovery",
  "Shadow Recovery",
  "Color Harmony",
  "Shot Matching",
  "LUT Recommendation",
  "Noise Detection",
  "HDR Detection",
  "Cinematic Look",
];

const presets = [
  "Wedding Warm",
  "Luxury Gold",
  "Soft Pastel",
  "Royal Cinematic",
  "Night Film",
  "Golden Hour",
  "Modern Clean",
  "Instagram Look",
];

const ColorAI: React.FC = () => {
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
          Color AI Studio
        </h1>

        <p
          style={{
            color: "#8FAAFF",
            marginTop: 10,
          }}
        >
          Intelligent Color Matching & Cinematic Grading
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
            AI Analysis
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 16,
              marginTop: 22,
            }}
          >
            {analysis.map((item) => (
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
          <h2 style={{ marginTop: 0 }}>Live Status</h2>

          <div
            style={{
              marginTop: 18,
              lineHeight: 2,
            }}
          >
            Color Match : Ready
            <br />
            Skin Tone : Excellent
            <br />
            Exposure : Balanced
            <br />
            LUT : Suggested
            <br />
            HDR : Supported
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
          AI Color Presets
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 16,
            marginTop: 22,
          }}
        >
          {presets.map((item) => (
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

export default ColorAI;