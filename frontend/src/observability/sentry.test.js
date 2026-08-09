import { beforeEach, describe, expect, it, vi } from "vitest";

const init = vi.fn();
const browserTracingIntegration = vi.fn(() => ({ name: "browser-tracing" }));

vi.mock("@sentry/react", () => ({
  init,
  browserTracingIntegration,
}));

describe("Sentry frontend", () => {
  beforeEach(() => {
    vi.resetModules();
    init.mockClear();
    browserTracingIntegration.mockClear();
  });

  it("mascara e-mail, bearer token e URI Mongo", async () => {
    const { scrubSensitiveText } = await import("./sentry");
    const mongoUri = ["mongodb+srv://", "user:pass", "@cluster/db"].join("");
    const result = scrubSensitiveText(`ana@example.com Bearer token-secreto ${mongoUri}`);
    expect(result).toBe("[email] Bearer [redacted] [mongodb-uri]");
  });

  it("não inicializa sem DSN", async () => {
    const previous = process.env.REACT_APP_SENTRY_DSN;
    delete process.env.REACT_APP_SENTRY_DSN;
    const { initSentry } = await import("./sentry");
    expect(initSentry()).toBe(false);
    expect(init).not.toHaveBeenCalled();
    process.env.REACT_APP_SENTRY_DSN = previous;
  });
});