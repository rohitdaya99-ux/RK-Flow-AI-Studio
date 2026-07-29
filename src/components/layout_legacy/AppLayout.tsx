import React, { useEffect, useMemo, useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import RightPanel from "./RightPanel";
import StatusBar from "./StatusBar";

import Dashboard from "../../pages/Dashboard";
import AICommandCenter from "../../pages/AICommandCenter";
import Timeline from "../../pages/Timeline";
import AutoEdit from "../../pages/AutoEdit";
import WeddingAI from "../../pages/WeddingAI";
import MusicAI from "../../pages/MusicAI";
import FaceAI from "../../pages/FaceAI";
import ColorAI from "../../pages/ColorAI";
import MotionFX from "../../pages/MotionFX";
import CaptionAI from "../../pages/CaptionAI";
import Assets from "../../pages/Assets";
import Export from "../../pages/Export";
import Analytics from "../../pages/Analytics";
import Marketplace from "../../pages/Marketplace";
import Developer from "../../pages/Developer";
import Settings from "../../pages/Settings";

export type PageType =
  | "dashboard"
  | "ai"
  | "timeline"
  | "autoEdit"
  | "wedding"
  | "music"
  | "face"
  | "color"
  | "motion"
  | "caption"
  | "assets"
  | "export"
  | "analytics"
  | "marketplace"
  | "developer"
  | "settings";

const AppLayout: React.FC = () => {
  const [page, setPage] = useState<PageType>("dashboard");

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((v) => !v);
      }

      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, []);

  const CurrentPage = useMemo(() => {
    switch (page) {
      case "dashboard":
        return <Dashboard />;

      case "ai":
        return <AICommandCenter />;

      case "timeline":
        return <Timeline />;

      case "autoEdit":
        return <AutoEdit />;

      case "wedding":
        return <WeddingAI />;

      case "music":
        return <MusicAI />;

      case "face":
        return <FaceAI />;

      case "color":
        return <ColorAI />;

      case "motion":
        return <MotionFX />;

      case "caption":
        return <CaptionAI />;

      case "assets":
        return <Assets />;

      case "export":
        return <Export />;

      case "analytics":
        return <Analytics />;

      case "marketplace":
        return <Marketplace />;

      case "developer":
        return <Developer />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  }, [page]);

  return (
    <div
      className="rk-app"
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: sidebarCollapsed
          ? "86px 1fr 380px"
          : "290px 1fr 380px",
        gridTemplateRows: "80px 1fr 42px",
        background:
          "radial-gradient(circle at top,#233563 0%,#151d34 45%,#0a1020 100%)",
        transition: "grid-template-columns .35s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div
        style={{
          gridColumn: 1,
          gridRow: "1 / span 2",
          padding: 14,
          overflow: "hidden",
        }}
      >
        <Sidebar
          currentPage={page}
          onNavigate={setPage}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />
      </div>

      <div
        style={{
          gridColumn: 2,
          gridRow: 1,
          paddingTop: 14,
          paddingRight: 14,
        }}
      >
        <Topbar
          search={searchValue}
          onSearch={setSearchValue}
          onCommand={() => setCommandPaletteOpen(true)}
        />
      </div>

      <div
        style={{
          gridColumn: 3,
          gridRow: "1 / span 2",
          padding: 14,
        }}
      >
        <RightPanel />
      </div>

      <main
        style={{
          gridColumn: 2,
          gridRow: 2,
          padding: 14,
          overflowY: "auto",
          overflowX: "hidden",
          animation: "fadeWorkspace .45s ease",
        }}
      >
        {CurrentPage}
      </main>

      <div
        style={{
          gridColumn: "1 / span 3",
          gridRow: 3,
          paddingLeft: 14,
          paddingRight: 14,
          paddingBottom: 12,
        }}
      >
        <StatusBar />
      </div>

      {commandPaletteOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(4,8,18,.45)",
            backdropFilter: "blur(18px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: 80,
            zIndex: 9999,
            animation: "fadeWorkspace .25s ease",
          }}
          onClick={() => setCommandPaletteOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 760,
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,.12)",
              background: "rgba(24,32,54,.82)",
              backdropFilter: "blur(40px)",
              overflow: "hidden",
              boxShadow: "0 40px 120px rgba(0,0,0,.45)",
            }}
          >
            <input
              autoFocus
              placeholder="Search commands..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                width: "100%",
                border: 0,
                outline: 0,
                background: "transparent",
                color: "#fff",
                fontSize: 20,
                padding: 26,
              }}
            />

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,.08)",
                padding: 22,
                color: "#BFD1FF",
              }}
            >
              Command Palette
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;