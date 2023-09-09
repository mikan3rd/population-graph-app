import { rest } from "msw";

import { response } from "./getPopulationResas";

const path = "/api/trpc/getPopulation" as const;

export const getPopulation = rest.get(path, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ result: { data: response } }));
});
