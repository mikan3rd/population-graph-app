import { css, LinariaClassName } from "@linaria/core";

import { RadioButton } from "@/components/ui/RadioButton";

type Props = {
  className?: LinariaClassName;
  labels: { index: number; name: string }[];
  targetDataIndex: number;
  handleChangeTargetDataIndex: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LabelButtonList = (props: Props) => {
  const { className, labels, targetDataIndex, handleChangeTargetDataIndex } = props;
  return (
    <div className={className}>
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
  );
};
