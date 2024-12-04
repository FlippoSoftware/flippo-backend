import { type ComponentType, type ForwardRefExoticComponent, type ReactNode } from 'react';

type TComponentProps<E extends object> = E;

type TVariantComponent<E extends object> = {
  components: TComponentProps<Partial<E>>[];
  name: string;
  variantArgs?: Partial<E>;
};

type TGroup<E extends object> = {
  groupArgs?: Partial<E>;
  name: string;
  variants: TVariantComponent<E>[];
};

type TStoryCombineProps<E extends object> = {
  args?: Partial<E>;
  component: ComponentType<E> | ForwardRefExoticComponent<Omit<E, 'ref'>>;
  decorator?: (component: ReactNode, args?: Partial<E>) => ReactNode;
  groups: TGroup<E>[];
};

export type { TComponentProps, TGroup, TStoryCombineProps, TVariantComponent };
