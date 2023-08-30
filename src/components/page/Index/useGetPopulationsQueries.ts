import { useQueries } from "@tanstack/react-query";

import { trpc } from "@/utils/trpc";

export const useGetPopulationsQueries = (prefCodes: Set<number>) => {
  const getPopulationMutation = trpc.getPopulation.useMutation();

  const prefCodesArray = Array.from(prefCodes);

  return useQueries({
    queries: prefCodesArray.map((prefCode) => ({
      queryKey: ["getPopulationMutation", prefCode],
      queryFn: async () => {
        const response = await getPopulationMutation.mutateAsync({ prefCode, cityCode: "-" });
        return { ...response, prefCode };
      },
    })),
  });
};
