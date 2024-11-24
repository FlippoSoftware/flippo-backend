import Button from '@ui/Button/Button/ui/Button';
import Loader from '@ui/Loader/ui/Loader';

import { type TLoadingButtonProps } from '../types/TLoadingButtonProps';
import st from './LoadingButton.module.scss';

function LoadingButton(props: TLoadingButtonProps) {
  const { children, isLoading, loader = 'spinner', ...otherProps } = props;
  return (
    <Button
      className={st[otherProps.variant]}
      disabled={isLoading}
      iconRight={isLoading ? <Loader loader={loader} /> : undefined}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

export default LoadingButton;
