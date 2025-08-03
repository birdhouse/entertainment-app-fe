import React, { useEffect, useRef } from "react";
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

  // Clone first and last few items to fake infinite
  const getClonedItems = () => {
    if (!data?.results) return [];
    const items = data.results;
    return [...items.slice(-CLONE_COUNT), ...items, ...items.slice(0, CLONE_COUNT)];
  };
  const items = getClonedItems();
  const cardWidth = 500 + 32;
  const realCount = data?.results?.length || 0;

  // drag scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Mouse Events
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

    // Touch Events
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

    // Attach
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

  // Set initial scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el && realCount) {
      el.scrollLeft = cardWidth * CLONE_COUNT;
    }
  }, [realCount]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();

        // Multiply scroll delta to make it more reactive
        const scrollAmount = e.deltaY * 1.5; // You can tweak this factor

        el.scrollBy({
          left: scrollAmount,
          behavior: "auto",
        });
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Seamless loop logic (no state change)
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !realCount) return;

    const totalRealWidth = cardWidth * realCount;
    const scrollLeft = el.scrollLeft;

    if (scrollLeft <= 0) {
      el.scrollLeft = totalRealWidth;
    } else if (scrollLeft >= totalRealWidth + CLONE_COUNT * cardWidth) {
      el.scrollLeft = cardWidth * CLONE_COUNT;
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  return (
    <section className={styles.trending}>
      <h1 className="heading1">Trending</h1>
      <div className={styles.scrollContainer} ref={scrollRef} onScroll={handleScroll}>
        <ul className={styles.sliderList}>
          {items.map((item, i) => (
            <li className={styles.sliderItem} key={`${item.id}-${i}`}>
              <TrendingCard content={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Trending;
