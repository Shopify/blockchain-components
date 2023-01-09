import {useEffect, useState} from 'react';

/**
 * This is particularly useful for supporting frameworks
 * that utilize SSR (such as Next and Remix).
 */
export function useIsMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
