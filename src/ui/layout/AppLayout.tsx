import "../styles/global.css";
import "../styles/glass.css";
import "../styles/layout.css";
import "../styles/sidebar.css";
import "../styles/header.css";
import "../styles/dashboard.css";
import "../styles/widgets.css";
import "../styles/animations.css";

import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import Dashboard from "../dashboard/Dashboard";

export default function AppLayout() {
  return (
    <div className="app">
      <Sidebar />
      <Header />
      <div className="workspace">
        <Dashboard />
      </div>
    </div>
  );
}
