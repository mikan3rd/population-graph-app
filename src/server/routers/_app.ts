import { getPopulation } from "@/server/routers/getPopulation";
import { getPrefectures } from "@/server/routers/getPrefectures";
import { router } from "@/server/trpc";

export const appRouter = router({
  getPrefectures,
  getPopulation,
});

export type AppRouter = typeof appRouter;
