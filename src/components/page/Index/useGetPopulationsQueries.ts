import { trpc } from "@/utils/trpc";

export const useGetPopulationsQueries = (prefCodes: Set<number>) => {
  const prefCodesArray = Array.from(prefCodes);

  return trpc.useQueries((t) =>
    prefCodesArray.map((prefCode) =>
      t.getPopulation({ prefCode, cityCode: "-" }, { select: (data) => ({ ...data, prefCode }) }),
    ),
  );
};
