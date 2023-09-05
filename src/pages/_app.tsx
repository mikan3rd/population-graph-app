import Highcharts from "highcharts";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsNoDataToDisplay from "highcharts/modules/no-data-to-display";
import type { AppType } from "next/app";

import "@/styles/globals";
import { trpc } from "@/utils/trpc";

if (typeof window !== `undefined`) {
  HighchartsAccessibility(Highcharts);
  HighchartsExporting(Highcharts);
  HighchartsNoDataToDisplay(Highcharts);
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
