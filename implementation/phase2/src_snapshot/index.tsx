import ReactDOM from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");

if (!root) {
  document.body.innerHTML = "<h1 style='color:red'>ROOT NOT FOUND</h1>";
} else {
  ReactDOM.createRoot(root).render(<App />);
}
