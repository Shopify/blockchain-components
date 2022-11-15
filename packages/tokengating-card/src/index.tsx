import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const tokengatingCardDiv = document.getElementById("tokengating-card");
const root = ReactDOM.createRoot(tokengatingCardDiv as HTMLElement);
const previewState = tokengatingCardDiv?.getAttribute("data-preview_state");
root.render(
  <React.StrictMode>
    <App state={previewState} />
  </React.StrictMode>
);
