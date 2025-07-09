import { createRoot } from "react-dom/client";
import BasicApp from "./basic-app";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<BasicApp />);
} else {
  console.error("Root element not found");
}
