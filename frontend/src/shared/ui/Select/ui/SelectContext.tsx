import { createContext, useContext } from 'react';

import { type TSelectContextProviderProps, type TSelectContextValue } from '../types/TSelectContextValue';

export const SelectContext = createContext<null | TSelectContextValue>(null);
SelectContext.displayName = 'Flippo.SelectContext';

export function useSelect() {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error(
      'useSelect() must be used within a Select. It happens when you use Option components outside the Select component.'
    );
  }

  return context;
}

export function SelectContextProvider({ children, value }: TSelectContextProviderProps) {
  return <SelectContext.Provider value={value}>{children}</SelectContext.Provider>;
}
