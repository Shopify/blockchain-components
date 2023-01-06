import {useEffect, useState} from 'react';

import {useIsMounted} from './useIsMounted';

interface UseWindowDimensionsReturn {
  height: number | undefined;
  width: number | undefined;
}

export function useWindowDimensions() {
  const isMounted = useIsMounted();
  const [windowSize, setWindowSize] = useState<UseWindowDimensionsReturn>({
    height: undefined,
    width: undefined,
  });

  useEffect(() => {
    // Ensure that window is available before continuing.
    if (!isMounted) {
      return;
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Run on mount.
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted]);

  return windowSize;
}
