import { Options, SeriesLineOptions } from "highcharts";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  useGetPopulationsQueries,
  GetPopulationQueryResultType,
  CheckedPrefectureType,
} from "./useGetPopulationsQueries";

import { generateColors } from "@/utils/Color";
import { trpc } from "@/utils/trpc";

export const useIndex = () => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<Set<number>>(new Set());
  const [targetDataIndex, setTargetDataIndex] = useState<number>(0);

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

  const targetLabel = useMemo(() => labels[targetDataIndex], [labels, targetDataIndex]);

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
    [checkedPopulations, targetDataIndex],
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

  const handleSetCheckedPrefCodes = useCallback((args: { checked: boolean; prefCode: number }) => {
    const { checked, prefCode } = args;
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

  const handleChangeCheckedCode = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { checked, value },
      } = event;
      const prefCode = Number(value);
      handleSetCheckedPrefCodes({ checked, prefCode });
    },
    [handleSetCheckedPrefCodes],
  );

  // 都道府県のデータ取得時に最初の都道府県のチェックをONにする
  useEffect(() => {
    if (checkedPrefCodes.size > 0) return;
    const prefCode = prefecturesData.result[0]?.prefCode;
    if (prefCode === undefined) return;
    handleSetCheckedPrefCodes({ prefCode, checked: true });
  }, [checkedPrefCodes.size, handleSetCheckedPrefCodes, prefecturesData.result]);

  return {
    prefectures,
    labels,
    highchartsOptions,
    handleChangeCheckedCode,
  };
};
