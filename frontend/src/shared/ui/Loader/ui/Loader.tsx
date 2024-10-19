import { type FC, Suspense } from "react";

import { type TLoaderProps, type TLoadingKing } from "../types/TLoaderProps";
import { type TLoadingIconProps } from "../icons/types/TLoadingIconProps";
import SpinnerIcon from "../icons/LoadingIcon";

const Loaders: { [key in TLoadingKing]: FC<TLoadingIconProps> } = {
  spinner: SpinnerIcon
};

function Loader(props: TLoaderProps) {
  const { loader, ...otherProps } = props;

  const Component = Loaders[loader];

  return <Component {...otherProps} />;
}

function withSuspense(Component: FC<TLoaderProps>) {
  function SuspenseComponent(props: TLoaderProps) {
    return (
      <Suspense fallback={<></>}>
        <Component {...props} />
      </Suspense>
    );
  }

  return SuspenseComponent;
}

export default withSuspense(Loader);
