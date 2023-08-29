import { css } from "@linaria/core";
import { useCallback, useState } from "react";

import { Checkbox } from "@/components/ui/Checkbox";
import { trpc } from "@/utils/trpc";

export const Index = () => {
  const [data] = trpc.getPrefectures.useSuspenseQuery(undefined, { retry: 3, cacheTime: Infinity });

  const getPopulationMutation = trpc.getPopulation.useMutation({ retry: 3, cacheTime: Infinity });

  const [checkedPrefCodes, setCheckedPrefCodes] = useState<Set<number>>(new Set());

  const prefectures = data.result.map((prefecture) => ({
    ...prefecture,
    checked: checkedPrefCodes.has(prefecture.prefCode),
  }));

  const handleChangeCheckedCode = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
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

      await getPopulationMutation.mutateAsync({ prefCode, cityCode: "-" });
    },
    [getPopulationMutation],
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
    </div>
  );
};
