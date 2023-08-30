import { css } from "@linaria/core";

import { useIndex } from "./index.hook";
import { useGetPopulationsQueries } from "./useGetPopulationsQueries";

import { Checkbox } from "@/components/ui/Checkbox";
import { trpc } from "@/utils/trpc";

export const Index = () => {
  const [data] = trpc.getPrefectures.useSuspenseQuery();

  const { checkedPrefCodes, handleChangeCheckedCode } = useIndex();

  const populations = useGetPopulationsQueries(checkedPrefCodes);

  const prefectures = data.result.map((prefecture) => ({
    ...prefecture,
    checked: checkedPrefCodes.has(prefecture.prefCode),
  }));

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
        {populations.map((population) => {
          if (population.data === undefined) return;
          const {
            data: { prefCode, result },
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
