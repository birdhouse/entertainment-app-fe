import { useRef } from "react";
import styles from "./slider.module.scss";

import { useCardWidth } from "../../hooks/sliderHooks/useCardWidth";
import { useInfiniteScroll } from "../../hooks/sliderHooks/useInfiniteScroll";
import { useDragScroll } from "../../hooks/sliderHooks/useDragScroll";
import { useWheelMomentum } from "../../hooks/sliderHooks/useWheelMomentum";
import { useClonedItems } from "../../hooks/sliderHooks/useClonedItems";

const Slider = ({ data = [], cloneCount = 3, renderItem }) => {
  const scrollRef = useRef();
  const cardRef = useRef(null);

  const items = useClonedItems(data, cloneCount);

  const cardWidth = useCardWidth(cardRef);
  const { handleScroll } = useInfiniteScroll(scrollRef, cardWidth, data.length, cloneCount);

  useDragScroll(scrollRef, styles.dragging);
  useWheelMomentum(scrollRef);

  return (
    <div className={styles.scrollContainer} ref={scrollRef} onScroll={handleScroll}>
      <ul className={styles.sliderList}>
        {items.map((item, i) => (
          <li className={styles.sliderItem} key={i} ref={i === 0 ? cardRef : null}>
            {renderItem(item, i)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slider;
