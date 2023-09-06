import { Options, SeriesLineOptions } from "highcharts";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

  const isInitialized = useRef(false);

  const getPrefecturesResult = trpc.getPrefectures.useQuery();

  const prefectures: CheckedPrefectureType[] = useMemo(
    () =>
      getPrefecturesResult.data?.result.map((prefecture) => ({
        ...prefecture,
        checked: checkedPrefCodes.has(prefecture.prefCode),
      })) ?? [],
    [checkedPrefCodes, getPrefecturesResult.data?.result],
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
      lang: { noData: "都道府県を選択してください" },
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
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { checked, value },
      } = event;
      const prefCode = Number(value);
      handleSetCheckedPrefCodes({ checked, prefCode });
    },
    [handleSetCheckedPrefCodes],
  );

  const handleChangeTargetDataIndex = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    const index = Number(value);
    setTargetDataIndex(index);
  }, []);

  // 初回のみ都道府県のデータ取得時に最初と最後の都道府県のチェックをONにする
  useEffect(() => {
    if (isInitialized.current) return;
    if (checkedPrefCodes.size > 0) return;
    const { data } = getPrefecturesResult;
    const firstPrefCode = data?.result[0]?.prefCode;
    const lastPrefCode = data?.result[data?.result.length - 1]?.prefCode;
    if (firstPrefCode !== undefined) {
      handleSetCheckedPrefCodes({ prefCode: firstPrefCode, checked: true });
    }
    if (lastPrefCode !== undefined) {
      handleSetCheckedPrefCodes({ prefCode: lastPrefCode, checked: true });
    }
    isInitialized.current = true;
  }, [checkedPrefCodes.size, getPrefecturesResult, handleSetCheckedPrefCodes]);

  return {
    prefectures,
    labels,
    targetDataIndex,
    highchartsOptions,
    handleChangeCheckedCode,
    handleChangeTargetDataIndex,
  };
};
