import { test, expect } from "next/experimental/testmode/playwright/msw";

import { getPrefecturesResas } from "./handlers/getPrefectureResas";
import { getPrefectures } from "./handlers/getPrefectures";

test.use({
  mswHandlers: [getPrefectures, getPrefecturesResas],
});

export { test, expect };
