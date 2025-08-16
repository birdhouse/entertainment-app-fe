// src/hooks/usePreloadImage.js
import { useEffect } from "react";

const usePreloadImage = (src) => {
  useEffect(() => {
    if (!src) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [src]);
};

export default usePreloadImage;
