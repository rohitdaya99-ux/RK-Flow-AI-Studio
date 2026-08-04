import { memo, useCallback, useEffect, useMemo, useState } from "react";
import AIChatPanel from "../components/ai/AIChatPanel";
import LearnStyleComponent from "../components/LearnStyleComponent";
import AutoEditComponent from "../components/AutoEditComponent";
import ColorAIComponent from "../components/ColorAIComponent";
import MotionAIComponent from "../components/MotionAIComponent";
import AudioAIComponent from "../components/AudioAIComponent";
import CaptionAIComponent from "../components/CaptionAIComponent";
import { MemoryEngine } from "../core/brain";
import AIDirectorScreen from "../features/ai-director";
import AnalyticsScreen from "../features/analytics";
import AssetAIScreen from "../features/asset-ai";
import CameraAIScreen from "../features/camera-ai";
import ClipIntelligenceScreen from "../features/clip-intelligence";
import EmotionAIScreen from "../features/emotion-ai";
import ExportAIScreen from "../features/export-ai";
import FaceAIScreen from "../features/face-ai";
import DeveloperCenterScreen from "../features/developer-center";
import MusicAIScreen from "../features/music-ai";
import PromptReelScreen from "../features/prompt-reel";
import ReferenceAIScreen from "../features/reference-ai";
import SettingsPage from "../features/SettingsPage";
import TimelineAIScreen from "../features/timeline-ai";
import TeamWorkspaceScreen from "../features/team-workspace";
import WeddingAIScreen from "../features/wedding-ai";
import { premiereService, TimelineInfo } from "../services/premiereService";
import { getSystemStats } from "../services/systemStats";
import ExecutionPreviewModal from "../ui/components/ExecutionPreviewModal";
import ErrorBoundary from "../ui/components/ErrorBoundary";
import {
  Button,
  Card,
  IconButton,
  ProgressBar,
  ScrollArea,
  StatusChip
} from "../ui/theme/primitives";
import { colors, shadows, spacing, typography } from "../ui/theme";
import Activity from "lucide-react/dist/esm/icons/activity.mjs";
import Aperture from "lucide-react/dist/esm/icons/aperture.mjs";
import AudioLines from "lucide-react/dist/esm/icons/audio-lines.mjs";
import BadgeIndianRupee from "lucide-react/dist/esm/icons/badge-indian-rupee.mjs";
import Bot from "lucide-react/dist/esm/icons/bot.mjs";
import Camera from "lucide-react/dist/esm/icons/camera.mjs";
import Captions from "lucide-react/dist/esm/icons/captions.mjs";
import Clapperboard from "lucide-react/dist/esm/icons/clapperboard.mjs";
import Download from "lucide-react/dist/esm/icons/download.mjs";
import Film from "lucide-react/dist/esm/icons/film.mjs";
import FolderKanban from "lucide-react/dist/esm/icons/folder-kanban.mjs";
import HeartHandshake from "lucide-react/dist/esm/icons/heart-handshake.mjs";
import LayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard.mjs";
import Mic2 from "lucide-react/dist/esm/icons/mic-vocal.mjs";
import MonitorCog from "lucide-react/dist/esm/icons/monitor-cog.mjs";
import Music4 from "lucide-react/dist/esm/icons/music-4.mjs";
import Palette from "lucide-react/dist/esm/icons/palette.mjs";
import ScanFace from "lucide-react/dist/esm/icons/scan-face.mjs";
import Scissors from "lucide-react/dist/esm/icons/scissors.mjs";
import Settings from "lucide-react/dist/esm/icons/settings.mjs";
import Sparkles from "lucide-react/dist/esm/icons/sparkles.mjs";
import TimerReset from "lucide-react/dist/esm/icons/timer-reset.mjs";
import Users from "lucide-react/dist/esm/icons/users.mjs";
import Waves from "lucide-react/dist/esm/icons/waves-horizontal.mjs";

type ModulePhase = 1 | 2 | 3 | 4;
type ModuleId =
  | "dashboard"
  | "wedding-ai"
  | "face-ai"
  | "emotion-ai"
  | "camera-ai"
  | "clip-intelligence"
  | "music-ai"
  | "timeline-ai"
  | "auto-edit"
  | "prompt-reel"
  | "ai-director"
  | "reference-ai"
  | "learn-style"
  | "color-ai"
  | "motion-ai"
  | "audio-ai"
  | "caption-ai"
  | "voice-chat"
  | "asset-ai"
  | "export-ai"
  | "team-workspace"
  | "analytics"
  | "developer-center"
  | "director-learn"
  | "settings";

type ModuleGroup = {
  label: string;
  items: Array<{
    id: ModuleId;
    title: string;
    phase: ModulePhase;
    icon: JSX.Element;
    description: string;
  }>;
};

const MODULE_GROUPS: ModuleGroup[] = [
  {
    label: "AI Core",
    items: [
      { id: "dashboard", title: "Dashboard", phase: 1, icon: <LayoutDashboard size={16} />, description: "Studio overview and project pulse." },
      { id: "ai-director", title: "AI Director", phase: 3, icon: <Bot size={16} />, description: "Full autonomous wedding-film creation." },
      { id: "reference-ai", title: "Reference AI", phase: 3, icon: <Film size={16} />, description: "Analyze reels and recreate style." }
    ]
  },
  {
    label: "Timeline",
    items: [
      { id: "timeline-ai", title: "Timeline AI", phase: 2, icon: <Clapperboard size={16} />, description: "Timeline health, cleanup, and execution." },
      { id: "auto-edit", title: "Auto Edit", phase: 3, icon: <Scissors size={16} />, description: "One-click reels, highlights, and teasers." },
      { id: "prompt-reel", title: "Prompt Reel", phase: 3, icon: <Sparkles size={16} />, description: "Free-text reel generation from Premiere clips." },
      { id: "voice-chat", title: "Voice / Chat", phase: 3, icon: <Mic2 size={16} />, description: "Natural-language edit commands." }
    ]
  },
  {
    label: "Wedding",
    items: [
      { id: "wedding-ai", title: "Wedding AI", phase: 2, icon: <Sparkles size={16} />, description: "Indian wedding event detection." },
      { id: "learn-style", title: "Learn My Style", phase: 3, icon: <HeartHandshake size={16} />, description: "Capture Rohit's edit patterns." },
      { id: "director-learn", title: "Templates", phase: 1, icon: <BadgeIndianRupee size={16} />, description: "Preset-driven wedding storytelling." }
    ]
  },
  {
    label: "Vision",
    items: [
      { id: "face-ai", title: "Face AI", phase: 2, icon: <ScanFace size={16} />, description: "Bride, groom, family, guest search." },
      { id: "emotion-ai", title: "Emotion AI", phase: 2, icon: <HeartHandshake size={16} />, description: "Emotion and reaction scoring." },
      { id: "camera-ai", title: "Camera AI", phase: 2, icon: <Camera size={16} />, description: "Shot type and motion classification." },
      { id: "clip-intelligence", title: "Clip Intelligence", phase: 2, icon: <Aperture size={16} />, description: "Blur, exposure, and AI rating." }
    ]
  },
  {
    label: "Music / Audio",
    items: [
      { id: "music-ai", title: "Music AI", phase: 2, icon: <Music4 size={16} />, description: "Beat, BPM, mood, and chorus detection." },
      { id: "audio-ai", title: "Audio AI", phase: 3, icon: <AudioLines size={16} />, description: "Denoise, ducking, voice cleanup." },
      { id: "caption-ai", title: "Caption AI", phase: 3, icon: <Captions size={16} />, description: "Hindi, English, and Hinglish captions." }
    ]
  },
  {
    label: "Color / Motion",
    items: [
      { id: "color-ai", title: "Color AI", phase: 3, icon: <Palette size={16} />, description: "Film look, skin protection, match." },
      { id: "motion-ai", title: "Motion AI", phase: 3, icon: <Waves size={16} />, description: "Pan, zoom, parallax, blur helpers." }
    ]
  },
  {
    label: "Assets / Export",
    items: [
      { id: "asset-ai", title: "Asset AI", phase: 4, icon: <FolderKanban size={16} />, description: "Smart media search and collections." },
      { id: "export-ai", title: "Export AI", phase: 4, icon: <Download size={16} />, description: "Preset exports and queue." }
    ]
  },
  {
    label: "Team / Ops",
    items: [
      { id: "team-workspace", title: "Team Workspace", phase: 4, icon: <Users size={16} />, description: "Comments, approvals, versioning." },
      { id: "analytics", title: "Analytics", phase: 4, icon: <Activity size={16} />, description: "AI usage and performance telemetry." },
      { id: "developer-center", title: "Developer Center", phase: 4, icon: <MonitorCog size={16} />, description: "Logs, prompts, and diagnostics." },
      { id: "settings", title: "Settings", phase: 1, icon: <Settings size={16} />, description: "Gemini key and provider setup." }
    ]
  }
];

const QUICK_ACTIONS = [
  "Summarize current sequence",
  "Plan a 45-second wedding reel",
  "Check timeline health",
  "Suggest next module"
];

const RECENT_PROJECTS = [
  "Baby Shower Highlights",
  "Sangeet Master Sequence",
  "Vidaai Short Reel"
];

const memory = new MemoryEngine();
const NAV_ITEM_COUNT = MODULE_GROUPS.reduce((count, group) => count + group.items.length, 0);
const IS_DEV = process.env.NODE_ENV !== "production";

export default function AppShell() {
  const [activeModule, setActiveModule] = useState<ModuleId>("dashboard");
  const [timelineInfo, setTimelineInfo] = useState<TimelineInfo | null>(null);
  const [shellWidth, setShellWidth] = useState(() => readPanelWidth());
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(true);
  const [assistantLog, setAssistantLog] = useState<string[]>([]);

  useEffect(() => {
    console.log("[RK Flow] Active module:", activeModule);
  }, [activeModule]);

  useEffect(() => {
    const syncLayout = () => {
      const width = readPanelWidth();

      setShellWidth((current) => (current === width ? current : width));
      setNavCollapsed((current) => {
        const next = width < 900;
        return current === next ? current : next;
      });
      setAssistantOpen((current) => {
        const next = width >= 960;
        return current === next ? current : next;
      });
    };

    syncLayout();
    window.addEventListener("resize", syncLayout);

    return () => window.removeEventListener("resize", syncLayout);
  }, []);

  useEffect(() => {
    void premiereService.getTimelineInfo().then(setTimelineInfo);
  }, []);

  const activeConfig = useMemo(() => {
    for (const group of MODULE_GROUPS) {
      const found = group.items.find((item) => item.id === activeModule);

      if (found) {
        return found;
      }
    }

    return MODULE_GROUPS[0].items[0];
  }, [activeModule]);
  const systemStats = getSystemStats();
  const shellPadding = shellWidth > 0 && shellWidth < 480 ? spacing.sm : spacing.lg;

  const assistantActions = useMemo(() => {
    const perModule: Partial<Record<ModuleId, string[]>> = {
      dashboard: QUICK_ACTIONS,
      "wedding-ai": ["Detect Haldi and Sangeet segments", "Label Bride Entry", "Show event timeline"],
      "face-ai": ["Find all Bride clips", "List family appearances", "Rename person cluster"],
      "emotion-ai": ["Filter smile clips", "Show reaction moments", "Find dance shots"],
      "camera-ai": ["Filter drone shots", "Show handheld clips", "List static shots"],
      "clip-intelligence": ["Sort by AI rating", "Show duplicate clips", "Explain low scores"],
      "music-ai": ["Show me the chorus sections", "Estimate BPM", "Overlay beat markers"],
      "timeline-ai": ["Score timeline health", "Find gaps", "Suggest cleanup report"],
      settings: ["Test Gemini connection", "Explain model setup", "Show active provider"]
    };

    return perModule[activeModule] ?? [
      `Explain ${activeConfig.title}`,
      `What lands in Phase ${activeConfig.phase}?`,
      "Suggest the next best action"
    ];
  }, [activeConfig.phase, activeConfig.title, activeModule]);

  const handleToggleNav = useCallback(() => {
    setNavCollapsed((value) => !value);
  }, []);

  const handleSelectModule = useCallback((moduleId: ModuleId) => {
    if (IS_DEV) {
      console.log("[RK Flow] Nav click:", moduleId);
    }

    setActiveModule((current) => (current === moduleId ? current : moduleId));
  }, []);

  const handleAssistantOpen = useCallback(() => {
    setAssistantOpen(true);
  }, []);

  const handleAssistantAction = useCallback((value: string) => {
    setAssistantLog((current) => [value, ...current].slice(0, 6));
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(180deg, ${colors.ivory} 0%, ${colors.panelMuted} 100%)`,
        color: colors.ink,
        fontFamily: typography.body
      }}
    >
      <div style={{ flex: "1 1 auto", minHeight: 0, display: "flex", minWidth: 0 }}>
        <LeftNav
          activeModule={activeModule}
          navCollapsed={navCollapsed}
          onSelectModule={handleSelectModule}
          onToggleNav={handleToggleNav}
        />

        <main style={{ flex: "1 1 auto", minWidth: 0, minHeight: 0, padding: shellPadding, boxSizing: "border-box" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "stretch",
              gap: spacing.lg,
              height: "100%",
              minHeight: 0
            }}
          >
            <div style={{ flex: "1 1 auto", minWidth: 0, minHeight: 0, display: "flex", flexDirection: "column", gap: spacing.lg }}>
              <Card style={{ background: colors.panel, boxShadow: shadows.raised }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.md, flexWrap: "wrap", alignItems: "center" }}>
                  <div>
                    <div style={{ color: colors.gold, fontSize: typography.sizes.xs, fontWeight: 700, textTransform: "uppercase" }}>
                      Monday, August 3, 2026
                    </div>
                    <h1 style={{ margin: `${spacing.xs}px 0 0`, fontFamily: typography.heading, fontSize: typography.sizes.xxl, color: colors.maroonDeep }}>
                      {activeConfig.title}
                    </h1>
                    <p style={{ margin: `${spacing.xs}px 0 0`, color: colors.inkMuted }}>
                      {activeConfig.description}
                    </p>
                  </div>
                  {!assistantOpen && (
                    <Button variant="secondary" onClick={handleAssistantOpen}>
                      Open Assistant
                    </Button>
                  )}
                </div>
              </Card>

              <ScrollArea style={{ minHeight: 0 }}>
                <ErrorBoundary resetKey={activeModule}>
                  <WorkspacePanel moduleId={activeModule} timelineInfo={timelineInfo} />
                </ErrorBoundary>
              </ScrollArea>
            </div>

            {assistantOpen && (
              <div style={{ flex: "0 0 340px", width: 340, minWidth: 300, minHeight: 0 }}>
                <AIChatPanel
                  title="AI Assistant"
                  suggestedActions={assistantActions}
                  onAction={handleAssistantAction}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      <footer
        style={{
          flex: "0 0 auto",
          borderTop: `1px solid ${colors.border}`,
          background: colors.panel,
          padding: `${spacing.xs}px ${shellPadding}px`,
          display: "flex",
          gap: spacing.md,
          flexWrap: "wrap",
          alignItems: "center",
          boxSizing: "border-box"
        }}
      >
        <StatusChip label="AI Ready" tone="success" />
        <StatusChip label={`GPU ${systemStats.gpu}`} />
        <StatusChip label={`RAM ${systemStats.ram}`} />
        <StatusChip label={`Timeline ${timelineInfo?.duration ?? "--"}`} />
        <StatusChip label={timelineInfo?.sequenceName || "No active sequence"} />
        <StatusChip label={`Render Queue ${assistantLog.length}`} tone="warning" />
        <StatusChip label={`Panel ${shellWidth}px`} />
      </footer>
      <ExecutionPreviewModal />
    </div>
  );
}

function readPanelWidth() {
  if (typeof window !== "undefined" && typeof window.innerWidth === "number" && Number.isFinite(window.innerWidth) && window.innerWidth > 0) {
    return Math.round(window.innerWidth);
  }

  if (typeof document !== "undefined") {
    const rootWidth = document.documentElement?.clientWidth;
    if (typeof rootWidth === "number" && Number.isFinite(rootWidth) && rootWidth > 0) {
      return rootWidth;
    }

    const bodyWidth = document.body?.clientWidth;
    if (typeof bodyWidth === "number" && Number.isFinite(bodyWidth) && bodyWidth > 0) {
      return bodyWidth;
    }
  }

  return 0;
}

const LeftNav = memo(function LeftNav({
  activeModule,
  navCollapsed,
  onSelectModule,
  onToggleNav
}: {
  activeModule: ModuleId;
  navCollapsed: boolean;
  onSelectModule: (moduleId: ModuleId) => void;
  onToggleNav: () => void;
}) {
  useEffect(() => {
    if (IS_DEV) {
      console.log("[RK Flow] LeftNav item count:", NAV_ITEM_COUNT);
    }
  }, []);

  return (
    <aside
      style={{
        width: navCollapsed ? 76 : 284,
        flex: "0 0 auto",
        borderRight: `1px solid ${colors.border}`,
        background: colors.panel,
        padding: spacing.md,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: spacing.md
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: spacing.sm,
          paddingBottom: spacing.sm,
          borderBottom: `1px solid ${colors.border}`
        }}
      >
        {!navCollapsed && (
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: typography.heading, fontSize: typography.sizes.xl, color: colors.maroonDeep }}>
              RK Flow
            </div>
            <div style={{ color: colors.inkMuted, fontSize: typography.sizes.xs, marginTop: 2 }}>
              AI Studio
            </div>
          </div>
        )}
        <IconButton onClick={onToggleNav} aria-label="Toggle navigation">
          <TimerReset size={16} />
        </IconButton>
      </div>

      <ScrollArea style={{ flex: "1 1 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md, paddingTop: spacing.xs }}>
          {MODULE_GROUPS.map((group) => (
            <div key={group.label} style={{ display: "flex", flexDirection: "column", gap: spacing.xs }}>
              {!navCollapsed && (
                <div style={{ color: colors.gold, fontSize: typography.sizes.xs, fontWeight: 700, textTransform: "uppercase" }}>
                  {group.label}
                </div>
              )}
              {group.items.map((item) => {
                const active = item.id === activeModule;

                return (
                  <Button
                    key={item.id}
                    variant={active ? "secondary" : "ghost"}
                    onClick={() => onSelectModule(item.id)}
                    title={item.title}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: spacing.sm,
                      width: "100%",
                      minHeight: 44,
                      padding: navCollapsed ? spacing.xs : spacing.sm,
                      justifyContent: navCollapsed ? "center" : "flex-start",
                      borderRadius: 10,
                      border: `1px solid ${active ? colors.gold : colors.border}`,
                      background: active ? colors.panelMuted : colors.white,
                      color: active ? colors.maroonDeep : colors.ink,
                      boxSizing: "border-box",
                      boxShadow: active ? shadows.soft : "none"
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: active ? colors.cream : colors.white,
                        color: active ? colors.maroon : colors.inkMuted,
                        border: `1px solid ${active ? colors.goldSoft : colors.border}`
                      }}
                    >
                      {item.icon}
                    </span>
                    {!navCollapsed && (
                      <span style={{ textAlign: "left", minWidth: 0, display: "flex", flexDirection: "column", gap: spacing.xs }}>
                        <span style={{ display: "block", fontWeight: 700 }}>{item.title}</span>
                        <span style={{ display: "inline-flex" }}>
                          <StatusChip label={`Phase ${item.phase}`} tone={active ? "warning" : "neutral"} />
                        </span>
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
});

function WorkspacePanel({
  moduleId,
  timelineInfo
}: {
  moduleId: ModuleId;
  timelineInfo: TimelineInfo | null;
}) {
  if (moduleId === "dashboard") {
    return <DashboardPanel timelineInfo={timelineInfo} />;
  }

  if (moduleId === "settings") {
    return <SettingsPage />;
  }

  if (moduleId === "wedding-ai") {
    return <WeddingAIScreen />;
  }

  if (moduleId === "face-ai") {
    return <FaceAIScreen />;
  }

  if (moduleId === "emotion-ai") {
    return <EmotionAIScreen />;
  }

  if (moduleId === "camera-ai") {
    return <CameraAIScreen />;
  }

  if (moduleId === "clip-intelligence") {
    return <ClipIntelligenceScreen />;
  }

  if (moduleId === "music-ai") {
    return <MusicAIScreen />;
  }

  if (moduleId === "timeline-ai") {
    return <TimelineAIScreen />;
  }

  if (moduleId === "ai-director") {
    return <AIDirectorScreen />;
  }

  if (moduleId === "reference-ai") {
    return <ReferenceAIScreen />;
  }

  if (moduleId === "learn-style") {
    return <LearnStyleComponent />;
  }

  if (moduleId === "auto-edit") {
    return <AutoEditComponent />;
  }

  if (moduleId === "prompt-reel") {
    return <PromptReelScreen />;
  }

  if (moduleId === "color-ai") {
    return <ColorAIComponent />;
  }

  if (moduleId === "motion-ai") {
    return <MotionAIComponent />;
  }

  if (moduleId === "audio-ai") {
    return <AudioAIComponent />;
  }

  if (moduleId === "caption-ai") {
    return <CaptionAIComponent />;
  }

  if (moduleId === "asset-ai") {
    return <AssetAIScreen />;
  }

  if (moduleId === "export-ai") {
    return <ExportAIScreen />;
  }

  if (moduleId === "team-workspace") {
    return <TeamWorkspaceScreen />;
  }

  if (moduleId === "analytics") {
    return <AnalyticsScreen />;
  }

  if (moduleId === "developer-center") {
    return <DeveloperCenterScreen />;
  }

  const module = MODULE_GROUPS.flatMap((group) => group.items).find((item) => item.id === moduleId);

  if (!module) {
    return null;
  }

  return (
    <Card title={module.title} subtitle={`Coming in Phase ${module.phase}`}>
      <div style={{ color: colors.inkMuted, lineHeight: 1.7 }}>
        {module.description}
      </div>
      <div style={{ marginTop: spacing.md }}>
        <StatusChip label={`Phase ${module.phase} placeholder`} />
      </div>
    </Card>
  );
}

function DashboardPanel({ timelineInfo }: { timelineInfo: TimelineInfo | null }) {
  const scopeKey = timelineInfo?.sequenceName ? `face-ai:No Project::${timelineInfo.sequenceName}` : "";
  const faceResult = scopeKey ? memory.getAnalysis<{ clusters: Array<{ role: string }> }>(scopeKey, "result") : null;
  const musicKeys = Object.keys(memory.load().analysis).filter((key) => key.startsWith("music-ai:file:"));
  const health = timelineInfo?.connected ? 82 : 18;
  const brideFound = (faceResult?.clusters ?? []).some((cluster) => cluster.role === "bride");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: spacing.md
        }}
      >
        <Card title="AI Ready" subtitle="Gemini assistant" style={{ flex: "1 1 180px" }}>
          <StatusChip label="Connected" tone="success" />
        </Card>
        <Card title="Bride Found" subtitle="Face AI cluster result" style={{ flex: "1 1 180px" }}>
          <StatusChip label={brideFound ? "Detected" : "Not detected yet"} tone={brideFound ? "success" : "warning"} />
        </Card>
        <Card title="Music Ready" subtitle="Beat engine" style={{ flex: "1 1 180px" }}>
          <StatusChip label={musicKeys.length > 0 ? "Analyzed" : "Awaiting analysis"} tone={musicKeys.length > 0 ? "success" : "warning"} />
        </Card>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: spacing.md
        }}
      >
        <Card title="Timeline Health" subtitle="Read directly from the active Premiere sequence." style={{ flex: "1 1 360px" }}>
          <ProgressBar value={health} label={timelineInfo?.sequenceName || "No active sequence"} />
          <div style={{ marginTop: spacing.md, color: colors.inkMuted, lineHeight: 1.6 }}>
            {timelineInfo?.connected
              ? `Sequence duration ${timelineInfo.duration}, with ${timelineInfo.videoTracks} video tracks and ${timelineInfo.audioTracks} audio tracks.`
              : "Premiere sequence not connected yet."}
          </div>
        </Card>

        <Card title="Quick Actions" subtitle="Phase 1 launch shortcuts." style={{ flex: "1 1 280px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {QUICK_ACTIONS.map((action) => (
              <Button key={action} variant="secondary" style={{ justifyContent: "flex-start", textAlign: "left" }}>
                {action}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: spacing.md
        }}
      >
        <Card title="Wedding Summary" subtitle="RK Brain foundation overview." style={{ flex: "1 1 360px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm, color: colors.inkMuted }}>
            <div>Event style: Indian wedding storytelling.</div>
            <div>Preferred pacing: emotional build to celebration finish.</div>
            <div>Context engine status: ready for Phase 2 perception modules.</div>
          </div>
        </Card>

        <Card title="Recent Projects" subtitle="Local workspace list." style={{ flex: "1 1 280px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {RECENT_PROJECTS.map((project) => (
              <div
                key={project}
                style={{
                  padding: spacing.sm,
                  borderRadius: 10,
                  border: `1px solid ${colors.border}`,
                  background: colors.white
                }}
              >
                {project}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
