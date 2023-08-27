import { trpc } from "@/utils/trpc";

export const Index = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "client" });
  return (
    <div>
      <p>{data.greeting}</p>
    </div>
  );
};
