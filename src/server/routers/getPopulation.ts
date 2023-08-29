import { z } from "zod";

import { procedure } from "@/server/trpc";
import { ResasApiClient } from "@/utils/ResasApiClient";

export const getPopulation = procedure
  .input(z.object({ prefCode: z.number(), cityCode: z.string() }))
  .query(async (opts) => {
    const {
      input: { prefCode, cityCode },
    } = opts;
    const response = await new ResasApiClient().getPopulation({ prefCode, cityCode });
    return response.data;
  });
