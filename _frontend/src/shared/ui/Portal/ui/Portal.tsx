import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { type TPortalProps } from '../types/TPortalProps';

function Portal(props: TPortalProps) {
  const { children, id } = props;
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);

      if (!portalContainer) {
        throw new Error(
          `There is no portal container in markup. Please add portal container with proper id attribute.`
        );
      }

      setContainer(portalContainer);
    }
  }, [id]);

  return container ? createPortal(children, container) : <></>;
}

export default Portal;
