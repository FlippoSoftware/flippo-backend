import { createContext, useContext } from 'react';

import { type TMenuContextProviderProps, type TMenuContextValue } from '../types/TMenuContextValue';

export const MenuContext = createContext<null | TMenuContextValue>(null);
MenuContext.displayName = 'Flippo.MenuContext';

export function useMenu() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error(
      'useMenu() must be used within a Menu. It happens when you use Menu, MenuHandler, MenuItem or MenuList components outside the Menu component.'
    );
  }

  return context;
}

export function MenuContextProvider({ children, value }: TMenuContextProviderProps) {
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
