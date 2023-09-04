import { css } from "@linaria/core";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

import { useIndex } from "./index.hook";

import { Checkbox } from "@/components/ui/Checkbox";

export const Index = () => {
  const {
    prefectures,
    labels,
    targetDataIndex,
    highchartsOptions,
    handleChangeCheckedCode,
    handleChangeTargetDataIndex,
  } = useIndex();

  return (
    <div
      className={css`
        margin: 16px;
      `}
    >
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
        {labels.map((label) => {
          const { index, name } = label;
          return (
            <label key={index}>
              <input
                type="radio"
                value={index}
                checked={targetDataIndex === index}
                onChange={handleChangeTargetDataIndex}
              />
              {name}
            </label>
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
