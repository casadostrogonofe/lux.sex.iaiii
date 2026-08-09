const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
});

test("age-gate entra na experiência e mantém conteúdo acessível", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("age-gate-overlay")).toBeVisible();
  await page.getByTestId("age-gate-enter-button").click();
  await expect(page.getByTestId("application-main-content")).toBeVisible();
  await expect(page.getByTestId("age-gate-overlay")).toHaveCount(0);
});

test("prefers-reduced-motion mantém a navegação funcional", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByTestId("age-gate-enter-button").click();
  await expect(page.getByTestId("page-transition")).toBeVisible();
});