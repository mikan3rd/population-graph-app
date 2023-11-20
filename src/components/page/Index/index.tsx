import { css } from "@linaria/core";
import * as Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

import { useIndex } from "./index.hook";

import { LabelButtonList } from "@/components/features/Index/LabelButtonList";
import { PrefectureCheckList } from "@/components/features/Index/PrefectureCheckList";
import { Loading } from "@/components/ui/Loading";

export const Index = () => {
  const {
    isLoading,
    prefectures,
    labels,
    targetDataIndex,
    highchartsOptions,
    chartComponentRef,
    handleChangeCheckedCode,
    handleChangeTargetDataIndex,
  } = useIndex();

  if (isLoading) return <Loading isLoading={isLoading} />;

  return (
    <div
      className={css`
        margin: 16px;
      `}
    >
      <h1>population-graph-app</h1>

      <PrefectureCheckList
        prefectures={prefectures}
        handleChangeCheckedCode={handleChangeCheckedCode}
        className={css`
          margin-top: 32px;
        `}
      />

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
        <HighchartsReact highcharts={Highcharts} options={highchartsOptions} ref={chartComponentRef} />
      </div>
    </div>
  );
};
