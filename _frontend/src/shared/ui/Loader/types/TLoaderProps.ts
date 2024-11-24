import { type HTMLAttributes } from 'react';

type TLoadingKind = 'spinner';

type TLoaderProps = {
  loader: TLoadingKind;
} & HTMLAttributes<HTMLOrSVGElement>;

export { type TLoaderProps, type TLoadingKind };
