import { type TButtonProps } from '@ui/Button/Button/types/TButtonProps';
import { type TLoaderProps } from '@ui/Loader';

type TLoadingButtonProps = {
  isLoading: boolean;
} & Omit<TButtonProps<'button'>, 'as' | 'iconRight'> &
  Partial<Pick<TLoaderProps, 'loader'>>;

export { type TLoadingButtonProps };
