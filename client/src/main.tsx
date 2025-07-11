import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { measureWebVitals, addResourceHints } from "./utils/performance";

// Initialize performance monitoring
measureWebVitals();
addResourceHints();

createRoot(document.getElementById("root")!).render(<App />);
