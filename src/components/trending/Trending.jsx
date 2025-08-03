import React, { useEffect, useRef, useState } from "react";
import { useGetTrendingQuery } from "../../features/tmdbApi/tmdbApi";
import TrendingCard from "../trendingCard/TrendingCard";
import styles from "./trending.module.scss";

const CLONE_COUNT = 5;

const Trending = () => {
  const { data, isLoading, isError } = useGetTrendingQuery({
    mediaType: "all",
    timeWindow: "day",
  });

  const scrollRef = useRef();
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  const realCount = data?.results?.length || 0;

  const getClonedItems = () => {
    if (!data?.results) return [];
    const items = data.results;
    return [...items.slice(-CLONE_COUNT), ...items, ...items.slice(0, CLONE_COUNT)];
  };
  const items = getClonedItems();

  // Dynamically get card width (responsive)
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const updateWidth = () => {
      const gap = 24; // same as SCSS gap
      const width = el.getBoundingClientRect().width;
      setCardWidth(width + gap);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  // Set initial scroll to fake-start
  useEffect(() => {
    const el = scrollRef.current;
    if (el && cardWidth && realCount) {
      el.scrollLeft = cardWidth * CLONE_COUNT;
    }
  }, [cardWidth, realCount]);

  // Infinite scroll boundaries
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !cardWidth || !realCount) return;

    const totalRealWidth = cardWidth * realCount;
    const scrollLeft = el.scrollLeft;

    if (scrollLeft <= 0) {
      el.scrollLeft = totalRealWidth;
    } else if (scrollLeft >= totalRealWidth + CLONE_COUNT * cardWidth) {
      el.scrollLeft = cardWidth * CLONE_COUNT;
    }
  };

  // Drag scroll (mouse + touch)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      el.classList.add(styles.dragging);
      startX = e.pageX;
      scrollLeft = el.scrollLeft;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      isDragging = false;
      el.classList.remove(styles.dragging);
    };

    const onTouchStart = (e) => {
      isDragging = true;
      el.classList.add(styles.dragging);
      startX = e.touches[0].pageX;
      scrollLeft = el.scrollLeft;
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    const onTouchEnd = () => {
      isDragging = false;
      el.classList.remove(styles.dragging);
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", onMouseUp);

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseUp);

      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Wheel scroll enhancement
  // useEffect(() => {
  //   const el = scrollRef.current;
  //   if (!el) return;

  //   const handleWheel = (e) => {
  //     if (e.deltaY !== 0) {
  //       e.preventDefault();
  //       const scrollAmount = e.deltaY * 1.5;
  //       el.scrollBy({ left: scrollAmount, behavior: "auto" });
  //     }
  //   };

  //   el.addEventListener("wheel", handleWheel, { passive: false });
  //   return () => el.removeEventListener("wheel", handleWheel);
  // }, []);
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
      scrollVelocity *= 0.8; // damping factor (momentum)
      animationFrame = requestAnimationFrame(smoothScrollStep);
    };

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;

      e.preventDefault();

      // Scale delta for mouse wheels, leave small deltaY for touchpads
      const isMouseWheel = Math.abs(e.deltaY) >= 50;

      // Apply heavier scroll for mouse, lighter for touchpad
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
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  return (
    <section className={styles.trending}>
      <h1 className="heading1">Trending</h1>
      <div className={styles.scrollContainer} ref={scrollRef} onScroll={handleScroll}>
        <ul className={styles.sliderList}>
          {items.map((item, i) => (
            <li
              className={styles.sliderItem}
              key={`${item.id}-${i}`}
              ref={i === 0 ? cardRef : null}
            >
              <TrendingCard content={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Trending;
