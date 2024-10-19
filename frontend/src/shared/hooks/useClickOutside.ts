import { useEffect } from "react";

import type { RefObject } from "react";
const useClickOutside = (ref: RefObject<any>, callback: () => void): void => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) callback();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, callback]);
};

export { useClickOutside };
