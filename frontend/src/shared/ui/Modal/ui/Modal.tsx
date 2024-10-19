"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

import { default as Portal, createContainer } from "../../Portal/Portal";

import st from "./Modal.module.scss";

const MODAL_CONTAINER_ID = "modal-container-id";

type ModalProps = {
  children: React.ReactNode | React.ReactNode[];
  onClose?: () => void;
  className?: string;
};

function Modal(props: ModalProps) {
  const { onClose = () => {}, children, className } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const { target } = event;
      if (target && rootRef.current === target) {
        onClose();
      }
    };

    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleEscPress);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEscPress);
    };
  }, [onClose]);

  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      <div className={clsx(st.wrap, className)} ref={rootRef}>
        {children}
      </div>
    </Portal>
  ) : null;
}

export default Modal;
