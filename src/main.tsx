import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// App is already imported with correct casing

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
