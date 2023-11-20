import { Options, SeriesLineOptions } from "highcharts";
// eslint-disable-next-line import/no-named-as-default
import HighchartsReact from "highcharts-react-official";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  useGetPopulationsQueries,
  GetPopulationQueryResultType,
  CheckedPrefectureType,
} from "./useGetPopulationsQueries";

import { generateColor, generateSymbol } from "@/utils/chart";
import { trpc } from "@/utils/trpc";

export const useIndex = () => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<Set<number>>(new Set());
  const [targetDataIndex, setTargetDataIndex] = useState<number>(0);

  const isInitialized = useRef(false);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const { data: prefecturesData, isLoading } = trpc.getPrefectures.useQuery();

  const prefectures: CheckedPrefectureType[] = useMemo(
    () =>
      prefecturesData?.result.map((prefecture) => ({
        ...prefecture,
        checked: checkedPrefCodes.has(prefecture.prefCode),
      })) ?? [],
    [checkedPrefCodes, prefecturesData?.result],
  );

  const populationsData = useGetPopulationsQueries(prefectures);

  const isFetching = useMemo(() => populationsData.some(({ isFetching }) => isFetching), [populationsData]);

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
          color: generateColor(prefCode),
          marker: {
            symbol: generateSymbol(prefCode),
          },
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
      lang: {
        noData: "都道府県を選択してください",
        loading: "データ取得中...",
      },
      loading: {
        hideDuration: 1000,
        showDuration: 1000,
      },
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

    if (prefecturesData === undefined) return;

    const firstPrefCode = prefecturesData.result[0]?.prefCode;
    const lastPrefCode = prefecturesData.result[prefecturesData?.result.length - 1]?.prefCode;
    if (firstPrefCode !== undefined) {
      handleSetCheckedPrefCodes({ prefCode: firstPrefCode, checked: true });
    }
    if (lastPrefCode !== undefined) {
      handleSetCheckedPrefCodes({ prefCode: lastPrefCode, checked: true });
    }
    isInitialized.current = true;
  }, [prefecturesData, handleSetCheckedPrefCodes]);

  // データ取得中にローディングを表示する
  useEffect(() => {
    const chart = chartComponentRef.current?.chart;
    if (isFetching) {
      chart?.showLoading();
    } else {
      chart?.hideLoading();
    }
  }, [isFetching]);

  return {
    isLoading,
    prefectures,
    labels,
    targetDataIndex,
    highchartsOptions,
    chartComponentRef,
    handleChangeCheckedCode,
    handleChangeTargetDataIndex,
  };
};
