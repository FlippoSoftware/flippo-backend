import type { TAuthProvider } from '@shared/query';
import type { TUnstyledButtonProps } from '@shared/ui/Button';

type TOAuthButtonProps = {
  provider: TAuthProvider;
} & TUnstyledButtonProps<'button'>;

export { type TOAuthButtonProps };
