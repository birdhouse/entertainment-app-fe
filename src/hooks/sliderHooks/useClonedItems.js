import { useMemo } from "react";

export const useClonedItems = (data, cloneCount = 3) => {
  return useMemo(() => {
    if (!data) return [];
    return [...data.slice(-cloneCount), ...data, ...data.slice(0, cloneCount)];
  }, [data, cloneCount]);
};
