import type { RefObject } from 'react';

import { useEffect, useMemo } from 'react';

const useClickOutside = (ref: HTMLElement | null | RefObject<HTMLElement>, callback: () => void): void => {
  const sourceRef = useMemo(() => ref, [ref]);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (event.target instanceof Node && sourceRef) {
        if (
          (sourceRef instanceof HTMLElement && !sourceRef.contains(event.target)) ||
          ('current' in sourceRef && sourceRef.current && !sourceRef.current.contains(event.target))
        ) {
          callback();
        }
      }
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [sourceRef, callback]);
};

export { useClickOutside };
