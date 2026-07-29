import React from "react";
import {
  LayoutDashboard,
  Bot,
  Clapperboard,
  Wand2,
  HeartHandshake,
  Music2,
  ScanFace,
  Palette,
  Sparkles,
  Captions,
  FolderKanban,
  Upload,
  BarChart3,
  Store,
  Wrench,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type { PageType } from "./AppLayout";

interface Props {
  currentPage: PageType;
  collapsed: boolean;
  onNavigate: (page: PageType) => void;
  onToggle: () => void;
}

interface NavItem {
  icon: React.ReactNode;
  title: string;
  page: PageType;
}

const items: NavItem[] = [
  {
    icon: <LayoutDashboard size={20} />,
    title: "Dashboard",
    page: "dashboard",
  },
  {
    icon: <Bot size={20} />,
    title: "AI Command Center",
    page: "ai",
  },
  {
    icon: <Clapperboard size={20} />,
    title: "Timeline",
    page: "timeline",
  },
  {
    icon: <Wand2 size={20} />,
    title: "Auto Edit",
    page: "autoEdit",
  },
  {
    icon: <HeartHandshake size={20} />,
    title: "Wedding AI",
    page: "wedding",
  },
  {
    icon: <Music2 size={20} />,
    title: "Music AI",
    page: "music",
  },
  {
    icon: <ScanFace size={20} />,
    title: "Face AI",
    page: "face",
  },
  {
    icon: <Palette size={20} />,
    title: "Color AI",
    page: "color",
  },
  {
    icon: <Sparkles size={20} />,
    title: "Motion & FX",
    page: "motion",
  },
  {
    icon: <Captions size={20} />,
    title: "Caption AI",
    page: "caption",
  },
  {
    icon: <FolderKanban size={20} />,
    title: "Assets",
    page: "assets",
  },
  {
    icon: <Upload size={20} />,
    title: "Export",
    page: "export",
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Analytics",
    page: "analytics",
  },
  {
    icon: <Store size={20} />,
    title: "Marketplace",
    page: "marketplace",
  },
  {
    icon: <Wrench size={20} />,
    title: "Developer",
    page: "developer",
  },
  {
    icon: <Settings size={20} />,
    title: "Settings",
    page: "settings",
  },
];

const Sidebar: React.FC<Props> = ({
  currentPage,
  collapsed,
  onNavigate,
  onToggle,
}) => {
  return (
    <aside
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 28,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "rgba(255,255,255,.08)",
        backdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,.12)",
        boxShadow: "0 30px 80px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          height: 82,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: "0 18px",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        {!collapsed && (
          <div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              RK Flow
            </div>

            <div
              style={{
                color: "#8EA8FF",
                fontSize: 12,
              }}
            >
              AI Studio
            </div>
          </div>
        )}

        <button
          onClick={onToggle}
          style={{
            width: 42,
            height: 42,
            border: 0,
            cursor: "pointer",
            borderRadius: 12,
            background: "rgba(255,255,255,.08)",
            color: "#fff",
          }}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 14,
        }}
      >
        {items.map((item) => {
          const active = currentPage === item.page;

          return (
            <div
              key={item.page}
              onClick={() => onNavigate(item.page)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                cursor: "pointer",
                marginBottom: 8,
                borderRadius: 16,
                padding: collapsed ? "14px" : "14px 18px",
                color: "#fff",
                transition: ".25s",
                background: active
                  ? "linear-gradient(135deg,#6B63FF,#4F7DFF)"
                  : "transparent",
                boxShadow: active
                  ? "0 15px 40px rgba(94,106,255,.35)"
                  : "none",
              }}
            >
              {item.icon}

              {!collapsed && (
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {item.title}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {!collapsed && (
        <div
          style={{
            padding: 18,
            borderTop: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <div
            style={{
              borderRadius: 18,
              padding: 18,
              background:
                "linear-gradient(145deg,rgba(110,90,255,.9),rgba(80,130,255,.9))",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              RK AI Premium
            </div>

            <div
              style={{
                fontSize: 13,
                opacity: .9,
              }}
            >
              AI Editing Workspace
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;