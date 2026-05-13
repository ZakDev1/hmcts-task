import { createRoot } from "react-dom/client";
import "govuk-frontend/dist/govuk/govuk-frontend.min.css";
import App from "./App";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
