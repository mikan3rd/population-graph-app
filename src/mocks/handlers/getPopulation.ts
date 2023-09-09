import { response } from "./getPopulationResas";

import { trpcMsw } from ".";

export const getPopulation = trpcMsw.getPopulation.query((req, res, ctx) => {
  return res(ctx.status(200), ctx.data(response));
});
