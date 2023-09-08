import { test, expect } from "../../../mocks/handlers";

test.describe("Index page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("render first page", async ({ page }) => {
    const heading = await page.getByRole("heading", { name: "population-graph-app" });
    await expect(heading).toBeVisible();
  });

  test("render 47 prefectures", async ({ page }) => {
    await page.waitForSelector("h2");
    const checkboxList = await page.$$('[type="checkbox"]');
    await expect(checkboxList).toHaveLength(47);
  });
});
