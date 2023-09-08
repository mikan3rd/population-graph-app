import { test, expect } from "next/experimental/testmode/playwright/msw";

import { getPopulation } from "./handlers/getPopulation";
import { getPopulationResas } from "./handlers/getPopulationResas";
import { getPrefecturesResas } from "./handlers/getPrefectureResas";
import { getPrefectures } from "./handlers/getPrefectures";

test.use({
  mswHandlers: [getPrefectures, getPopulation, getPrefecturesResas, getPopulationResas],
});

export { test, expect };
