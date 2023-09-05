import { css } from "@linaria/core";
import * as Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

import { useIndex } from "./index.hook";

import { Checkbox } from "@/components/ui/Checkbox";
import { RadioButton } from "@/components/ui/RadioButton";

export const Index = () => {
  const {
    prefectures,
    labels,
    targetDataIndex,
    highchartsOptions,
    chartComponentRef,
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
          margin-top: 32px;
        `}
      >
        <h2
          className={css`
            font-size: 18px;
          `}
        >
          都道府県を選択してください（複数可）
        </h2>
        <div
          className={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(91px, 1fr));
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
                className={css`
                  font-size: 12px;
                `}
              >
                {prefName}
              </Checkbox>
            );
          })}
        </div>
      </div>

      <div
        className={css`
          margin-top: 32px;
        `}
      >
        <h2
          className={css`
            font-size: 18px;
          `}
        >
          表示するデータを選択してください
        </h2>
        <div
          className={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
            gap: 8px;
            margin-top: 8px;
          `}
        >
          {labels.map((label) => {
            const { index, name } = label;
            return (
              <RadioButton
                key={index}
                value={index}
                checked={targetDataIndex === index}
                onChange={handleChangeTargetDataIndex}
                className={css`
                  font-size: 12px;
                `}
              >
                {name}
              </RadioButton>
            );
          })}
        </div>
      </div>

      <div
        className={css`
          margin-top: 32px;
        `}
      >
        <HighchartsReact highcharts={Highcharts} options={highchartsOptions} ref={chartComponentRef} />
      </div>
    </div>
  );
};
