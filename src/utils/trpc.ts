import { httpLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";

import type { AppRouter } from "@/server/routers/_app";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME) return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpLink({
          url: `${getBaseUrl()}/api/trpc`,

          async headers() {
            return {};
          },
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: 3,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            cacheTime: Infinity,
            staleTime: Infinity,
          },
          mutations: {
            retry: 3,
            cacheTime: Infinity,
          },
        },
      },
    };
  },
  ssr: false,
});
