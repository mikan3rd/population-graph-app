import { trpc } from "@/utils/trpc";

export const Index = () => {
  const [data] = trpc.getPrefectures.useSuspenseQuery();
  return (
    <div>
      {data.result.map((prefecture) => (
        <div key={prefecture.prefCode}>
          {prefecture.prefCode}: {prefecture.prefName}
        </div>
      ))}
    </div>
  );
};
