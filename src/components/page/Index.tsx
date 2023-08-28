import { useCallback, useState } from "react";

import { Checkbox } from "@/components/ui/Checkbox";
import { trpc } from "@/utils/trpc";

export const Index = () => {
  const [data] = trpc.getPrefectures.useSuspenseQuery();

  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);

  const prefectures = data.result.map((prefecture) => ({
    ...prefecture,
    checked: checkedPrefCodes.includes(prefecture.prefCode),
  }));

  const handleChangeCheckedCode = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked, value },
    } = event;
    const prefCode = Number(value);
    if (checked) {
      setCheckedPrefCodes((prev) => [...prev, prefCode]);
    } else {
      setCheckedPrefCodes((prev) => prev.filter((code) => code !== prefCode));
    }
  }, []);

  return (
    <div>
      {prefectures.map((prefecture) => {
        const { prefCode, prefName, checked } = prefecture;
        return (
          <Checkbox key={prefCode} checked={checked} value={prefCode} onChange={handleChangeCheckedCode}>
            {prefName}
          </Checkbox>
        );
      })}
    </div>
  );
};
