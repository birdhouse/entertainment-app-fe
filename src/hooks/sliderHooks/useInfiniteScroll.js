import { useEffect } from "react";

export const useInfiniteScroll = (scrollRef, cardWidth, itemCount, cloneCount = 3) => {
  useEffect(() => {
    const el = scrollRef.current;
    if (el && cardWidth && itemCount) {
      el.scrollLeft = cardWidth * cloneCount;
    }
  }, [scrollRef, cardWidth, itemCount, cloneCount]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !cardWidth || !itemCount) return;

    const totalRealWidth = cardWidth * itemCount;
    const scrollLeft = el.scrollLeft;

    if (scrollLeft <= 0) {
      el.scrollLeft = totalRealWidth;
    } else if (scrollLeft >= totalRealWidth + cloneCount * cardWidth) {
      el.scrollLeft = cardWidth * cloneCount;
    }
  };

  return { handleScroll };
};
