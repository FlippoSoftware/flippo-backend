import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { type TAnimation, type TMenuContextValue } from '../types/TMenuContextValue';
import { type TMenuProps } from '../types/TMenuProps';
import { MenuContextProvider } from './MenuContext';

const DEFAULT_PROPS: { animation: Required<TAnimation> } & Required<Pick<TMenuContextValue, 'offset' | 'placement'>> = {
  animation: {
    animateSize: 1,
    duration: 0.2,
    exitSize: 0.4,
    initialSize: 0.2
  },
  offset: 5,
  placement: 'left-start'
};

function Menu(props: TMenuProps) {
  const { children } = props;

  // #region 1. init
  const offset = props.offset || DEFAULT_PROPS.offset;
  const placement = props.placement || DEFAULT_PROPS.placement;

  const animation = useMemo(
    () => ({
      animateSize: props.animation?.animateSize || DEFAULT_PROPS.animation.animateSize,
      duration: props.animation?.duration || DEFAULT_PROPS.animation.duration,
      exitSize: props.animation?.exitSize || DEFAULT_PROPS.animation.exitSize,
      initialSize: props.animation?.initialSize || DEFAULT_PROPS.animation.initialSize
    }),
    [props.animation?.animateSize, props.animation?.duration, props.animation?.exitSize, props.animation?.initialSize]
  );

  const scaleRef = useRef<number>(animation.initialSize);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLMenuElement>(null);

  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const [menuDimensions, setMenuDimensions] = useState<{ height: number; width: number }>({ height: 0, width: 0 });
  const [handlerRec, setHandlerRec] = useState<{
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  }>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  });
  // #endregion

  // #region 2. handle click / scroll events
  const clickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        handlerRef.current &&
        !handlerRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    },
    [handlerRef, menuRef]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('scroll', onClose);
      document.addEventListener('click', clickOutside);

      return () => {
        document.removeEventListener('click', clickOutside);
        window.removeEventListener('scroll', onClose);
      };
    }

    return undefined;
  }, [clickOutside, isOpen, onClose]);
  // #endregion

  // #region 3. Update menu position
  const updateDimensions = useCallback(() => {
    if (menuRef.current && handlerRef.current) {
      const { height: heightMenu, width: widthMenu } = menuRef.current.getBoundingClientRect();
      const {
        bottom,
        height: heightHandle,
        left,
        right,
        top,
        width: widthHandler
      } = handlerRef.current.getBoundingClientRect();

      setMenuDimensions({ height: heightMenu, width: widthMenu });
      setHandlerRec({ bottom, height: heightHandle, left, right, top, width: widthHandler });
    }
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const scale = () => (scaleRef.current = animation.animateSize);
    const handlePosition = () => {
      updateDimensions();
      scale();
    };

    updateDimensions();
    window.addEventListener('resize', handlePosition);

    return () => {
      window.removeEventListener('resize', handlePosition);

      scaleRef.current = animation.initialSize;
    };
  }, [isOpen, animation, updateDimensions]);

  const { menuX, menuY } = useMemo(() => {
    let menuX = 0;
    let menuY = 0;

    const adjustmentMenuDimensions = {
      height: menuDimensions.height / scaleRef.current,
      width: menuDimensions.width / scaleRef.current
    };

    const setXPositionWithRight = () => {
      menuX = handlerRec.right + offset;
      if (menuX + adjustmentMenuDimensions.width > document.documentElement.clientWidth)
        menuX = handlerRec.left - adjustmentMenuDimensions.width - offset;
    };

    const setXPositionWithLeft = () => {
      menuX = handlerRec.left - adjustmentMenuDimensions.width - offset;
      if (menuX < 0) menuX = handlerRec.right + offset;
    };

    const setYPositionStartHorizontal = () => (menuY = handlerRec.top);
    const setYPositionMiddleHorizontal = () =>
      (menuY = handlerRec.top - (adjustmentMenuDimensions.height - handlerRec.height) / 2);
    const setYPositionEndHorizontal = () => (menuY = handlerRec.bottom - adjustmentMenuDimensions.height);

    const adjustmentYHorizontalPosition = () => {
      if (menuY < 0) {
        menuY = 0;
        return;
      }

      const heightDifference = document.documentElement.clientHeight - (menuY + adjustmentMenuDimensions.height);
      if (heightDifference < 0) menuY += heightDifference;
    };

    const setYPositionWithTop = () => {
      menuY = handlerRec.top - adjustmentMenuDimensions.height - offset;
      if (menuY < 0) menuY = handlerRec.bottom + offset;
    };

    const setYPositionWithBottom = () => {
      menuY = handlerRec.bottom + offset;
      if (menuY > document.documentElement.clientHeight)
        menuY = handlerRec.top - adjustmentMenuDimensions.height - offset;
    };

    const setXPositionStartVertical = () => (menuX = handlerRec.left);
    const setXPositionMiddleVertical = () =>
      (menuX = handlerRec.left - (adjustmentMenuDimensions.width - handlerRec.width) / 2);
    const setXPositionEndVertical = () => (menuX = handlerRec.right - adjustmentMenuDimensions.width);

    const adjustmentXHorizontalPosition = () => {
      if (menuX < 0) {
        menuX = 0;
        return;
      }

      const widthDifference = document.documentElement.clientWidth - (menuX + adjustmentMenuDimensions.width);
      if (widthDifference < 0) menuY += widthDifference;
    };

    if (placement.startsWith('left') || placement.startsWith('right')) {
      if (placement.startsWith('left')) {
        setXPositionWithLeft();
      } else {
        setXPositionWithRight();
      }

      if (placement.endsWith('start')) {
        setYPositionStartHorizontal();
      } else if (placement.endsWith('end')) {
        setYPositionEndHorizontal();
      } else {
        setYPositionMiddleHorizontal();
      }

      adjustmentYHorizontalPosition();
    } else if (placement.startsWith('top') || placement.startsWith('bottom')) {
      if (placement.startsWith('top')) {
        setYPositionWithTop();
      } else {
        setYPositionWithBottom();
      }

      if (placement.endsWith('start')) {
        setXPositionStartVertical();
      } else if (placement.endsWith('end')) {
        setXPositionEndVertical();
      } else {
        setXPositionMiddleVertical();
      }

      adjustmentXHorizontalPosition();
    }

    return { menuX, menuY };
  }, [menuDimensions, placement, handlerRec, offset]);
  // #endregion

  // #region 4. Set context
  const contextValue = useMemo(
    () =>
      ({
        activeIndex,
        animation,
        handler: handlerRef,
        isOpen,
        menu: menuRef,
        offset,
        onClose,
        onToggle,
        placement,
        setActiveIndex,
        x: menuX,
        y: menuY
      }) as TMenuContextValue,
    [activeIndex, animation, isOpen, menuX, menuY, offset, onClose, onToggle, placement]
  );
  // #endregion

  return <MenuContextProvider value={contextValue}>{children}</MenuContextProvider>;
}

export default Menu;
