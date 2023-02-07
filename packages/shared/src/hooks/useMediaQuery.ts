import {useEffect, useState} from 'react';

import {Breakpoint, breakpoints} from '../styles/breakpoints';

import {useIsMounted} from './useIsMounted';

export function useMediaQuery(breakpoint: Breakpoint) {
  const isMounted = useIsMounted();
  const [matches, setMatches] = useState(false);

  const size = breakpoints[breakpoint];

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const media = window.matchMedia(size);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [isMounted, matches, size]);

  return matches;
}
