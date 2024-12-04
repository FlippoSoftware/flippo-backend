import { type InputHTMLAttributes } from 'react';

type TVerifyInputHandler = {
  focus: () => void;
};

type TInputVerificationCodeProps = {
  autoFocus?: boolean;
  inputSlotProps?: InputHTMLAttributes<HTMLInputElement>;
  invalid?: boolean;
  length?: number;
  onChange?: (data: string) => void;
  onCompleted?: (code: string) => unknown;
  placeholder?: string;
  valid?: boolean;
  value?: string;
  variant?: 'alphanumeric' | 'number';
};

export { type TInputVerificationCodeProps, type TVerifyInputHandler };
