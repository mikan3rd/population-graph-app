import { UseTRPCQueryResult } from "@trpc/react-query/shared";

import { trpc } from "@/utils/trpc";

type PrefectureType = RouterOutputs["getPrefectures"]["result"][number];
export type CheckedPrefectureType = PrefectureType & { checked: boolean };

type GetPopulationResponseType = RouterOutputs["getPopulation"];
type GetPopulationQuerySelectType = GetPopulationResponseType & { prefecture: CheckedPrefectureType };
export type GetPopulationQueryResultType = UseTRPCQueryResult<GetPopulationQuerySelectType, ClientError>;

export const useGetPopulationsQueries = (prefectures: CheckedPrefectureType[]) => {
  return trpc.useQueries((t) =>
    prefectures.map((prefecture) =>
      t.getPopulation(
        { prefCode: prefecture.prefCode, cityCode: "-" },
        {
          enabled: prefecture.checked,
          select: (data) => {
            const result: GetPopulationQuerySelectType = { ...data, prefecture };
            return result;
          },
        },
      ),
    ),
  );
};
