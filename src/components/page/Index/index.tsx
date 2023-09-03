import { css } from "@linaria/core";
import Highcharts, { Options, SeriesLineOptions } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useMemo } from "react";

import { useIndex } from "./index.hook";
import { useGetPopulationsQueries } from "./useGetPopulationsQueries";

import { Checkbox } from "@/components/ui/Checkbox";
import { trpc } from "@/utils/trpc";

export const Index = () => {
  const [prefecturesData] = trpc.getPrefectures.useSuspenseQuery();

  const { checkedPrefCodes, handleChangeCheckedCode } = useIndex();

  const prefectures = prefecturesData.result.map((prefecture) => ({
    ...prefecture,
    checked: checkedPrefCodes.has(prefecture.prefCode),
  }));

  const populationsData = useGetPopulationsQueries(prefectures);

  const checkedPopulations = useMemo(() => {
    const checkedPopulations: Exclude<(typeof populationsData)[number]["data"], undefined>[] = [];
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
          colorKey: `${prefCode}`,
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

  return (
    <div>
      <h1>population-graph-app</h1>

      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
          gap: 8px;
          margin-top: 8px;
        `}
      >
        {prefectures.map((prefecture) => {
          const { prefCode, prefName, checked } = prefecture;
          return (
            <Checkbox
              key={prefCode}
              id={`checkbox_pref_${prefCode}`}
              checked={checked}
              value={prefCode}
              onChange={handleChangeCheckedCode}
            >
              {prefName}
            </Checkbox>
          );
        })}
      </div>

      <div
        className={css`
          margin-top: 16px;
        `}
      >
        <HighchartsReact highcharts={Highcharts} options={highchartsOptions} className="highcharts-dashboards-dark" />
      </div>
    </div>
  );
};
