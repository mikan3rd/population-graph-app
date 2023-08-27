import { getPrefectures } from "@/server/routers/getPrefectures";
import { router } from "@/server/trpc";

export const appRouter = router({
  getPrefectures,
});

// export type definition of API
export type AppRouter = typeof appRouter;
