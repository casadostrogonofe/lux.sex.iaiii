const path = require("path");
const { defineConfig } = require("vitest/config");
const react = require("@vitejs/plugin-react").default;

module.exports = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.js"],
    exclude: ["e2e/**", "node_modules/**", "build/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/components/ui/**",
        "src/mock/**",
        "src/i18n/locales/**",
        "src/index.js",
      ],
      thresholds: {
        statements: 1.5,
        branches: 10,
        functions: 10,
        lines: 1.5,
      },
    },
  },
});