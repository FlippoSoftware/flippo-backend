import { type TButtonProps } from "@ui/Button/Button/types/TButtonProps";
import { type TLoaderProps } from "@ui/Loader";

type TLoadingButtonProps = {
  isLoading: boolean;
} & Omit<TButtonProps<"button">, "iconRight"> &
  Partial<TLoaderProps>;

export { type TLoadingButtonProps };
