console.log("RK FLOW BUILD: 2026-07-31 CLEAN");
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { NavigationProvider } from "./context/NavigationContext";
import { premiereService } from "./services/premiereService";
import { inspector } from "./tools/UXPInspector";
import { inspectPremiereAPI, testMoveAction } from "./executor/PremiereExecutor";

(window as any).premiereService = premiereService;
(window as any).runInspector = () => inspector.inspectEverything();
(window as any).inspectPremiereAPI = inspectPremiereAPI;
(window as any).testMoveAction = testMoveAction;
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <NavigationProvider>
      <App />
    </NavigationProvider>
  </React.StrictMode>
);

(window as any).testCommandEngine = async () => {
  const { CommandDispatcher } = await import("./commands");
  const dispatcher = new CommandDispatcher();

  console.log(dispatcher.dispatch("Create cinematic wedding reel"));
  console.log(dispatcher.dispatch("Trim silence"));
  console.log(dispatcher.dispatch("Export Instagram Reel"));
};
