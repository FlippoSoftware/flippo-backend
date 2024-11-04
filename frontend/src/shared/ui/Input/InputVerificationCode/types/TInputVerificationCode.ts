import type { TUnstyledInputProps } from "@ui/Input/types/TInputProps";

type TVerifyInputHandler = {
  focus: () => void;
};

type TInputVerificationCodeProps = {
  value?: string;
  length?: number;
  placeholder?: string;
  type?: "alphanumeric" | "number";
  autoFocus?: boolean;
  success?: boolean;
  isBeingChecked?: boolean;
  errorMessage?: string | null;
  onChange?: (data: string) => void;
  onCompleted?: (code: string) => unknown | Promise<unknown>;
  inputSlotProps?: TUnstyledInputProps<"input">;
};

export { type TInputVerificationCodeProps, type TVerifyInputHandler };
