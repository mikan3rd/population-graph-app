import { css } from "@linaria/core";

type Props = {
  isLoading: boolean;
};

export const Loading = (props: Props) => {
  const { isLoading } = props;

  if (!isLoading) return null;

  return (
    <div
      className={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0 0 0 / 50%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      `}
    >
      <div
        className={css`
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        `}
      ></div>
    </div>
  );
};
