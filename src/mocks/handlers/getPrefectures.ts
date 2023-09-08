import { rest } from "next/experimental/testmode/playwright/msw";

import { Response as ResasResponse } from "./getPrefectureResas";

const path = "/api/trpc/getPrefectures";

const response = [ResasResponse];

const handler = rest.get(`${path}*`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(response));
});

export const getPrefectures = {
  path,
  response,
  handler,
};
