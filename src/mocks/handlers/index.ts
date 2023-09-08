import { createTRPCMsw } from "msw-trpc";

import { AppRouter } from "../../server/routers/_app";

export const trpcMsw = createTRPCMsw<AppRouter>();
