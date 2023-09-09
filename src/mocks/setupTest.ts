import { test } from "next/experimental/testmode/playwright/msw";

import { handlers } from "./handlers";

test.use({
  mswHandlers: handlers,
});
