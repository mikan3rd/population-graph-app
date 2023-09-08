import { test, expect } from "next/experimental/testmode/playwright/msw";

import "../../../mocks/setup";

test.describe("Index page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("initial render", () => {
    test("render page title", async ({ page }) => {
      const heading = await page.getByRole("heading", { name: "population-graph-app" });
      await expect(heading).toBeVisible();
    });

    test("render checkboxes for 47 prefectures", async ({ page }) => {
      const heading = await page.getByRole("heading", { name: "都道府県を選択してください（複数可）" });
      await expect(heading).toBeVisible();

      const checkboxList = await page.$$('[type="checkbox"]');
      await expect(checkboxList).toHaveLength(47);
    });

    test("render chart label radio buttons", async ({ page }) => {
      const heading = await page.getByRole("heading", { name: "表示するデータを選択してください" });
      await expect(heading).toBeVisible();

      const radioList = await page.$$('[type="radio"]');
      await expect(radioList).toHaveLength(4);
    });

    test("render chart", async ({ page }) => {
      const chartTitle = await page.locator(".highcharts-title");
      await expect(chartTitle).toBeVisible();
    });
  });
});
