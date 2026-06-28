import { createRoot } from "react-dom/client";
import "@fontsource/geist-sans";
import "@fontsource/geist-mono";
import "@fontsource/instrument-serif";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
