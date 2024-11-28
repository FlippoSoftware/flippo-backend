'use client';

import { createContainer, Portal } from '@ui/Portal';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { type TModalProps } from '../types/TModalProps';
import st from './Modal.module.scss';

function Modal(props: TModalProps) {
  const { children, className, modalId, onClose = () => {} } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    createContainer({ id: modalId });
    setMounted(true);
  }, [modalId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const { target } = event;
      if (target && rootRef.current === target) {
        onClose();
      }
    };

    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleEscPress);

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleEscPress);
    };
  }, [onClose]);

  return isMounted ? (
    <Portal targetId={modalId}>
      <div className={clsx(st.wrap, className)} ref={rootRef}>
        {children}
      </div>
    </Portal>
  ) : null;
}

export default Modal;
