import AppShell from "../layout/AppShell";
import useResponsiveScale from "../hooks/useResponsiveScale";

export default function App() {

  useResponsiveScale();

  return <AppShell />;

}
