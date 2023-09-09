import Highcharts from "highcharts";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsNoDataToDisplay from "highcharts/modules/no-data-to-display";
import type { AppType } from "next/app";

import "@/styles/globals";
import { trpc } from "@/utils/trpc";

if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks/setup");
}

if (typeof window !== `undefined`) {
  HighchartsAccessibility(Highcharts);
  HighchartsExporting(Highcharts);
  HighchartsNoDataToDisplay(Highcharts);
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
