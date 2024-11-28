'use client';

import { CloseIcon, ErrorIcon, SuccessIcon, WarningIcon } from '@icons/index';
import { Button, IconButton } from '@ui/Button';
import { CountDownCircle } from '@ui/CountDownCircle';
import { Separator } from '@ui/Separator';
import clsx from 'clsx';
import { type JSX, memo, type MouseEvent, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { type TNotificationKind, type TToastProps } from '../types/TToastProps';
import st from './Toast.module.scss';

function Toast(props: TToastProps) {
  const {
    content,
    id,
    message,
    onAutomaticClosingAction,
    onClickButtonClose,
    onClickContent,
    onClose,
    statusIconSize,
    timeout = 5000,
    variant
  } = props;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation();

  const statusIcons: { [key in TNotificationKind]: JSX.Element } = useMemo(
    () => ({
      error: <ErrorIcon height={statusIconSize} type={'circleFilled'} width={statusIconSize} />,
      success: <SuccessIcon height={statusIconSize} type={'circleFilled'} width={statusIconSize} />,
      timer: <CountDownCircle duration={timeout} size={statusIconSize} strokeWidth={3} />,
      warning: <WarningIcon height={statusIconSize} type={'circleFilled'} width={statusIconSize} />
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
      <div className={clsx(st.content, st[variant])} onClick={onClickHandler}>
        <div className={st.statusIcon}>{statusIcons[variant]}</div>
        {content ? content : <p className={st.text}>{message}</p>}
      </div>
      <div className={st.action}>
        {variant === 'timer' ? (
          <>
            <Separator orientation={'vertical'} spacing={'spacing-4'} />
            <Button onClick={onCloseToast} size={'small'} variant={'label'}>
              {t('toastNotification.cancelButton')}
            </Button>
          </>
        ) : (
          <IconButton onClick={onCloseToast} size={'small'} variant={'label'}>
            <CloseIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default memo(Toast);
