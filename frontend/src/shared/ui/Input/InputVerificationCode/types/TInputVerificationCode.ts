import type { TUnstyledInputProps } from "@ui/Input/types/TInputProps";

type TCompletedResult = {
  ok: boolean;
  error?: string;
  callback?: (() => void) | (() => Promise<void>);
};

type TVerifyInputHandler = {
  focus: () => void;
};

type TInputVerificationCodeProps = {
  value?: string;
  length?: number;
  placeholder?: string;
  type?: "alphanumeric" | "number";
  autoFocus?: boolean;
  onChange?: (data: string) => void;
  onCompleted?: (code: string) => TCompletedResult | Promise<TCompletedResult>;
  inputSlotProps?: TUnstyledInputProps<"input">;
};

export { type TInputVerificationCodeProps, type TVerifyInputHandler, type TCompletedResult };
