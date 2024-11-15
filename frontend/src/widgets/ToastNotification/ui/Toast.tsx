"use client";

import { type MouseEvent, useEffect, useMemo, useRef, memo } from "react";
import clsx from "clsx";
import { Text } from "@ui/Text";
import { Button, IconButton } from "@ui/Button";
import { Separator } from "@ui/Separator";
import { ErrorIcon, WarningIcon, SuccessIcon, CloseIcon } from "@icons/index";
import { CountDownCircle } from "@ui/CountDownCircle";

import { type TNotificationKind, type TToastProps } from "../types/TToastProps";

import st from "./Toast.module.scss";

function ToastNotification(props: TToastProps) {
  const {
    id,
    kind,
    message,
    content,
    statusIconSize,
    timeout = 5000,
    onClickContent,
    onAutomaticClosingAction,
    onClickButtonClose,
    onClose
  } = props;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const statusIcons: { [key in TNotificationKind]: JSX.Element } = useMemo(
    () => ({
      success: <SuccessIcon width={statusIconSize} height={statusIconSize} type={"circleFilled"} />,
      warning: <WarningIcon width={statusIconSize} height={statusIconSize} type={"circleFilled"} />,
      error: <ErrorIcon width={statusIconSize} height={statusIconSize} type={"circleFilled"} />,
      timer: <CountDownCircle size={statusIconSize} strokeWidth={3} duration={timeout} />
    }),
    [statusIconSize, timeout]
  );

  useEffect(() => {
    if (timeout && onClose && !timerRef.current) {
      timerRef.current = setTimeout(() => {
        if (onAutomaticClosingAction) onAutomaticClosingAction();
        onClose(id);
      }, timeout);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timeout, onClose, id, onAutomaticClosingAction]);

  const onClickHandler = (event: MouseEvent<HTMLElement>) => {
    if (onClickContent) {
      onClickContent(event);

      if (onClose) onClose(id);
    }
  };

  const onCloseToast = () => {
    if (onClose) {
      if (onClickButtonClose) onClickButtonClose();
      onClose(id);
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className={st.toast}>
      <div className={clsx(st.content, st[kind])} onClick={onClickHandler}>
        <div className={st.statusIcon}>{statusIcons[kind]}</div>
        {content ? (
          content
        ) : (
          <Text className={st.text} as={"p"}>
            {message}
          </Text>
        )}
      </div>
      <div className={st.action}>
        {kind === "timer" ? (
          <>
            <Separator orientation={"vertical"} spacing={"spacing-4"} />
            <Button kind={"label"} size={"small"} onClick={onCloseToast}>
              {"Отменить"}
            </Button>
          </>
        ) : (
          <IconButton kind={"label"} size={"small"} icon={<CloseIcon />} onClick={onCloseToast} />
        )}
      </div>
    </div>
  );
}

export default memo(ToastNotification);
