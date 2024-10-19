import Button from "@ui/Button/Button/ui/Button";
import Loader from "@ui/Loader/ui/Loader";

import { type TLoadingButtonProps } from "../types/TLoadingButtonProps";

import st from "./ButtonWithLoading.module.scss";

function ButtonWithLoading(props: TLoadingButtonProps) {
  const { isLoading, loader = "spinner", children, ...otherProps } = props;
  return (
    <Button
      disabled={isLoading}
      iconRight={isLoading ? <Loader loader={loader} /> : undefined}
      className={st[otherProps.kind]}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

export default ButtonWithLoading;
