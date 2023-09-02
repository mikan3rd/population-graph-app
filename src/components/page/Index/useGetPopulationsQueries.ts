import { trpc } from "@/utils/trpc";

export const useGetPopulationsQueries = (
  prefectures: {
    checked: boolean;
    prefCode: number;
    prefName: string;
  }[],
) => {
  return trpc.useQueries((t) =>
    prefectures.map((prefecture) =>
      t.getPopulation(
        { prefCode: prefecture.prefCode, cityCode: "-" },
        {
          enabled: prefecture.checked,
          select: (data) => ({ ...data, prefecture }),
        },
      ),
    ),
  );
};
