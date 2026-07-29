import React from "react";

const features = [
  "Auto Speech Detection",
  "Hindi Captions",
  "English Captions",
  "Hinglish Captions",
  "Speaker Detection",
  "Emoji Suggestions",
  "Keyword Highlight",
  "Subtitle Animation",
  "Auto Translation",
  "Multi Language",
  "Timing Optimization",
  "Noise Filtering",
];

const styles = [
  "Instagram Reel",
  "YouTube Shorts",
  "Luxury Wedding",
  "Minimal Clean",
  "Bold Modern",
  "Cinematic",
  "Kinetic",
  "Classic",
];

const CaptionAI: React.FC = () => {
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
          Caption AI Studio
        </h1>

        <p
          style={{
            color: "#8FAAFF",
            marginTop: 10,
          }}
        >
          AI Subtitle Generation & Smart Caption Styling
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
            Caption AI Features
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
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

        <div
          style={{
            borderRadius: 24,
            padding: 24,
            background: "linear-gradient(135deg,#6B63FF,#4988FF)",
            color: "#fff",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Live Status
          </h2>

          <div
            style={{
              marginTop: 18,
              lineHeight: 2,
            }}
          >
            AI Ready
            <br />
            Languages : 18
            <br />
            Speech : Active
            <br />
            Translation : Ready
            <br />
            Animation : Enabled
            <br />
            Export : Supported
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
          Caption Styles
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 16,
            marginTop: 22,
          }}
        >
          {styles.map((item) => (
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

export default CaptionAI;