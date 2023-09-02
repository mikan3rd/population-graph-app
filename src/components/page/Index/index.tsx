import { css } from "@linaria/core";
import Highcharts from "highcharts";
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
    populationsData.forEach((populationData) => {
      if (populationData.data === undefined) return;
      if (populationData.data.prefecture.checked === false) return;
      checkedPopulations.push(populationData.data);
    });
    return checkedPopulations;
  }, [populationsData]);

  const series = useMemo(
    () =>
      checkedPopulations.map((population) => {
        const {
          prefecture: { prefCode, prefName },
          result,
        } = population;
        return {
          id: prefCode,
          name: prefName,
          data: result.data[0].data.map((d) => [d.year, d.value]),
        };
      }),
    [checkedPopulations],
  );

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

      <div>
        <HighchartsReact highcharts={Highcharts} options={{ series }} />
      </div>

      <div>
        {checkedPopulations.map((population) => {
          const {
            prefecture: { prefCode },
            result,
          } = population;
          return (
            <div key={prefCode}>
              <div>{prefCode}</div>
              <div>{JSON.stringify(result)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
