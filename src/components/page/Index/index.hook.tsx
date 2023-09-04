import { Options, SeriesLineOptions } from "highcharts";
import { useCallback, useMemo, useState } from "react";

import {
  useGetPopulationsQueries,
  GetPopulationQueryResultType,
  CheckedPrefectureType,
} from "./useGetPopulationsQueries";

import { generateColors } from "@/utils/Color";
import { trpc } from "@/utils/trpc";

export const useIndex = () => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<Set<number>>(new Set());

  const [prefecturesData] = trpc.getPrefectures.useSuspenseQuery();

  const prefectures: CheckedPrefectureType[] = useMemo(
    () =>
      prefecturesData.result.map((prefecture) => ({
        ...prefecture,
        checked: checkedPrefCodes.has(prefecture.prefCode),
      })),
    [checkedPrefCodes, prefecturesData.result],
  );

  const populationsData = useGetPopulationsQueries(prefectures);

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

  const handleChangeCheckedCode = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked, value },
    } = event;
    const prefCode = Number(value);

    setCheckedPrefCodes((prevState) => {
      const nextState = new Set(prevState);
      if (checked) {
        nextState.add(prefCode);
      } else {
        nextState.delete(prefCode);
      }
      return nextState;
    });
  }, []);

  return { prefectures, highchartsOptions, handleChangeCheckedCode };
};
