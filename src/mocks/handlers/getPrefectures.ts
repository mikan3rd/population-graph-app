import { rest } from "next/experimental/testmode/playwright/msw";

import { Response as ResasResponse } from "./getPrefectureResas";

export const path = "http://localhost:3000/api/trpc/getPrefectures";

export const Response = [ResasResponse];

export const getPrefectures = rest.get(path, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(Response));
});
