import { type PropsWithChildren } from 'react';

type TModalProps = PropsWithChildren<{
  className?: string;
  modalId: string;
  onClose?: () => void;
}>;

export { type TModalProps };
