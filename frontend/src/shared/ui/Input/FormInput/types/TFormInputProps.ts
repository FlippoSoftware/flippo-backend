import type { TUnstyledInputProps } from "@ui/Input/types/TInputProps";

type TFormInputProps = {
  id: string;
  type: "text" | "password" | "email";
  placeholder: string;
  showLabel?: boolean;
  errorMessage?: string;
} & TUnstyledInputProps<"input">;

export { type TFormInputProps };
