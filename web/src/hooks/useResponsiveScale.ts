import { useState, useEffect } from 'react';

const SCALE_CONFIG = {
  baseWidth: 2560,
  baseHeight: 1440,
  maxScale: 1.5, // 3840/2560 = 1.5 → full 4K support
  globalMultiplier: 1.0,
  debounceMs: 150,
};

export const useResponsiveScale = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const calculateScale = () => {
      const scaleX = Math.min(
        SCALE_CONFIG.maxScale,
        window.innerWidth / SCALE_CONFIG.baseWidth
      );
      const scaleY = Math.min(
        SCALE_CONFIG.maxScale,
        window.innerHeight / SCALE_CONFIG.baseHeight
      );

      let newScale = Math.min(scaleX, scaleY);

      newScale *= SCALE_CONFIG.globalMultiplier;

      setScale(newScale);
    };

    const debouncedCalculate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateScale, SCALE_CONFIG.debounceMs);
    };

    calculateScale();

    window.addEventListener('resize', debouncedCalculate);

    return () => {
      window.removeEventListener('resize', debouncedCalculate);
      clearTimeout(timeoutId);
    };
  }, []);

  return scale;
};
