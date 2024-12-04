import type { RefObject } from 'react';

import { useEffect } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void): void => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, callback]);
};

export { useClickOutside };
