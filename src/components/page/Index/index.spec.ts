import { test, expect } from "@playwright/test";

test("should navigate to the about page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "population-graph-app" })).toBeVisible();
});
