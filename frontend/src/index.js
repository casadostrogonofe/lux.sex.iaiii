import React from "react";
import ReactDOM from "react-dom/client";
import { initSentry, Sentry } from "@/observability/sentry";
import "@/index.css";
import "@/i18n";
import App from "@/App";
import { AppErrorFallback } from "@/components/observability/AppErrorFallback";

initSentry();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={AppErrorFallback} showDialog={false}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
);
