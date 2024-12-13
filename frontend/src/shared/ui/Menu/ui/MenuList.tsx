import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Children, cloneElement, type ForwardedRef, forwardRef, isValidElement, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

import { type TMenuList } from '../types/TMenuListProps';
import st from './Menu.module.scss';
import { useMenu } from './MenuContext';

function MenuList(props: TMenuList, ref: ForwardedRef<HTMLMenuElement>) {
  const { children, className, ...otherProps } = props;
  const { animation, isOpen, menu, x, y } = useMenu();

  useImperativeHandle<HTMLMenuElement | null, HTMLMenuElement | null>(ref, () => menu.current);

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.menu
          {...otherProps}
          animate={{ opacity: 1, scale: animation?.animateSize }}
          aria-labelledby={'menu-button'}
          className={clsx(st.menu, className)}
          exit={{ opacity: 0, scale: animation?.exitSize }}
          id={'menu-list'}
          initial={{ opacity: 0, scale: animation?.initialSize }}
          ref={menu}
          style={{
            left: x ?? 0,
            top: y ?? 0
          }}
          transition={{ duration: animation?.duration }}
        >
          {Children.map(
            children,
            (child) => isValidElement(child) && cloneElement(child, { ...child.props, role: 'menuitem' })
          )}
        </motion.menu>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

export default forwardRef(MenuList);
