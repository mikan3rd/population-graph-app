import { setupWorker } from "msw";
import { setupServer } from "msw/node";

import { handlers } from "./handlers";

async function initMocks() {
  if (typeof window === "undefined") {
    const server = setupServer(...handlers);
    server.listen();
  } else {
    const worker = setupWorker(...handlers);
    worker.start();
  }
}

initMocks();
