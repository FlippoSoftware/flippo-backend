"use client";

import { useUnit } from "effector-react";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { $notifications, deleteNotification } from "../models/ToastContainerStorage";
import { type TToastContainerProps } from "../types/TToastContainerProps";

import ToastNotification from "./Toast";
import st from "./ToastContainer.module.scss";

const NOTIFICATION_CONTAINER_ID = "notification-container-id";

function ToastNotificationContainer(props: TToastContainerProps) {
  const { toastCountOnScreen } = props;
  const [notificationStore, deleteToast] = useUnit([$notifications, deleteNotification]);
  const [portalRef, setPortalRef] = useState<HTMLElement | null>(null);

  const onClose = useCallback((id: string) => deleteToast(id), [deleteToast]);

  const notifications = notificationStore.slice(0, toastCountOnScreen).map((notification) => {
    return (
      <motion.div
        key={notification.id}
        layout
        initial={{ opacity: 0, y: 100, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7, zIndex: -100 }}
        transition={{ duration: 0.2 }}
      >
        <ToastNotification {...notification} onClose={onClose} />
      </motion.div>
    );
  });

  useEffect(() => {
    if (typeof window !== "undefined") setPortalRef(document.body);
  }, []);

  if (!portalRef) return <></>;

  return (
    <>
      {createPortal(
        <div className={st.portal}>
          <div className={st.container}>
            <AnimatePresence mode={"popLayout"}>{notifications}</AnimatePresence>
          </div>
        </div>,
        portalRef,
        NOTIFICATION_CONTAINER_ID
      )}
    </>
  );
}

export default ToastNotificationContainer;
