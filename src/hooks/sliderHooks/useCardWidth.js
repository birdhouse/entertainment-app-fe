import { useEffect, useState } from "react";

export const useCardWidth = (cardRef, gap = 24) => {
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const updateWidth = () => {
      const width = el.getBoundingClientRect().width;
      setCardWidth(width + gap);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [cardRef, gap]);

  return cardWidth;
};
