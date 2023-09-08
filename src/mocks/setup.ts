import { test } from "next/experimental/testmode/playwright/msw";

import { getPopulation } from "./handlers/getPopulation";
import { getPrefectures } from "./handlers/getPrefectures";

test.use({
  mswHandlers: [getPrefectures.handler, getPopulation.handler],
});
