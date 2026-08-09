const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
});

test("age-gate entra na experiência e mantém conteúdo acessível", async ({ page }) => {
  const translationWarnings = [];
  page.on("console", (message) => {
    if (message.type() === "warning" && message.text().includes("[i18n]")) {
      translationWarnings.push(message.text());
    }
  });
  await page.goto("/");
  await expect(page.getByTestId("age-gate-overlay")).toBeVisible();
  await page.getByTestId("age-gate-enter-button").click();
  await expect(page.getByTestId("application-main-content")).toBeVisible();
  await expect(page.getByTestId("age-gate-overlay")).toHaveCount(0);
  await page.waitForTimeout(500);
  expect(translationWarnings).toEqual([]);
});

test("prefers-reduced-motion mantém a navegação funcional", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByTestId("age-gate-enter-button").click();
  await expect(page.getByTestId("page-transition")).toBeVisible();
});

test("menu principal possui controles estáveis e fecha pelo drawer", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("age-gate-enter-button").click();
  await page.getByTestId("header-menu-open-button").click();
  await expect(page.getByTestId("header-mobile-drawer")).toHaveClass(/opacity-100/);
  await page.getByTestId("header-menu-close-button").click();
  await expect(page.getByTestId("header-mobile-drawer")).toHaveClass(/opacity-0/);
});