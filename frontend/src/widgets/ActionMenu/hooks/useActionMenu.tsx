import { useClickOutside } from '@shared/hooks';
import { MenuItem, type TMenuItem, type TMenuItemProps } from '@shared/ui/MenuItem';
import { Separator } from '@shared/ui/Separator';
import { Fragment, type MenuHTMLAttributes, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import st from '../ui/ActionMenu.module.scss';

type TMenu = {
  groups: TMenuItemProps[][];
  id?: `action-menu-${string}`;
  locationOption?: {
    horizontal?: 'left' | 'right';
    vertical?: 'bottom' | 'top';
  };
  targetRec?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
};

type TActionMenuProps = Omit<MenuHTMLAttributes<HTMLMenuElement>, keyof TMenu> & TMenu;

let counter = 0;

export const useActionMenu = (props: TActionMenuProps) => {
  const { groups, id } = props;

  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLMenuElement>(null);
  const [menuDimensions, setMenuDimensions] = useState<{ height: number; width: number }>({ height: 0, width: 0 });

  const [sourceRec, setSourceRec] = useState<{
    bottom: number;
    left: number;
    right: number;
    top: number;
  }>({
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  });

  useClickOutside(menuRef, () => {
    setIsOpen(false);
  });

  useLayoutEffect(() => {
    if (isOpen && menuRef.current) {
      const { height, width } = menuRef.current.getBoundingClientRect();
      //const { bottom, left, right, top } = source.getBoundingClientRect();

      setMenuDimensions({ height, width });
      //setSourceRec({ bottom, left, right, top });
    }
  }, [isOpen]);

  const onClickItem = useCallback((handlerClick: TMenuItem['onClick']) => {
    setIsOpen(false);
    handlerClick();
  }, []);

  const onMenuSwitched = useCallback(() => {
    if (!menuRef.current) setIsOpen((prev) => !prev);
  }, []);

  const { menuX, menuY } = useMemo(() => {
    let menuX = 0;
    let menuY = 0;
    if (sourceRec) {
      menuX = sourceRec.left - menuDimensions.width;
      if (menuX < 0) menuX = sourceRec.right;

      menuY = sourceRec.top;
      const heightDifference = document.documentElement.clientHeight - (sourceRec.top + menuDimensions.height);
      if (heightDifference < 0) menuY = sourceRec.top + heightDifference;
    }

    return { menuX, menuY };
  }, [menuDimensions, sourceRec]);

  const menu = useMemo(
    () => (
      <menu
        className={st.menu}
        id={id || 'action-menu'}
        ref={menuRef}
        style={{
          left: sourceRec ? 0 : '40%',
          position: 'absolute',
          top: sourceRec ? 0 : '40%',
          transform: `translate(${menuX}px, ${menuY}px)`
        }}
      >
        {groups.map((group, index) => (
          <Fragment key={`fragment-${index}`}>
            <div className={st.group} key={`group-${index}`} role={'group'}>
              {group.map(({ onClick, ...otherItemProps }, index) => (
                <MenuItem key={`menuitem-${index}`} onClick={() => onClickItem(onClick)} {...otherItemProps} />
              ))}
            </div>
            {index !== groups.length - 1 ? (
              <Separator key={`separator-${index}`} orientation={'horizontal'} spacing={'spacing-6'} />
            ) : null}
          </Fragment>
        ))}
      </menu>
    ),
    [groups, id, menuX, menuY, onClickItem, sourceRec]
  );

  const forwardSource = useCallback((element: HTMLElement | null | SVGElement) => {
    if (element) {
      const { bottom, left, right, top } = element.getBoundingClientRect();
      setSourceRec({ bottom, left, right, top });
    }
  }, []);

  console.log('counting re-renders', (counter += 1), { menuDimensions, sourceRec });

  return { menu: isOpen ? menu : null, onMenuSwitched: onMenuSwitched, source: forwardSource };
};
