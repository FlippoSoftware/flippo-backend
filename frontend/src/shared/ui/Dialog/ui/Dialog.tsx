'use client';

import { useClickOutside } from '@shared/hooks';
import clsx from 'clsx';
import { type ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';

import { type TDialogProps } from '../types/TDialogProps';
import st from './Dialog.module.scss';

function Dialog(props: TDialogProps, ref: ForwardedRef<HTMLDialogElement>) {
  const { children, className, ...otherProps } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);
  useClickOutside(dialogRef, () => dialogRef.current?.close());

  return (
    <dialog className={clsx(st.dialog, className)} ref={ref} {...otherProps}>
      {children}
    </dialog>
  );
}

export default forwardRef(Dialog);
