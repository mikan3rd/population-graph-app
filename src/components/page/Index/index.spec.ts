import { test, expect } from "../../../mocks/handlers";

test("should render first page", async ({ page }) => {
  await page.goto("/");

  const heading = await page.getByRole("heading", { name: "population-graph-app" });
  await expect(heading).toBeVisible();

  const checkboxList = await page.$$('[type="checkbox"]');
  await expect(checkboxList).toHaveLength(47);
});
