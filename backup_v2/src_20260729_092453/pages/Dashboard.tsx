import React from "react";

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Projects",
      value: "18",
      color: "#6C63FF",
    },
    {
      title: "Sequences",
      value: "42",
      color: "#4F8CFF",
    },
    {
      title: "AI Tasks",
      value: "126",
      color: "#00C896",
    },
    {
      title: "Exports",
      value: "84",
      color: "#FFB547",
    },
  ];

  const workflow = [
    "Auto Reel",
    "Wedding Highlight",
    "AI Director",
    "Beat Sync",
    "Face Detection",
    "Color AI",
    "Reference Match",
    "Export Center",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        animation: "fadeWorkspace .35s ease",
      }}
    >
      <div>
        <div
          style={{
            color: "#fff",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          Dashboard
        </div>

        <div
          style={{
            color: "#8FAAFF",
            marginTop: 8,
          }}
        >
          Welcome back to RK Flow AI Studio
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20,
        }}
      >
        {stats.map((item) => (
          <div
            key={item.title}
            style={{
              height: 160,
              borderRadius: 24,
              background: "rgba(255,255,255,.06)",
              backdropFilter: "blur(25px)",
              border: "1px solid rgba(255,255,255,.08)",
              padding: 24,
              transition: ".3s",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                background: item.color,
                boxShadow: `0 0 25px ${item.color}`,
              }}
            />

            <div
              style={{
                marginTop: 24,
                color: "#8EA9FF",
                fontSize: 15,
              }}
            >
              {item.title}
            </div>

            <div
              style={{
                marginTop: 10,
                color: "#fff",
                fontSize: 42,
                fontWeight: 700,
              }}
            >
              {item.value}
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
            minHeight: 420,
            borderRadius: 28,
            padding: 26,
            background: "rgba(255,255,255,.06)",
            backdropFilter: "blur(25px)",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Workflow Center
          </div>

          <div
            style={{
              marginTop: 30,
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 18,
            }}
          >
            {workflow.map((item) => (
              <div
                key={item}
                style={{
                  padding: 22,
                  borderRadius: 18,
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.08)",
                  color: "#fff",
                  cursor: "pointer",
                  transition: ".25s",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div
            style={{
              borderRadius: 24,
              padding: 24,
              background:
                "linear-gradient(135deg,#6A63FF,#4B8AFF)",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              Active Project
            </div>

            <div
              style={{
                marginTop: 18,
                lineHeight: 1.9,
              }}
            >
              Baby Shower Reel
              <br />
              Duration : 03:42
              <br />
              4K Timeline
              <br />
              AI Ready
            </div>
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: 24,
              padding: 24,
              background: "rgba(255,255,255,.06)",
              backdropFilter: "blur(25px)",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <div
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              AI Suggestions
            </div>

            <div
              style={{
                marginTop: 18,
                color: "#C8D6FF",
                lineHeight: 2,
              }}
            >
              • Auto Highlight
              <br />
              • Detect Beat
              <br />
              • Smart Transition
              <br />
              • Face Tracking
              <br />
              • Auto Color Match
              <br />
              • Caption AI
              <br />
              • AI Director
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;