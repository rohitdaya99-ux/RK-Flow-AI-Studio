import React from "react";

const Timeline: React.FC = () => {
  const tracks = [
    { name: "Video Track 1", clips: 24, color: "#6C63FF" },
    { name: "Video Track 2", clips: 18, color: "#4F8CFF" },
    { name: "Video Track 3", clips: 11, color: "#00C896" },
    { name: "Audio Track 1", clips: 8, color: "#F59E0B" },
    { name: "Audio Track 2", clips: 4, color: "#EF4444" },
  ];

  const tools = [
    "Timeline Reader",
    "Track Manager",
    "Gap Detection",
    "Marker Manager",
    "Timeline Heatmap",
    "Scene Detection",
    "Selection Inspector",
    "AI Timeline Analysis",
    "Auto Cut Detection",
    "Timeline Statistics",
    "Smart Clip Finder",
    "Duplicate Clip Finder",
  ];

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
          Timeline Center
        </h1>

        <p
          style={{
            color: "#8EA8FF",
            marginTop: 10,
          }}
        >
          AI Powered Timeline Analysis
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
            borderRadius: 26,
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
            Timeline Tracks
          </h2>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {tracks.map((track) => (
              <div
                key={track.name}
                style={{
                  padding: 18,
                  borderRadius: 16,
                  background: "rgba(255,255,255,.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#fff",
                    marginBottom: 12,
                  }}
                >
                  <span>{track.name}</span>
                  <span>{track.clips} Clips</span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: 10,
                    borderRadius: 999,
                    background: "rgba(255,255,255,.08)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${track.clips * 3}%`,
                      maxWidth: "100%",
                      height: "100%",
                      background: track.color,
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderRadius: 26,
            padding: 24,
            background:
              "linear-gradient(135deg,#6B63FF,#4E88FF)",
            color: "#fff",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Live Stats
          </h2>

          <div
            style={{
              marginTop: 20,
              lineHeight: 2,
            }}
          >
            Timeline Length : 14:42
            <br />
            Video Tracks : 3
            <br />
            Audio Tracks : 3
            <br />
            Total Clips : 61
            <br />
            AI Ready : YES
            <br />
            Beat Sync : Ready
            <br />
            Scene Detection : Ready
          </div>
        </div>
      </div>

      <div
        style={{
          borderRadius: 26,
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
          Timeline AI Tools
        </h2>

        <div
          style={{
            marginTop: 22,
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
                color: "#fff",
                border: "1px solid rgba(255,255,255,.06)",
              }}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;