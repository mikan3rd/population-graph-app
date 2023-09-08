import { test, expect } from "next/experimental/testmode/playwright/msw";

import "../../../mocks/setup";

test.describe("Index page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("render first page", async ({ page }) => {
    const heading = await page.getByRole("heading", { name: "population-graph-app" });
    await expect(heading).toBeVisible();
  });

  test("render checkboxes for 47 prefectures", async ({ page }) => {
    await page.waitForSelector("h2");
    const checkboxList = await page.$$('[type="checkbox"]');
    await expect(checkboxList).toHaveLength(47);
  });

  test("render chart label radio buttons", async ({ page }) => {
    await page.waitForSelector("h2");
    const radioList = await page.$$('[type="radio"]');
    await expect(radioList).toHaveLength(4);
  });
});
