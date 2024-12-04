import { type MotionProps } from 'framer-motion';
import { type HTMLProps, type PropsWithChildren } from 'react';

/**
 * Copy from csstype - @type {CSSProperties['opacity']}
 *
 * @typedef {TOpacity}
 */
type TOpacity =
  | '-moz-initial'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'revert-layer'
  | 'unset'
  | ({} & number)
  | ({} & string)
  | undefined;

type TFadeTransitionProps = PropsWithChildren<
  Omit<
    {
      animateOpacity?: TOpacity;
      contentKey: bigint | null | number | string | undefined;
      exitOpacity?: TOpacity;
      initialOpacity?: TOpacity;
    } & HTMLProps<HTMLDivElement> &
      Partial<MotionProps>,
    'animate' | 'exit' | 'initial'
  >
>;

export type { TFadeTransitionProps };
