import { response } from "./getPrefectureResas";

import { trpcMsw } from ".";

export const getPrefectures = trpcMsw.getPrefectures.query((req, res, ctx) => {
  return res(ctx.status(200), ctx.data(response));
});
