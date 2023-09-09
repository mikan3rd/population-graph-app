import { rest } from "msw";

import { response } from "./getPrefectureResas";

const path = "/api/trpc/getPrefectures" as const;

export const getPrefectures = rest.get(path, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ result: { data: response } }));
});
