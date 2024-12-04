import { type TInputProps } from '../../Input/types/TInputProps';

type TSearchInputProps = { onClickClearButton: () => void; value: string } & Omit<
  TInputProps,
  'icon' | 'type' | 'value'
>;

export { type TSearchInputProps };
