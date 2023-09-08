import { test, expect } from "../../../mocks/handlers";

test("should render first page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "population-graph-app" })).toBeVisible();
});
