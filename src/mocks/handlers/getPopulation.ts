import { rest } from "next/experimental/testmode/playwright/msw";

import { Response as ResasResponse } from "./getPopulationResas";

const path = "/api/trpc/getPopulation";

const response = [ResasResponse];

const handler = rest.get(path, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(response));
});

export const getPopulation = {
  path,
  response,
  handler,
};
