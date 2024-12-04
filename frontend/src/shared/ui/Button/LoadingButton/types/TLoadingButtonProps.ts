import { type TButtonProps } from '@shared/ui/Button';
import { type TLoaderProps } from '@shared/ui/Loader';

type TLoadingButtonProps = {
  isLoading: boolean;
} & Omit<TButtonProps<'button'>, 'as' | 'iconRight'> &
  Partial<Pick<TLoaderProps, 'loader'>>;

export { type TLoadingButtonProps };
