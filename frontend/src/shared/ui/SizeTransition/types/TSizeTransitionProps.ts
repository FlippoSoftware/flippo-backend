import { type MotionProps, type MotionStyle } from 'framer-motion';
import { type HTMLProps, type ReactElement } from 'react';

type TCustomMotionProps = { style?: Omit<MotionStyle, 'height' | 'width'> } & Omit<MotionProps, 'style'>;

type TSizeTransitionProps = { children?: ReactElement } & Omit<HTMLProps<HTMLDivElement>, 'style'> & TCustomMotionProps;

export type { TSizeTransitionProps };
