import { test, expect } from "next/experimental/testmode/playwright/msw";

import "../../../mocks/setup";

test.describe("Index page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  const pageName = "population-graph-app";
  const checkboxName = "都道府県を選択してください（複数可）";
  const radioButtonName = "表示するデータを選択してください";

  const prefecturesNumber = 47;
  const initialCheckedNumber = 2;

  const checkboxSelector = 'input[type="checkbox"]';
  const checkedCheckboxSelector = 'input[type="checkbox"]:checked';
  const unCheckedCheckboxSelector = 'input[type="checkbox"]:not(:checked)';
  const radioButtonSelector = 'input[type="radio"]';
  const checkedRadioButtonSelector = 'input[type="radio"]:checked';
  const unCheckedRadioButtonSelector = 'input[type="radio"]:not(:checked)';
  const checkedRadioButtonLabelSelector = 'label:has(input[type="radio"]:checked)';
  const highchartsTitleSelector = ".highcharts-title";
  const highchartsSeriesSelector = ".highcharts-series";

  test.describe("initial render", () => {
    test("render page title", async ({ page }) => {
      const heading = await page.getByRole("heading", { name: pageName }).first();
      await expect(heading).toBeVisible();
    });

    test("render checkboxes for 47 prefectures", async ({ page }) => {
      const heading = await page.getByRole("heading", { name: checkboxName });
      await expect(heading).toBeVisible();

      const checkboxList = await page.locator(checkboxSelector).all();
      await expect(checkboxList).toHaveLength(prefecturesNumber);

      const checkedCheckboxList = await page.locator(checkedCheckboxSelector).all();
      await expect(checkedCheckboxList).toHaveLength(initialCheckedNumber);
    });

    test("render radio buttons for 4 labels", async ({ page }) => {
      const heading = await page.getByRole("heading", { name: radioButtonName });
      await expect(heading).toBeVisible();

      const radioButtonList = await page.locator(radioButtonSelector).all();
      await expect(radioButtonList).toHaveLength(4);

      const checkedRadioButtonList = await page.locator(checkedRadioButtonSelector).all();
      await expect(checkedRadioButtonList).toHaveLength(1);
    });

    test("render chart for 2 series", async ({ page }) => {
      const chartTitle = await page.locator(highchartsTitleSelector).first();
      await expect(chartTitle).toBeVisible();

      const checkedCheckboxList = await page.locator(checkedCheckboxSelector).all();
      await expect(checkedCheckboxList).toHaveLength(initialCheckedNumber);

      await page.waitForFunction(
        ({ highchartsSeriesSelector, initialCheckedNumber }) => {
          return document.querySelectorAll(highchartsSeriesSelector).length === initialCheckedNumber;
        },
        { highchartsSeriesSelector, initialCheckedNumber },
      );

      const seriesList = await page.locator(highchartsSeriesSelector).all();
      await expect(seriesList).toHaveLength(initialCheckedNumber);
    });
  });

  test.describe("integration", () => {
    test("add check and render chart", async ({ page }) => {
      const heading = await page.getByRole("heading", { name: checkboxName }).first();
      await expect(heading).toBeVisible();

      await page.waitForFunction(
        ({ checkedCheckboxSelector, initialCheckedNumber }) => {
          return document.querySelectorAll(checkedCheckboxSelector).length === initialCheckedNumber;
        },
        { checkedCheckboxSelector, initialCheckedNumber },
      );

      await page.waitForFunction(
        ({ highchartsSeriesSelector, initialCheckedNumber }) => {
          return document.querySelectorAll(highchartsSeriesSelector).length === initialCheckedNumber;
        },
        { highchartsSeriesSelector, initialCheckedNumber },
      );

      let seriesList = await page.locator(highchartsSeriesSelector).all();
      await expect(seriesList).toHaveLength(initialCheckedNumber);

      const unCheckedCheckbox = await page.locator(unCheckedCheckboxSelector);
      await expect(await unCheckedCheckbox.count()).toBeGreaterThan(0);

      const targetCheckbox = await unCheckedCheckbox.first();
      await targetCheckbox.check();

      const checkedNumber = initialCheckedNumber + 1;
      const checkedCheckboxList = await page.locator(checkedCheckboxSelector).all();
      await expect(checkedCheckboxList).toHaveLength(checkedNumber);

      await page.waitForFunction(
        ({ highchartsSeriesSelector, checkedNumber }) => {
          return document.querySelectorAll(highchartsSeriesSelector).length === checkedNumber;
        },
        { highchartsSeriesSelector, checkedNumber },
      );

      seriesList = await page.locator(highchartsSeriesSelector).all();
      await expect(seriesList).toHaveLength(checkedNumber);
    });

    test("remove check and render chart", async ({ page }) => {
      const heading = await page.getByRole("heading", { name: checkboxName }).first();
      await expect(heading).toBeVisible();

      const uncheckedNumber = prefecturesNumber - initialCheckedNumber;
      await page.waitForFunction(
        ({ unCheckedCheckboxSelector, uncheckedNumber }) => {
          return document.querySelectorAll(unCheckedCheckboxSelector).length === uncheckedNumber;
        },
        { unCheckedCheckboxSelector, uncheckedNumber },
      );

      await page.waitForFunction(
        ({ highchartsSeriesSelector, initialCheckedNumber }) => {
          return document.querySelectorAll(highchartsSeriesSelector).length === initialCheckedNumber;
        },
        { highchartsSeriesSelector, initialCheckedNumber },
      );

      let seriesList = await page.locator(highchartsSeriesSelector).all();
      await expect(seriesList).toHaveLength(initialCheckedNumber);

      let checkedCheckbox = await page.locator(checkedCheckboxSelector);
      await expect(await checkedCheckbox.count()).toBeGreaterThan(0);

      const targetCheckbox = await checkedCheckbox.first();
      await targetCheckbox.uncheck();

      const checkedNumber = initialCheckedNumber - 1;
      checkedCheckbox = await page.locator(checkedCheckboxSelector);
      await expect(await checkedCheckbox.count()).toBe(checkedNumber);

      await page.waitForFunction(
        ({ highchartsSeriesSelector, checkedNumber }) => {
          return document.querySelectorAll(highchartsSeriesSelector).length === checkedNumber;
        },
        { highchartsSeriesSelector, checkedNumber },
      );

      seriesList = await page.locator(highchartsSeriesSelector).all();
      await expect(seriesList).toHaveLength(checkedNumber);
    });

    test("change radio button and render chart", async ({ page }) => {
      const heading = await page.getByRole("heading", { name: radioButtonName });
      await expect(heading).toBeVisible();

      let checkedRadioButtonList = await page.locator(checkedRadioButtonSelector).all();
      await expect(checkedRadioButtonList).toHaveLength(1);

      const checkedRadioButtonLabel = await page.locator(checkedRadioButtonLabelSelector).first();
      const labelText = await checkedRadioButtonLabel.textContent();

      const chartTitle = await page.locator(highchartsTitleSelector).first().textContent();

      const unCheckedRadioButton = await page.locator(unCheckedRadioButtonSelector);
      await expect(await unCheckedRadioButton.count()).toBeGreaterThan(0);

      const targetRadioButton = await unCheckedRadioButton.first();
      await targetRadioButton.check();

      checkedRadioButtonList = await page.locator(checkedRadioButtonSelector).all();
      await expect(checkedRadioButtonList).toHaveLength(1);

      const checkedRadioButtonLabel2 = await page.locator(checkedRadioButtonLabelSelector).first();
      const labelText2 = await checkedRadioButtonLabel2.textContent();
      expect(labelText).not.toBe(labelText2);

      const chartTitle2 = await page.locator(highchartsTitleSelector).first().textContent();
      expect(chartTitle).not.toBe(chartTitle2);
    });
  });
});
