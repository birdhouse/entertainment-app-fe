import { useEffect } from "react";

export const useWheelMomentum = (scrollRef) => {
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollVelocity = 0;
    let animationFrame;

    const smoothScrollStep = () => {
      if (Math.abs(scrollVelocity) < 0.1) {
        scrollVelocity = 0;
        return;
      }
      el.scrollLeft += scrollVelocity;
      scrollVelocity *= 0.8;
      animationFrame = requestAnimationFrame(smoothScrollStep);
    };

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      const isMouseWheel = Math.abs(e.deltaY) >= 50;
      const delta = e.deltaY * (isMouseWheel ? 0.5 : 1);
      scrollVelocity += delta;
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(smoothScrollStep);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animationFrame);
    };
  }, [scrollRef]);
};
