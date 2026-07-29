import { createRoot } from "react-dom/client";

import App from "./app/App";

import "./styles/colors.css";
import "./styles/spacing.css";
import "./styles/typography.css";
import "./styles/globals.css";
import "./styles/responsive.css";
import "./styles/glass.css";
import "./styles/animation.css";

const root = document.getElementById("root");

createRoot(root!).render(<App />);
