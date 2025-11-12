import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Guard for SSR/SSG: only mount in the browser
if (typeof document !== 'undefined') {
  const rootEl = document.getElementById("root");
  if (rootEl) {
    createRoot(rootEl).render(<App />);
  }
}

