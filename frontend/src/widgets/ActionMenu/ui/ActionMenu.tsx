import { useClickOutside } from '@shared/hooks';
import { MenuItem, type TMenuItem } from '@shared/ui/MenuItem';
import { Separator } from '@shared/ui/Separator';
import { Fragment, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { type TActionMenuProps } from '../types/TActionMenuProps';
import st from './ActionMenu.module.scss';

let counter = 0;

function ActionMenu(props: TActionMenuProps) {
  const { children, groups, id } = props;

  const [isOpen, setIsOpen] = useState(false);

  const menuR = useRef<HTMLMenuElement>(null);
  const [menuDimensions, setMenuDimensions] = useState<{ height: number; width: number }>({ height: 0, width: 0 });

  const targetRef = useRef<HTMLDivElement>(null);
  const [targetRec, setTargetRec] = useState<{
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

  useClickOutside(menuR, () => setIsOpen(false));

  const updateDimensions = useCallback(() => {
    if (menuR.current && targetRef.current) {
      const { height, width } = menuR.current.getBoundingClientRect();
      const { bottom, left, right, top } = targetRef.current.getBoundingClientRect();

      setMenuDimensions({ height, width });
      setTargetRec({ bottom, left, right, top });
    }
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      updateDimensions();
    }
  }, [isOpen, updateDimensions]);

  const onClickItem = useCallback((handlerClick: TMenuItem['onClick']) => {
    setIsOpen(false);
    handlerClick();
  }, []);

  const { menuX, menuY } = useMemo(() => {
    let menuX = targetRec.left - menuDimensions.width;
    if (menuX < 0) menuX = targetRec.right;

    let menuY = targetRec.top;
    const heightDifference = document.documentElement.clientHeight - (targetRec.top + menuDimensions.height);
    if (heightDifference < 0) menuY = targetRec.top + heightDifference;

    return { menuX, menuY };
  }, [targetRec, menuDimensions]);

  const onMenuSwitched = useCallback(() => {
    if (!menuR.current) setIsOpen((prev) => !prev);
  }, []);

  console.log('counting re-renders', (counter += 1), { menuDimensions, targetRec });

  return (
    <>
      {isOpen ? (
        <menu
          className={st.menu}
          id={id ? id : 'action-menu'}
          ref={menuR}
          style={{
            left: 0,
            position: 'absolute',
            top: 0,
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
      ) : null}
      <div onClick={onMenuSwitched} ref={targetRef} style={{ width: 'fit-content' }}>
        {children}
      </div>
    </>
  );
}

export default ActionMenu;
