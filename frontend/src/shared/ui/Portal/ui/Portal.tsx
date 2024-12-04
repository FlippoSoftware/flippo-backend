import { type JSX, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { type TPortalProps, type TPortalPropsWithContainerRef, type TPortalPropsWithId } from '../types/TPortalProps';

function Portal(props: TPortalPropsWithContainerRef): JSX.Element;
function Portal(props: TPortalPropsWithId): JSX.Element;

function Portal(props: TPortalProps) {
  const { children, targetId, targetRef } = props;
  const containerRef = useRef<HTMLElement | null>(targetRef?.current || null);

  useEffect(() => {
    if (targetId && !(containerRef && containerRef.current)) {
      containerRef.current = document.getElementById(targetId);

      if (!containerRef.current) {
        throw new Error(
          `There is no portal container in markup. Please add portal container with proper id attribute.`
        );
      }
    }
  }, [targetId, targetRef]);

  return containerRef.current ? createPortal(children, containerRef.current) : <></>;
}

export default Portal;
