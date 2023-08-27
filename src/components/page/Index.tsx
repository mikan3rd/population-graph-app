import { css } from "@linaria/core";

import { trpc } from "@/utils/trpc";

export const Index = () => {
  const [data] = trpc.getPrefectures.useSuspenseQuery();
  return (
    <div>
      {data.result.map((prefecture) => (
        <div
          key={prefecture.prefCode}
          className={css`
            /* color: blue; */
          `}
        >
          {prefecture.prefCode}: {prefecture.prefName}
        </div>
      ))}
    </div>
  );
};
