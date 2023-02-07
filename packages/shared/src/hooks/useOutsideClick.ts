import {useEffect, useRef} from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = ({target}: MouseEvent) => {
      if (
        target instanceof HTMLElement &&
        ref.current &&
        !ref.current.contains(target)
      ) {
        callback();
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!document) return;

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [callback, ref]);

  return ref;
};
