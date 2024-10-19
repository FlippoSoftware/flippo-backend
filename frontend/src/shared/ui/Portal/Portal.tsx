import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ContainerOptions = {
  id: string;
  mountNode?: HTMLElement;
};

const createContainer = (options: ContainerOptions) => {
  if (document.getElementById(options.id)) return;

  const { id, mountNode = document.body } = options;

  const portalContainer = document.createElement("div");
  portalContainer.setAttribute("id", id);
  mountNode.appendChild(portalContainer);
};

type PortalProps = {
  id: string;
  children?: ReactNode;
};

function Portal(props: PortalProps) {
  const { id, children } = props;
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

export { createContainer };
export default Portal;
