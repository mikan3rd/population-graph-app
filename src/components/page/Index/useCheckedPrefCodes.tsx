import { useCallback, useState } from "react";

export const useCheckedPrefCodes = () => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<Set<number>>(new Set());

  const handleChangeCheckedCode = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked, value },
    } = event;
    const prefCode = Number(value);

    setCheckedPrefCodes((prevState) => {
      const nextState = new Set(prevState);
      if (checked) {
        nextState.add(prefCode);
      } else {
        nextState.delete(prefCode);
      }
      return nextState;
    });
  }, []);

  return { checkedPrefCodes, handleChangeCheckedCode };
};
