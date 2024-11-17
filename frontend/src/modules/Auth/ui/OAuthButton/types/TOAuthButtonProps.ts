import type { TUnstyledButtonProps } from "@ui/Button";
import type { TAuthProvider } from "@shared/query/getOAuthUrl.utils";

type TOAuthButtonProps = {
  provider: TAuthProvider;
} & TUnstyledButtonProps<"button">;

export { type TOAuthButtonProps };
