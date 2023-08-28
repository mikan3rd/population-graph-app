import { useCallback, useState } from "react";

import { Checkbox } from "@/components/ui/Checkbox";
import { trpc } from "@/utils/trpc";

export const Index = () => {
  const [data] = trpc.getPrefectures.useSuspenseQuery();

  const [checkedPrefCodes, setCheckedPrefCodes] = useState<Set<number>>(new Set());

  const prefectures = data.result.map((prefecture) => ({
    ...prefecture,
    checked: checkedPrefCodes.has(prefecture.prefCode),
  }));

  const handleChangeCheckedCode = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked, value },
    } = event;
    const prefCode = Number(value);
    setCheckedPrefCodes((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(prefCode);
      } else {
        next.delete(prefCode);
      }
      return next;
    });
  }, []);

  return (
    <div>
      {prefectures.map((prefecture) => {
        const { prefCode, prefName, checked } = prefecture;
        return (
          <Checkbox
            key={prefCode}
            id={`checkbox_pref_${prefCode}`}
            checked={checked}
            value={prefCode}
            onChange={handleChangeCheckedCode}
          >
            {prefName}
          </Checkbox>
        );
      })}
    </div>
  );
};
