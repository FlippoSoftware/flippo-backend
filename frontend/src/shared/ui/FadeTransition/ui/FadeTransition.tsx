import { AnimatePresence, motion } from 'framer-motion';
import { type ForwardedRef, forwardRef } from 'react';

import { type TFadeTransitionProps } from '../types/TFadeTransitionProps';

function FadeTransition(props: TFadeTransitionProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    animateOpacity = 1,
    children,
    className = '',
    contentKey,
    exitOpacity = 0,
    initialOpacity = 0,
    transition,
    ...otherProps
  } = props;

  return (
    <AnimatePresence mode={'wait'}>
      <motion.div
        {...otherProps}
        animate={{ opacity: animateOpacity }}
        className={className}
        exit={{ opacity: exitOpacity }}
        initial={{ opacity: initialOpacity }}
        key={contentKey}
        ref={ref}
        transition={{ duration: 0.3, ...transition }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default forwardRef(FadeTransition);
