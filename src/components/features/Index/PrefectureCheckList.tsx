import { css } from "@linaria/core";

import { CheckedPrefectureType } from "@/components/page/Index/useGetPopulationsQueries";
import { Checkbox } from "@/components/ui/Checkbox";

type Props = {
  className?: string;
  prefectures: CheckedPrefectureType[];
  handleChangeCheckedCode: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PrefectureCheckList = (props: Props) => {
  const { className, prefectures, handleChangeCheckedCode } = props;

  return (
    <div className={className}>
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
  );
};
