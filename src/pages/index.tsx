import { Suspense } from "react";

import { Index } from "@/components/page/Index";

export default function IndexPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Index />
    </Suspense>
  );
}
