import { useEffect } from "react";

export const useDragScroll = (scrollRef, draggingClass) => {
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const startDrag = (x) => {
      isDragging = true;
      el.classList.add(draggingClass);
      startX = x;
      scrollLeft = el.scrollLeft;
    };

    const moveDrag = (x, e) => {
      if (!isDragging) return;
      e?.preventDefault?.();
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    const endDrag = () => {
      isDragging = false;
      el.classList.remove(draggingClass);
    };

    const onMouseDown = (e) => startDrag(e.pageX);
    const onMouseMove = (e) => moveDrag(e.pageX, e);
    const onTouchStart = (e) => startDrag(e.touches[0].pageX);
    const onTouchMove = (e) => moveDrag(e.touches[0].pageX);

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", endDrag);
    el.addEventListener("mouseleave", endDrag);

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", endDrag);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", endDrag);
      el.removeEventListener("mouseleave", endDrag);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", endDrag);
    };
  }, [scrollRef, draggingClass]);
};
