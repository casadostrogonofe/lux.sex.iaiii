import * as Sentry from "@sentry/react";

const EMAIL_PATTERN = /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g;
const BEARER_PATTERN = /Bearer\s+[^\s]+/gi;
const MONGO_PATTERN = /mongodb(?:\+srv)?:\/\/[^\s]+/gi;

export const scrubSensitiveText = (value) => {
  if (typeof value !== "string") return value;
  return value
    .replace(EMAIL_PATTERN, "[email]")
    .replace(BEARER_PATTERN, "Bearer [redacted]")
    .replace(MONGO_PATTERN, "[mongodb-uri]");
};

const scrubEvent = (event) => {
  delete event.user;
  if (event.request) {
    delete event.request.cookies;
    delete event.request.data;
    delete event.request.headers;
    delete event.request.query_string;
  }
  if (event.message) event.message = scrubSensitiveText(event.message);
  return event;
};

export const initSentry = () => {
  const dsn = process.env.REACT_APP_SENTRY_DSN;
  if (!dsn) return false;

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const traceTargets = ["localhost"];
  if (backendUrl) traceTargets.push(backendUrl);

  Sentry.init({
    dsn,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT || process.env.NODE_ENV,
    release: process.env.REACT_APP_SENTRY_RELEASE,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
    tracePropagationTargets: traceTargets,
    sendDefaultPii: false,
    beforeSend: scrubEvent,
    beforeBreadcrumb(breadcrumb) {
      if (breadcrumb.message) {
        breadcrumb.message = scrubSensitiveText(breadcrumb.message);
      }
      if (breadcrumb.data) delete breadcrumb.data;
      return breadcrumb;
    },
  });
  return true;
};

export { Sentry };