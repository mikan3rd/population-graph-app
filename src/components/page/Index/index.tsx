import { css } from "@linaria/core";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

import { useIndex } from "./index.hook";

import { LabelButtonList } from "@/components/features/Index/LabelButtonList";
import { PrefectureCheckList } from "@/components/features/Index/PrefectureCheckList";
import { Loading } from "@/components/ui/Loading";

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

      {prefectures.length > 0 && (
        <PrefectureCheckList
          prefectures={prefectures}
          handleChangeCheckedCode={handleChangeCheckedCode}
          className={css`
            margin-top: 32px;
          `}
        />
      )}

      {labels.length > 0 && (
        <LabelButtonList
          labels={labels}
          targetDataIndex={targetDataIndex}
          handleChangeTargetDataIndex={handleChangeTargetDataIndex}
          className={css`
            margin-top: 32px;
          `}
        />
      )}

      <div
        className={css`
          margin-top: 32px;
        `}
      >
        <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
      </div>

      <Loading isLoading={prefectures.length === 0} />
    </div>
  );
};
