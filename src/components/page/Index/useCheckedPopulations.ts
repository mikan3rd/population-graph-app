import { Options, SeriesLineOptions } from "highcharts";
import { useMemo } from "react";

import { GetPopulationQueryResultType } from "./useGetPopulationsQueries";

import { generateColors } from "@/utils/Color";

export const useCheckedPopulations = (populationsData: GetPopulationQueryResultType[]) => {
  const checkedPopulations = useMemo(() => {
    const checkedPopulations: Exclude<GetPopulationQueryResultType["data"], undefined>[] = [];
    populationsData.forEach(({ data }) => {
      if (data === undefined) return;
      if (data.prefecture.checked === false) return;
      checkedPopulations.push(data);
    });
    return checkedPopulations;
  }, [populationsData]);

  const labels = useMemo(
    () => checkedPopulations[0]?.result.data.map((d, index) => ({ index, name: d.label })) ?? [],
    [checkedPopulations],
  );
  const targetDataIndex = 0; // 変更可能にする
  const targetLabel = useMemo(() => labels[targetDataIndex], [labels]);

  const highchartsSeries: SeriesLineOptions[] = useMemo(
    () =>
      checkedPopulations.map((population) => {
        const {
          prefecture: { prefCode, prefName },
          result,
        } = population;

        const series: SeriesLineOptions = {
          type: "line",
          id: `${prefCode}`,
          name: prefName,
          data: result.data[targetDataIndex]?.data.map((d) => [d.year, d.value]) ?? [],
          color: generateColors(prefCode),
          showInLegend: true,
        };
        return series;
      }),
    [checkedPopulations],
  );

  const highchartsOptions: Options = useMemo(() => {
    const options: Options = {
      title: { text: targetLabel?.name },
      xAxis: { title: { text: "年" } },
      yAxis: { title: { text: "人口" } },
      series: highchartsSeries,
      credits: { enabled: false },
    };
    return options;
  }, [highchartsSeries, targetLabel]);

  return { highchartsOptions };
};
