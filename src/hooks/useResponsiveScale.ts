import { useEffect } from "react";

export default function useResponsiveScale() {

  useEffect(() => {

    const root = document.documentElement;

    const updateScale = () => {

      const width = window.innerWidth;

      const scale = Math.max(0.75, Math.min(1.4, width / 1600));

      root.style.setProperty("--ui-scale", scale.toFixed(3));
      root.style.setProperty("--font-scale", scale.toFixed(3));
      root.style.setProperty("--space-scale", scale.toFixed(3));

    };

    updateScale();

    const observer = new ResizeObserver(updateScale);

    observer.observe(document.body);

    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };

  }, []);

}
