import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { initSentry, Sentry } from "@/observability/sentry";
import "@/index.css";
import "@/i18n";
import { AppErrorFallback } from "@/components/observability/AppErrorFallback";
import { RouteSkeleton } from "@/components/motion/RouteSkeleton";

const App = lazy(() => import("@/App"));

initSentry();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={AppErrorFallback} showDialog={false}>
      <Suspense fallback={<RouteSkeleton />}>
        <App />
      </Suspense>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
);
