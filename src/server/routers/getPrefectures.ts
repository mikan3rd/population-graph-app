import { procedure } from "@/server/trpc";
import { ResasApiClient } from "@/utils/ResasApiClient";

export const getPrefectures = procedure.query(async () => {
  const response = await new ResasApiClient().getPrefectures();
  return response.data;
});
