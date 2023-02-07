import {useEffect, useCallback, useState} from 'react';

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  const downHandler = useCallback(
    ({key}: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    },
    [targetKey],
  );

  const upHandler = useCallback(
    ({key}: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey],
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!window) return;

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
};
