import { css } from "@linaria/core";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

import { useCheckedPopulations } from "./useCheckedPopulations";
import { useCheckedPrefCodes } from "./useCheckedPrefCodes";
import { useGetPopulationsQueries, CheckedPrefectureType } from "./useGetPopulationsQueries";

import { Checkbox } from "@/components/ui/Checkbox";
import { trpc } from "@/utils/trpc";

export const Index = () => {
  const [prefecturesData] = trpc.getPrefectures.useSuspenseQuery();

  const { checkedPrefCodes, handleChangeCheckedCode } = useCheckedPrefCodes();

  const prefectures: CheckedPrefectureType[] = prefecturesData.result.map((prefecture) => ({
    ...prefecture,
    checked: checkedPrefCodes.has(prefecture.prefCode),
  }));

  const populationsData = useGetPopulationsQueries(prefectures);

  const { highchartsOptions } = useCheckedPopulations(populationsData);

  return (
    <div>
      <h1>population-graph-app</h1>

      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
          gap: 8px;
          margin-top: 16px;
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
        <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
      </div>
    </div>
  );
};
