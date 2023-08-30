import Highcharts from "highcharts";
import highchartsAccessibility from "highcharts/modules/accessibility";
import type { AppType } from "next/app";

import "@/styles/globals";
import { trpc } from "@/utils/trpc";

if (typeof window !== `undefined`) {
  highchartsAccessibility(Highcharts);
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
