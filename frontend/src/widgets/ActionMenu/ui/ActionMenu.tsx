import { MenuItem, type TMenuItem } from '@shared/ui/MenuItem';
import { Separator } from '@shared/ui/Separator';
import { Fragment, useCallback, useLayoutEffect, useRef, useState } from 'react';

import { type TActionMenuProps } from '../types/TActionMenuProps';
import st from './ActionMenu.module.scss';

function ActionMenu(props: TActionMenuProps) {
  const { groups, id, onClose, targetRec } = props;
  const menuRef = useRef<HTMLMenuElement | null>(null);
  const [menuDimensions, setMenuDimensions] = useState<{ height: number; width: number }>({ height: 0, width: 0 });

  useLayoutEffect(() => {
    if (menuRef.current) {
      const { height, width } = menuRef.current.getBoundingClientRect();
      setMenuDimensions({ height, width });
    }
  }, []);

  const onClickItem = useCallback(
    (handlerClick: TMenuItem['onClick']) => {
      onClose();
      handlerClick();
    },
    [onClose]
  );

  let menuX = 0;
  let menuY = 0;
  if (targetRec) {
    menuX = targetRec.left - menuDimensions.width;
    if (menuX < 0) menuX = targetRec.right;

    menuY = targetRec.top;
    const heightDifference = document.documentElement.clientHeight - (targetRec.top + menuDimensions.height);
    if (heightDifference < 0) menuY = targetRec.top + heightDifference;
  }

  return (
    <div className={st.menuWrapper}>
      <menu
        className={st.menu}
        id={id ? id : 'action-menu'}
        ref={menuRef}
        style={{
          left: targetRec ? 0 : '40%',
          position: 'absolute',
          top: targetRec ? 0 : '40%',
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
    </div>
  );
}

export default ActionMenu;
