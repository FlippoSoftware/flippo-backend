'use client';

import { Portal } from '@shared/ui/Portal';
import { useUnit } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

import { $notifications, deleteNotification } from '../models/ToastContainerStorage';
import { type TToastContainerProps } from '../types/TToastContainerProps';
import Toast from './Toast';
import st from './ToastContainer.module.scss';

function ToastNotificationContainer(props: TToastContainerProps) {
  const { toastCountOnScreen } = props;
  const [notificationStore, deleteToast] = useUnit([$notifications, deleteNotification]);
  const targetRef = useRef<HTMLElement | null>(null);

  const onClose = useCallback((id: string) => deleteToast(id), [deleteToast]);

  const notifications = notificationStore.slice(0, toastCountOnScreen).map((notification) => {
    return (
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.7, zIndex: -100 }}
        initial={{ opacity: 0, scale: 0.7, y: 100 }}
        key={notification.id}
        layout
        transition={{ duration: 0.2 }}
      >
        <Toast {...notification} onClose={onClose} />
      </motion.div>
    );
  });

  useEffect(() => {
    if (typeof window !== 'undefined') targetRef.current = document.body;
  }, []);

  if (!targetRef.current) return <></>;

  return (
    <Portal targetRef={targetRef}>
      <div className={st.portal}>
        <div className={st.container}>
          <AnimatePresence mode={'popLayout'}>{notifications}</AnimatePresence>
        </div>
      </div>
    </Portal>
  );
}

export default ToastNotificationContainer;
