import { type inferReactQueryProcedureOptions, TRPCClientError } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs, inferRouterError, inferProcedureClientError } from "@trpc/server";
import { AnyProcedure } from "@trpc/server";

import type { AppRouter } from "@/server/routers/_app";

declare global {
  type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
  type RouterInputs = inferRouterInputs<AppRouter>;
  type RouterOutputs = inferRouterOutputs<AppRouter>;
  type RouterError = inferRouterError<AppRouter>;
  type ProcedureClientError = inferProcedureClientError<AppRouter>;
  type ClientError = TRPCClientError<AnyProcedure>;
}
