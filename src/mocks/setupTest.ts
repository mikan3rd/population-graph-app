import { test, setupWorker } from "next/experimental/testmode/playwright/msw";

import { handlers } from "./handlers";

async function initMocks() {
  if (typeof window === "undefined") {
    // pass
  } else {
    const worker = setupWorker(...handlers);
    worker.start();
  }
}

initMocks();

test.use({
  mswHandlers: handlers,
});
