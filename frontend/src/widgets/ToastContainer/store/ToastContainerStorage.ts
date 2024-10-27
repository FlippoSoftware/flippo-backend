import { createStore, createApi, createEvent, sample } from "effector";

import { type TNotificationKind, type TToastProps } from "../types/ToastProps";

type TToastCreate = Omit<TToastProps, "id" | "kind" | "onClose">;
type TToastStore = Omit<TToastProps, "onClose">;

const defaultStatusIconSize: { [key in TNotificationKind]: number } = {
  success: 20,
  warning: 20,
  error: 20,
  timer: 27
};

const defaultTimeout: { [key in TNotificationKind]: number } = {
  success: 5000,
  warning: 5000,
  error: 5000,
  timer: 7000
};

const createUUID = () => {
  const pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const deleteNotification = createEvent<string>();

const composeNotification = (
  kind: TNotificationKind,
  { statusIconSize, timeout, ...otherPayload }: TToastCreate
): TToastStore => {
  const id = createUUID();
  return {
    id,
    kind,
    timeout: timeout ? timeout : defaultTimeout[kind],
    statusIconSize: statusIconSize ? statusIconSize : defaultStatusIconSize[kind],
    ...otherPayload
  };
};

const $notifications = createStore<TToastStore[]>([]);

sample({
  clock: deleteNotification,
  source: $notifications,
  fn: (state, notificationId) => state.filter((n) => n.id !== notificationId),
  target: $notifications
});

const ToastApi = createApi($notifications, {
  success: (state, newNotification: TToastCreate) => [
    ...state,
    composeNotification("success", newNotification)
  ],
  warning: (state, newNotification: TToastCreate) => [
    ...state,
    composeNotification("warning", newNotification)
  ],
  error: (state, newNotification: TToastCreate) => [
    ...state,
    composeNotification("error", newNotification)
  ],
  timer: (state, newNotification: TToastCreate) => [
    ...state,
    composeNotification("timer", newNotification)
  ],
  delete: (state, notificationId: string) => state.filter((n) => n.id !== notificationId)
});

export { $notifications, deleteNotification, ToastApi };
