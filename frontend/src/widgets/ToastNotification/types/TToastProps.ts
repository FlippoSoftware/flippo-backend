import { type MouseEvent, type ReactNode } from "react";

type TNotificationKind = "success" | "warning" | "error" | "timer";

type TToastProps = {
  id: string;
  kind: TNotificationKind;
  message: string;
  onClose: (...args: any[]) => any;
  statusIconSize?: number;
  content?: ReactNode;
  timeout?: number;
  onAutomaticClosingAction?: () => void;
  onClickButtonClose?: () => void;
  onClickContent?: (event?: MouseEvent<HTMLElement>) => void;
};

export { type TToastProps, type TNotificationKind };
