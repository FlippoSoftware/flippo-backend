import type { TUnstyledInputProps } from "@ui/Input/types/TInputProps";

type TFormInputProps = {
  id: string;
  type: "text" | "password" | "email";
  placeholder: string;
  showLabel?: boolean;
  errorMessage?: string | null;
} & TUnstyledInputProps<"input">;

export { type TFormInputProps };
