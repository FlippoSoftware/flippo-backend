import { type TTabOwnProps } from '../Tab/types/TTabProps';

type TTabListProps = {
  onTabChange: (tab: TTabOwnProps['aria-controls']) => void;
  selected: TTabOwnProps['aria-controls'];
  tabs: Omit<TTabOwnProps, 'onClick'>[];
};

export type { TTabListProps };
