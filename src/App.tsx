import AppShell from "./layout/AppShell";
import Dashboard from "./features/dashboard/Dashboard";

import TimelineAI from "./features/timeline/TimelineAI";
import WeddingAI from "./features/wedding/WeddingAI";
import AutoEdit from "./features/auto-edit/AutoEdit";
import FaceAI from "./features/face/FaceAI";
import MusicAI from "./features/music/MusicAI";
import ExportStudio from "./features/export/ExportStudio";
import Settings from "./features/settings/Settings";

import { useNavigation } from "./context/NavigationContext";

export default function App() {
  const { page } = useNavigation();

  let content;

  switch (page) {
    case "timeline":
      content = <TimelineAI />;
      break;

    case "wedding":
      content = <WeddingAI />;
      break;

    case "autoedit":
      content = <AutoEdit />;
      break;

    case "faceai":
      content = <FaceAI />;
      break;

    case "musicai":
      content = <MusicAI />;
      break;

    case "exports":
      content = <ExportStudio />;
      break;

    case "settings":
      content = <Settings />;
      break;

    default:
      content = <Dashboard />;
  }

  return <AppShell>{content}</AppShell>;
}
