import { type PropsWithChildren, type RefObject } from 'react';

type TPortalProps = PropsWithChildren<{
  targetId?: string;
  targetRef?: RefObject<HTMLElement | null>;
}>;

type TPortalPropsWithId = PropsWithChildren<{ targetId?: string }>;
type TPortalPropsWithContainerRef = PropsWithChildren<{ targetRef?: RefObject<HTMLElement> }>;

export { type TPortalProps, type TPortalPropsWithContainerRef, type TPortalPropsWithId };
