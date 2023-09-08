import { rest } from "next/experimental/testmode/playwright/msw";

import { Response as ResasResponse } from "./getPopulationResas";

export const path = "http://localhost:3000/api/trpc/getPopulation";

export const Response = [ResasResponse];

export const getPopulation = rest.get(path, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(Response));
});
