import React from "react";

const packs = [
  "Wedding LUT Packs",
  "Transition Packs",
  "Motion Graphics",
  "Wedding Titles",
  "SFX Collection",
  "Music Library",
  "Instagram Presets",
  "YouTube Packs",
  "Lower Thirds",
  "Logo Reveals",
  "Color Presets",
  "Templates",
];

const services = [
  "Download Assets",
  "Cloud Sync",
  "One Click Install",
  "Update Manager",
  "License Manager",
  "Creator Store",
  "Favorites",
  "Purchase History",
];

const Marketplace: React.FC = () => {
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
          Marketplace
        </h1>

        <p
          style={{
            color: "#8FAAFF",
            marginTop: 10,
          }}
        >
          Download Assets, Templates & AI Resources
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
            Marketplace Categories
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 16,
              marginTop: 22,
            }}
          >
            {packs.map((item) => (
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
            Store Status
          </h2>

          <div
            style={{
              marginTop: 18,
              lineHeight: 2,
            }}
          >
            Assets : 18,000+
            <br />
            Updates : Live
            <br />
            Cloud : Connected
            <br />
            Downloads : Ready
            <br />
            License : Active
            <br />
            AI : Online
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
          Marketplace Services
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

export default Marketplace;