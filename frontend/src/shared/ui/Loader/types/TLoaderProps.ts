import { type HTMLAttributes } from "react";

type TLoadingKing = "spinner";

type TLoaderProps = {
  loader: TLoadingKing;
} & HTMLAttributes<HTMLOrSVGElement>;

export { type TLoaderProps, type TLoadingKing };
