import { type PropsWithChildren } from 'react';

type TModalProps = PropsWithChildren<{
  className?: string;
  onClose?: () => void;
}>;

export { type TModalProps };
