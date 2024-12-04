import { Button } from '@shared/ui/Button';
import { Loader } from '@shared/ui/Loader';

import { type TLoadingButtonProps } from '../types/TLoadingButtonProps';

function LoadingButton(props: TLoadingButtonProps) {
  const { children, isLoading, loader = 'spinner', ...otherProps } = props;
  return (
    <Button
      as={'button'}
      disabled={isLoading}
      iconRight={isLoading ? <Loader loader={loader} /> : undefined}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

export default LoadingButton;
