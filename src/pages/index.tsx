import Head from "next/head";
import { Suspense } from "react";

import { Index } from "@/components/page/Index";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>population-graph-app</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🚀</text></svg>"
        ></link>
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <Index />
      </Suspense>
    </>
  );
}
